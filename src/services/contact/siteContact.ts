import { cache } from "react";
import { headers } from "next/headers";

export interface ContactPhone {
  display: string;
  tel: string;
  label?: string;
  whatsapp?: string;
}

export interface ContactLocation {
  name: string;
  branches: { label?: string; address: string }[];
}

export interface SiteContact {
  region: "in" | "uk";
  website: string;
  email?: string;
  phones: ContactPhone[];
  whatsapp?: ContactPhone & { whatsapp: string };
  locations: ContactLocation[];
  hours?: string;
  phonePlaceholder: string;
}

const indiaPhones = [
  { display: "+91 93443 37331", tel: "+919344337331", whatsapp: "919344337331", label: "Sivakasi" },
  { display: "+91 93633 37331", tel: "+919363337331", whatsapp: "919363337331", label: "Srivilliputtur / Sattur" },
];

const indiaContact: SiteContact = {
  region: "in",
  website: "www.wegrowcampus.in",
  email: "enquiry@wegrowcampus.in",
  phones: indiaPhones,
  whatsapp: indiaPhones[0],
  hours: "Classes: Mon - Sat, 9:00 AM - 7:00 PM",
  phonePlaceholder: "+91 XXXXX XXXXX",
  locations: [
    {
      name: "Sivakasi",
      branches: [
        {
          label: "Sivakasi (Main Branch)",
          address: "193,1A, Ayyappan kovil opposite/ Naturals Salon & Spa Downstairs, Parasakthi Colony, Sivakasi, Tamil Nadu 626123",
        },
        {
          label: "Sivakasi (Thiruthangal Road)",
          address: "100A/5, 1st Floor, Thiruthangal Road, Opposite Bell Hotel, IBACO Upstairs, Sivakasi – 626 123",
        },
      ],
    },
    {
      name: "Srivilliputhur",
      branches: [
        {
          address: "129, North Car Street, Opposite Bombay Textiles, Upstairs Pathras Kids & Gift Shop, Srivilliputtur – 626 125",
        },
      ],
    },
  ],
};

function parsePhone(value?: string): ContactPhone | undefined {
  const display = value?.trim();
  if (!display || !/^\+[\d\s().-]+$/.test(display)) return;

  const digits = display.replace(/\D/g, "");
  if (!/^[1-9]\d{6,14}$/.test(digits)) return;

  return { display, tel: `+${digits}` };
}

export const getSiteContact = cache(async (): Promise<SiteContact> => {
  const host = (await headers()).get("host") ?? "";
  const hostname = host.trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  if (!/^[a-z0-9.-]+\.uk$/.test(hostname)) return indiaContact;

  const phones = (process.env.UK_CONTACT_PHONE ?? "")
    .split(",")
    .map(parsePhone)
    .filter((phone) => phone !== undefined);
  const whatsapp = parsePhone(process.env.UK_CONTACT_WHATSAPP);
  const address = process.env.UK_CONTACT_ADDRESS?.trim();

  return {
    region: "uk",
    website: hostname,
    email: process.env.UK_CONTACT_EMAIL?.trim() || undefined,
    phones,
    whatsapp: whatsapp && { ...whatsapp, whatsapp: whatsapp.tel.slice(1) },
    locations: address ? [{ name: "United Kingdom", branches: [{ address }] }] : [],
    hours: process.env.UK_CONTACT_HOURS?.trim() || undefined,
    phonePlaceholder: "+44 XXXX XXXXXX",
  };
});

export function getLegalContactText(contact: SiteContact) {
  const address = contact.locations[0]?.branches[0].address;
  const company = contact.region === "in" ? "WeGrow Skill Campus Pvt. Ltd." : "WeGrow Skill Campus.";

  return [
    company,
    address && `Address: ${address}.`,
    contact.email && `Email: ${contact.email}.`,
    contact.phones.length > 0 && `Phone: ${contact.phones.map((phone) => phone.display).join(" / ")}.`,
    contact.region === "uk" && contact.whatsapp && `WhatsApp: ${contact.whatsapp.display}.`,
  ].filter(Boolean).join(" ");
}
