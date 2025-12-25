# Find Your Perfect VA

AI-powered Virtual Assistant matching system that helps clients find their ideal VA using ChatGPT.

## 🎯 Overview

This project uses OpenAI's ChatGPT API to create an interactive matching flow that:
1. Asks strategic questions to understand client needs
2. Analyzes responses using AI
3. Matches clients with the best Virtual Assistants from Webflow CMS
4. Provides recommendations with detailed justifications

## 🏗️ Architecture

```
FindYourPerfectVA/
├── api/                    # Vercel Serverless Functions
│   ├── match/              # Matching endpoints
│   └── sync/               # Data synchronization
├── src/                    # Frontend components
│   └── components/         # React components
├── lib/                    # Core libraries
│   ├── openai.js          # OpenAI client
│   ├── matching.js        # Matching algorithm
│   └── webflow-sync.js    # Webflow data sync
└── data/                   # Cached data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Webflow API token
- Vercel account (for deployment)

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/victor/CascadeProjects/FindYourPerfectVA
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `WEBFLOW_API_TOKEN`: Your Webflow API token
   - `WEBFLOW_SITE_ID`: Your Webflow site ID
   - `WEBFLOW_VA_COLLECTION_ID`: Your VA collection ID

### Development

Run the development server:
```bash
npm run dev
```

This will start Vercel's development server on `http://localhost:3000`

### Sync VA Data

To sync Virtual Assistants from Webflow CMS:
```bash
npm run sync:vas
```

## 📁 Project Structure

### API Endpoints

- `POST /api/match/start` - Initialize matching session
- `POST /api/match/answer` - Process user answer
- `POST /api/match/back` - Go back to previous question
- `POST /api/match/recommend` - Get VA recommendations
- `GET /api/sync/vas` - Sync VAs from Webflow

### Components

- `FindYourPerfectVA.jsx` - Main component
- `QuestionFlow.jsx` - Question flow UI
- `ResultsDisplay.jsx` - Results display

### Libraries

- `lib/openai.js` - OpenAI API client
- `lib/matching.js` - Matching algorithm
- `lib/webflow-sync.js` - Webflow data synchronization
- `lib/session-storage.js` - Shared session storage (in-memory, use Redis in production)

## 🔧 Configuration

### OpenAI Model

Default model: `gpt-4o-mini` (recommended for cost-effectiveness)

You can change this in `.env`:
```
OPENAI_MODEL=gpt-4o-mini
```

Alternative: `gpt-3.5-turbo` (cheaper but less capable)

## 📊 Data Flow

1. **Sync**: VAs are synced from Webflow CMS to local cache
2. **Matching**: User answers questions → ChatGPT analyzes → Matching algorithm scores VAs
3. **Results**: Top matches are returned with justifications

## 🚢 Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to set environment variables in Vercel dashboard.

## 📝 Notes

- VA data is cached locally for performance
- Sessions are stored in-memory (shared across all API endpoints)
- For production, replace in-memory session storage with Redis or a database
- API keys should NEVER be exposed in frontend code
- Users can navigate back through questions using the "Back" button
- Session storage automatically cleans up old sessions (24 hours)

## 📄 License

MIT

