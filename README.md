# Developer Portfolio

A clean, professional portfolio website built with Next.js and Tailwind CSS.

## Features

- Responsive design
- Dark theme
- Project showcase
- Experience section
- Social links
- Deployable to GitHub Pages

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To deploy to GitHub Pages:

1. Update the `basePath` in `next.config.ts` to match your repository name
2. Run the deployment script:

```bash
npm run deploy
```

## Customization

1. Update personal information in:
   - `components/Hero.tsx`
   - `components/Footer.tsx`
   - `data/projects.ts`
   - `data/experience.ts`

2. Replace social links in `components/Footer.tsx`

3. Add your own project screenshots in the `public/` directory