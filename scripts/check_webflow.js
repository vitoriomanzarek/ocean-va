import 'dotenv/config';

async function fetchWebflow(endpoint) {
    const token = process.env.WEBFLOW_API_TOKEN;
    if (!token) {
        console.error('❌ Error: WEBFLOW_API_TOKEN is missing in .env');
        process.exit(1);
    }

    console.log(`📡 Fetching ${endpoint}...`);
    try {
        const response = await fetch(`https://api.webflow.com/v2${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('❌ Network Error:', error);
        return null;
    }
}

async function main() {
    console.log('🔍 Checking Webflow Contents...');

    const sites = await fetchWebflow('/sites');
    if (!sites || sites.sites.length === 0) {
        console.log('❌ No sites found.');
        return;
    }

    const site = sites.sites[0];
    console.log(`✅ Connected to Site: ${site.displayName} (${site.shortName})`);
    console.log(`   ID: ${site.id}`);

    console.log(`\n📂 Fetching Collections...`);
    const collections = await fetchWebflow(`/sites/${site.id}/collections`);

    if (collections) {
        console.log(`✅ Found ${collections.collections.length} Collections.`);
        const vaCollection = collections.collections.find(c => c.displayName === 'Virtual Assistants');

        if (vaCollection) {
            console.log(`\n🎯 TARGET COLLECTION FOUND: "Virtual Assistants"`);
            console.log(`   ID: ${vaCollection.id}`);

            console.log(`   Fetching item count...`);
            // Webflow V2 items endpoint is /collections/:id/items
            const items = await fetchWebflow(`/collections/${vaCollection.id}/items?limit=1`);
            if (items) {
                console.log(`   Total Items: ${items.total || items.count || items.items.length} (Pagination may apply)`);
                if (items.items.length > 0) {
                    const first = items.items[0];
                    console.log(`   Sample Item: ${first.fieldData?.name || 'Unknown'}`);
                }
            }
        } else {
            console.log('⚠️ Collection "Virtual Assistants" NOT found.');
            console.log('Available collections:', collections.collections.map(c => c.displayName).join(', '));
        }
    }
}

main();
