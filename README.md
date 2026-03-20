SalesNexus AI Platform

SalesNexus is an advanced, AI-powered Sales & Revenue Operations platform. It is designed as a hackathon-grade Single Page Application (SPA) with a stunning, premium dark mode UI.

 Features

This project simulates a fully-featured intelligence platform covering multiple facets of revenue operations:

1. **Prospecting Intelligence**
   - Lead data analysis with AI scoring (0-100).
   - Generates personalized outreach emails based on lead signals.
2. **Deal Intelligence**
   - Kanban-style deal pipeline.
   - Monitors deal activity and detects risks (Healthy, At Risk, Critical).
   - Recommends actionable recovery steps.
3. **Revenue Retention**
   - Predicts churn probability for existing customers.
   - Suggests proactive retention strategies based on usage and tickets.
4. **Competitive Intelligence**
   - Detects competitor mentions.
   - Provides competitor battlecards with strengths/weaknesses.
   - Real-time objection handling scripts.
5. **Self-Learning Engine**
   - Continuously adapts scoring and messaging strategies based on historical engagement outcomes. 

Tech Stack

- **Client:** Vite, Vanilla JavaScript, HTML5, CSS3
- **Design System:** Custom Dark UI, CSS Variables, Glassmorphism 
- **Charts:** Chart.js

## Project Structure

```text
salesnexus/
├── index.html              # Core SPA shell, sidebar nav & content area
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies 
├── style.css               # Full design system (colors, typography, animations)
└── src/
    ├── main.js             # Client-side router and view initialization
    ├── data/
    │   └── mockData.js     # Rich mock CRM dataset (leads, deals, customers, competitors)
    ├── engine/             # The simulated AI Engines
    │   ├── leadScoring.js
    │   ├── emailGenerator.js
    │   ├── riskDetector.js
    │   ├── churnPredictor.js
    │   ├── competitiveIntel.js
    │   └── selfLearning.js
    └── views/              # UI Components / App Views
        ├── dashboard.js
        ├── prospecting.js
        ├── deals.js
        ├── retention.js
        └── competitive.js
```

 Getting Started

 Prerequisites

You will need **Node.js** installed on your system to run the development server. 

 Installation

1. Open your terminal and navigate to the project folder:
   ```bash
   cd "C:\Users\ADMIN\OneDrive\Documents\New folder\salesnexus"
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the `localhost` URL provided in the terminal (usually `http://localhost:5173/`).

Design Aesthetics

The platform uses a deep navy background (`#0a0e27`), offset by vibrant accents such as violet, teal, and success/risk indicators (green/red/amber). It relies heavily on smooth micro-animations, stagger effects, and elegant typography (Google Inter) to deliver a truly premium user experience.
