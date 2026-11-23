# WeGrow Skill Campus

Official web platform for **WeGrow Skill Campus** — bridging the gap between education and industry through practical training, live real-world projects, industry mentorship, and dedicated corporate placement support.

## 🚀 Key Features

- **Hero Canvas**: Engaging dynamic layout with practical stats, brand typography, and responsive CTA pathways.
- **About WeGrow**: Highlighting the practical learning philosophy with interactive feature highlights.
- **Our Ecosystem**: Dedicated overview covering Skill Campus and Corporate Services.
- **How We Make A Difference**: Interactive card showcase of career guidance, mentorship, live project exposure, and corporate readiness.
- **Applied Industry Immersion**: Dedicated dark theme immersion showcase highlighting live capstones and partner connections.
- **Placement Journey**: 5-step milestone roadmap guiding students from foundational training to corporate placement.
- **Centered CTA Banner**: Strategic call to action for students and enterprise hiring partners.
- **Comprehensive Dark Footer**: 5-column brand hub with official logo badge, program pathways, contacts, social media handles, and newsletter subscription.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Design System**: Montserrat & Poppins, Brand Navy (`#0B3B8F`), Brand Orange (`#F7820E`), Body (`#3B4A66` / `#4A5A78`), Soft Light (`#F8FAFD`)

## 💻 Getting Started

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Vjkumar2004/wegrowskillcampus.git

# Navigate to project directory
cd wegrowskillcampus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3002](http://localhost:3002) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Contact details by domain

Point both domains at the same Next.js deployment. The app uses the request's
`Host` header to select contact details. Configure your proxy to preserve the
public host and include it in any cache key for page responses.

Hosts ending in `.uk` (including `.co.uk`) use the optional `UK_CONTACT_*`
variables in [.env.example](.env.example). Leave them empty to show the UK
contact placeholder and offer the enquiry form. Set them in the deployment
environment when the UK details are ready. Use international format for
telephone and WhatsApp numbers, including the leading `+`.

Hosts ending in `.in` and local development use the India profile. To preview
the UK profile locally, run `curl -H 'Host: wegrow.test.uk' http://localhost:3000/contact`.

## 📄 License
All rights reserved © 2026 WeGrow Skill Campus.
