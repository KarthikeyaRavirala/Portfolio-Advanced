# 🚀 Advanced Portfolio Website – Engineering-Focused Personal Portfolio

## 📌 Project Overview

This project is a modern, scalable personal portfolio website designed to present my technical skills, projects, and professional journey in a clean, structured, and industry-standard manner.
Unlike basic static portfolios, this application focuses on maintainability, modular design, and real-world frontend engineering practices using a modern React ecosystem.

The portfolio serves as a central professional identity, suitable for academic evaluation, internship applications, and industry recruitment.

## 🎯 Problem Statement

Most student portfolios:

- Are static and template-based
- Lack clear structure and scalability
- Focus only on visuals, not engineering decisions
- Are difficult to extend as skills grow

This creates a gap between what students know and what industry expects.

## ⚠️ Limitations of Existing Solutions

- Hard-coded layouts with minimal reusability
- Poor separation of concerns
- No state management strategy
- Difficult to maintain or scale
- Not aligned with production-level frontend practices

## 💡 Our Approach

To address these limitations, this portfolio was designed as a full-fledged frontend application, not just a static website.

Key principles followed:

- Component-driven architecture
- Clean separation of UI, logic, and configuration
- Reusable and scalable layout patterns
- Industry-standard tooling and conventions

The result is a portfolio that can grow alongside my career.

## 🏗️ System Architecture (High-Level)
```
User
  ↓
Next.js App Router
  ↓
Reusable UI Components
  ↓
Context Providers (State Management)
  ↓
Config & Utility Layers
```

### Architectural Highlights

- Next.js App Router for structured routing
- Context API for global state handling
- Modular components for scalability
- Config-driven styling using modern CSS tooling

## 🧰 Tech Stack & Justification

| Technology | Purpose |
|------------|---------|
| Next.js | Server-side rendering, routing, performance optimization |
| React | Component-based UI development |
| TypeScript | Type safety and maintainable code |
| Context API | Lightweight global state management |
| PostCSS / Modern CSS | Scalable and clean styling |
| Node.js | Build & development environment |

### Why this stack?
This combination mirrors real production frontend environments, making the project closer to industry expectations than typical student portfolios.

## ✨ Key Features

- Responsive and clean UI design
- Modular and reusable components
- Centralized state management
- Scalable folder structure
- Easy extensibility for new sections or features
- Optimized build and rendering via Next.js

## 🧠 Engineering Decisions & Trade-offs

**Context API vs Redux:**
Context was chosen to keep the project lightweight while still demonstrating global state handling.

**Next.js vs CRA:**
Next.js enables better performance, SEO, and routing control.

**TypeScript adoption:**
Improves reliability and long-term maintainability.

## 📊 Outcomes & Impact

- Portfolio structure aligns with professional frontend standards
- Easy to extend with:
  - Blogs
  - Project dashboards
  - AI/ML demos
- Strong foundation for real-world deployment
- Suitable for academic review and recruiter evaluation

## 🌐 Deployment

The application is production-ready and can be deployed on:

- Vercel (Recommended for Next.js)
- Netlify
- GitHub Pages

### Deploying to Vercel (Recommended)

Vercel is the easiest option for Next.js projects:

1. Go to [vercel.com](https://vercel.com) and sign up/in with your GitHub account
2. Click "New Project" and select your GitHub repository
3. Vercel will automatically detect it's a Next.js project
4. Add any environment variables if needed for your AI features
5. Click "Deploy" and your site will be live within minutes

### Deploying to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/in
2. Click "Add new site" and select "Deploy with GitHub"
3. Choose your repository
4. Set build command to `npm run build` and publish directory to `out`
5. Deploy site

### Deploying to GitHub Pages

GitHub Pages deployment requires additional configuration:

1. Install the gh-pages package: `npm install --save-dev gh-pages`
2. Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d out"
  }
}
```
3. Run `npm run deploy` to build and deploy your site

## 🔮 Future Enhancements

- Blog section powered by Markdown / CMS
- AI-powered resume analyzer or chatbot
- Analytics dashboard for visitor insights
- Dark/light theme toggle with persistence
- Backend integration for dynamic content

## 🧑💻 Author

[Your Name]
AI & ML Enthusiast | Frontend Engineer
Focused on building scalable, real-world applications using modern technologies.

## ⚙️ Local Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open in browser:
```bash
http://localhost:3000
```

## 🤖 AI Lab – Applied Machine Learning Features

This portfolio includes an AI Lab showcasing real-world AI applications:

### 1. AI Resume Analyzer
An NLP-based system that extracts skills from resumes, computes job-role similarity, and provides actionable improvement suggestions.

### 2. AI Portfolio Chatbot
A RAG-powered conversational assistant that answers questions about my projects, skills, and experience using semantic search over portfolio content.

## 🏁 Final Note

This project reflects my transition from basic frontend development to engineering-oriented application design, with an emphasis on scalability, maintainability, and professional standards.

## 🚀 Running the Application

### Frontend (Next.js)
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Visit `http://localhost:3000`

### AI Backend Services
The AI features require separate backend services:
1. Navigate to the `ai-lab` directory
2. Install Python dependencies: `pip install -r requirements.txt`
3. Run the main API: `python -m ai_lab.main_api`

### Environment Variables
Create a `.env.local` file in the root directory with:
```
AI_API_URL=http://localhost:8002  # URL of the running AI backend
```

In development, the frontend will use mock responses if `AI_API_URL` is not set. In production, set this to your deployed AI backend URL.
