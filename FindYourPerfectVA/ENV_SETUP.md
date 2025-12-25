# Environment Variables Setup

Copy this content to your `.env` file:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Webflow API Configuration
WEBFLOW_API_TOKEN=your_webflow_api_token_here
WEBFLOW_SITE_ID=your_webflow_site_id_here
WEBFLOW_VA_COLLECTION_ID=your_va_collection_id_here

# Application Configuration
NODE_ENV=development
PORT=3000
```

## How to get these values:

### OpenAI API Key
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

### Webflow API Token
1. Go to https://webflow.com
2. Navigate to Account Settings > Integrations
3. Generate API token
4. Copy the token

### Webflow Site ID
1. In Webflow, go to your site
2. The Site ID is in the URL or can be found in the API response
3. For Ocean VA, it should be: `66e9b3f71eb321a17e92218a`

### Webflow VA Collection ID
1. In Webflow CMS, go to Collections
2. Find "Virtual Assistants" collection
3. The Collection ID can be found in the API or Webflow Designer
4. It should be: `691b82a97542c69f3f77fa76` (from your existing setup)

