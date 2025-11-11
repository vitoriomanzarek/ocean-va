# Webflow API Setup - VA Grid Integration

## 🔐 Setup

### 1. Set Your API Token

```bash
export WEBFLOW_API_TOKEN="2b36d8819c51742a818d390eb82e33e8616fbd08e7f28321b02bce9074f20fd8"
```

Or add to your `.bashrc` or `.zshrc`:

```bash
echo 'export WEBFLOW_API_TOKEN="2b36d8819c51742a818d390eb82e33e8616fbd08e7f28321b02bce9074f20fd8"' >> ~/.zshrc
source ~/.zshrc
```

### 2. Verify Token

```bash
curl https://api.webflow.com/v2/token/authorized_by \
  -H "Authorization: Bearer $WEBFLOW_API_TOKEN"
```

---

## 📋 Available Scripts

### `webflow-api-helper.js` - Explore Your Site

List all pages:
```bash
node webflow-api-helper.js --list-pages
```

Get specific page details:
```bash
node webflow-api-helper.js --get-page ovas-current-vas
```

List all collections:
```bash
node webflow-api-helper.js --list-collections
```

Get collection details:
```bash
node webflow-api-helper.js --get-collection <collection-id>
```

List items in a collection:
```bash
node webflow-api-helper.js --list-items <collection-id>
```

---

## 🎯 Update VA Page

### Step 1: Find the Page

```bash
node webflow-api-helper.js --get-page ovas-current-vas
```

This will show:
- Page ID
- Page title
- Edit URL
- Status

### Step 2: Update the Page

```bash
node update-webflow-vas-page.js
```

This script will:
1. Find the page `/ovas-current-vas`
2. Read the HTML component from `webflow-components/200-our-current-vas-grid-complete.html`
3. Show you the next steps

---

## 🔄 Workflow

### When you update VA data:

1. **Update `src/data/vasData.js`** with new VA information

2. **Regenerate HTML component**:
   ```bash
   python3 generate-vas-html.py
   ```

3. **Update Webflow page**:
   ```bash
   export WEBFLOW_API_TOKEN="your-token"
   node update-webflow-vas-page.js
   ```

4. **Publish in Webflow Designer**

---

## 📊 Site Information

- **Site ID**: `66e9b3f71eb321a17e92218a`
- **Site Name**: Ocean VA
- **Domain**: oceanvirtualassistant.com
- **Page Slug**: `ovas-current-vas`

---

## 🛠️ Troubleshooting

### Token not working?
```bash
# Verify token
curl https://api.webflow.com/v2/token/authorized_by \
  -H "Authorization: Bearer $WEBFLOW_API_TOKEN"
```

### Page not found?
```bash
# List all pages
node webflow-api-helper.js --list-pages
```

### Need to reset token?
```bash
rm -rf ~/.mcp-auth
# Then restart Windsurf
```

---

## 📚 Resources

- [Webflow API Docs](https://developers.webflow.com/reference)
- [Webflow Collections API](https://developers.webflow.com/reference/collections)
- [Webflow Pages API](https://developers.webflow.com/reference/pages)

---

## 🚀 Next Steps

1. ✅ Set `WEBFLOW_API_TOKEN` environment variable
2. ✅ Run `node webflow-api-helper.js --list-pages` to verify
3. ✅ Run `node webflow-api-helper.js --get-page ovas-current-vas` to find the page
4. ✅ Manually add HTML Embed to the page in Webflow Designer
5. ✅ Paste content from `webflow-components/200-our-current-vas-grid-complete.html`
6. ✅ Publish

---

**Last Updated**: November 10, 2025
