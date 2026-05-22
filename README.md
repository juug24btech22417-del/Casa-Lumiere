# 🌅 Casa Lumière (RuralLand)

> A premium, high-end real estate platform redefining rural land investment.

Casa Lumière (formerly RuralLand) bridges the gap between traditional land acquisition and modern investment standards. Featuring a sophisticated, warm-light editorial design (inspired by the **Alto** template), it delivers a clean, high-contrast, and tactile visual aesthetic designed to evoke trust and premium lifestyle aspirations.

## ✨ Features

- **Interactive Plot Explorer**: An SVG-based site plan with warm stone tones, high-contrast labels, and hover interactions.
- **EMI Investment Calculator**: Dynamic sliding inputs and payment splits integrated seamlessly into the design language.
- **Before & After Land Simulator**: Interactive comparison slider with beautifully styled badges and drag handles.
- **Document Secure Vault**: Clear, WCAG-compliant readability for viewing deeds and legal documents.
- **Luxurious Micro-Interactions**: Features a custom magnetic cursor attractor for CTA buttons and fluid inertia physics scrolling for an elegant tactile feel.
- **Architectural UI Details**: Includes a subtle physical paper grain overlay and a fine architectural blueprint grid to create an authentic editorial layout.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS (with custom `@theme` tokens in `globals.css`)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database / Backend**: [Supabase](https://supabase.com/)

## 🎨 Design System & Typography

The interface employs a rich, earthy palette:
- **Background**: `deep-forest` (Warm White `#F7F4F0`)
- **Surface**: `surface` (Pure Warm White `#FFFFFE`)
- **Accent**: `gold` (Rich Terracotta `#A8593A`)
- **Typography**: Inter (Sans-serif) & Playfair Display (Serif)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Project Structure

- `src/app/`: Next.js App Router pages and global layouts.
- `src/components/sections/`: Major UI blocks (Hero, StatsBar, PlotExplorer, etc.).
- `src/components/ui/`: Reusable components (Buttons, Magnetic wrapper, SmoothScroll, ArchitecturalGrid).
- `src/lib/`: Context providers, utility functions, and configurations.
