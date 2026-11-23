"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContact } from "@/services/contact/siteContact";

const SiteContactContext = createContext<SiteContact | null>(null);

export function SiteContactProvider({ contact, children }: { contact: SiteContact; children: ReactNode }) {
  return <SiteContactContext.Provider value={contact}>{children}</SiteContactContext.Provider>;
}

export function useSiteContact() {
  const contact = useContext(SiteContactContext);
  if (!contact) throw new Error("Site contact provider is missing");
  return contact;
}
