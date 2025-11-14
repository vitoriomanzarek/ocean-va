# Guía Práctica: Code Components para Ocean VA

## 📚 Introducción

Los **Code Components** te permiten escribir React en tu codebase local y sincronizar automáticamente con Webflow. Es el mejor de ambos mundos: desarrollo React + diseño visual Webflow.

---

## 🏗️ Estructura del Proyecto

```
ocean-va/
├── src/
│   ├── components/              (componentes React actuales)
│   │   ├── Hero.jsx
│   │   ├── Pricing.jsx
│   │   ├── VAShowcase.jsx
│   │   └── ...
│   │
│   ├── webflow-components/      (NEW - Code Components para Webflow)
│   │   ├── Hero.webflow.tsx
│   │   ├── Pricing.webflow.tsx
│   │   ├── VACard.webflow.tsx
│   │   ├── VAGrid.webflow.tsx
│   │   ├── Testimonials.webflow.tsx
│   │   ├── Stats.webflow.tsx
│   │   └── index.ts
│   │
│   └── utils/
│       └── webflow-api.ts       (Data API helpers)
│
├── webflow.config.json          (configuración DevLink)
├── package.json                 (con @webflow/react)
└── ...
```

---

## 🚀 Paso 1: Configuración Inicial

### Instalar dependencias

```bash
npm install @webflow/react
npm install -D @webflow/devlink
```

### Crear webflow.config.json

```json
{
  "projectId": "ocean-va",
  "sites": [
    {
      "name": "Ocean VA",
      "id": "66e9b3f71eb321a17e92218a",
      "url": "https://oceanvirtualassistant.com"
    }
  ],
  "devLink": {
    "enabled": true,
    "port": 3000
  }
}
```

### Actualizar package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "webflow:sync": "devlink sync",
    "webflow:watch": "devlink watch"
  },
  "dependencies": {
    "@webflow/react": "^1.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

---

## 💡 Paso 2: Crear tu Primer Code Component

### Ejemplo 1: Hero Component Simple

```typescript
// src/webflow-components/Hero.webflow.tsx
import React from 'react';
import { declareComponent } from '@webflow/react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  variant?: 'light' | 'dark';
}

export const HeroComponent: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  variant = 'light'
}) => {
  return (
    <section
      className={`hero hero--${variant}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: variant === 'dark' ? '#fff' : '#000'
      }}
    >
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
          {title}
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          {subtitle}
        </p>
        <a
          href={ctaLink}
          style={{
            display: 'inline-block',
            padding: '12px 30px',
            backgroundColor: '#049d98',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.3s'
          }}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

declareComponent(HeroComponent, {
  name: 'Hero',
  description: 'Hero section with title, subtitle, and CTA button',
  icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995467.png',
  props: {
    title: {
      type: 'string',
      defaultValue: 'Welcome to Ocean VA',
      label: 'Title',
      helpText: 'Main heading text'
    },
    subtitle: {
      type: 'string',
      defaultValue: 'Virtual Assistants for Insurance Agencies',
      label: 'Subtitle',
      helpText: 'Subheading text'
    },
    ctaText: {
      type: 'string',
      defaultValue: 'Book a Free Call',
      label: 'CTA Button Text'
    },
    ctaLink: {
      type: 'string',
      defaultValue: '/contact',
      label: 'CTA Button Link'
    },
    backgroundImage: {
      type: 'string',
      label: 'Background Image URL',
      helpText: 'Optional background image'
    },
    variant: {
      type: 'enum',
      options: ['light', 'dark'],
      defaultValue: 'light',
      label: 'Variant'
    }
  }
});
```

### Ejemplo 2: VA Card Component (Reutilizable)

```typescript
// src/webflow-components/VACard.webflow.tsx
import React from 'react';
import { declareComponent } from '@webflow/react';

interface VACardProps {
  name: string;
  experience: string;
  languages: string[];
  specializations: string[];
  imageUrl: string;
  profileLink: string;
}

export const VACard: React.FC<VACardProps> = ({
  name,
  experience,
  languages,
  specializations,
  imageUrl,
  profileLink
}) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          marginBottom: '15px',
          objectFit: 'cover'
        }}
      />

      {/* Name */}
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>
        {name}
      </h3>

      {/* Experience */}
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        {experience}
      </p>

      {/* Languages */}
      <div style={{ marginBottom: '10px' }}>
        {languages.map((lang) => (
          <span
            key={lang}
            style={{
              display: 'inline-block',
              fontSize: '12px',
              backgroundColor: '#e8f4f3',
              color: '#049d98',
              padding: '4px 8px',
              borderRadius: '4px',
              marginRight: '5px',
              marginBottom: '5px'
            }}
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Specializations */}
      <div style={{ marginBottom: '15px' }}>
        {specializations.map((spec) => (
          <span
            key={spec}
            style={{
              display: 'inline-block',
              fontSize: '12px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              marginRight: '5px',
              marginBottom: '5px'
            }}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={profileLink}
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#049d98',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'background-color 0.3s'
        }}
      >
        View Profile
      </a>
    </div>
  );
};

declareComponent(VACard, {
  name: 'VA Card',
  description: 'Individual Virtual Assistant card with profile info',
  icon: 'https://cdn-icons-png.flaticon.com/512/3556/3556098.png',
  props: {
    name: {
      type: 'string',
      defaultValue: 'John Doe',
      label: 'VA Name'
    },
    experience: {
      type: 'string',
      defaultValue: '5+ years experience',
      label: 'Experience'
    },
    languages: {
      type: 'array',
      items: { type: 'string' },
      defaultValue: ['English', 'Spanish'],
      label: 'Languages'
    },
    specializations: {
      type: 'array',
      items: { type: 'string' },
      defaultValue: ['Insurance', 'Customer Service'],
      label: 'Specializations'
    },
    imageUrl: {
      type: 'string',
      label: 'Profile Image URL'
    },
    profileLink: {
      type: 'string',
      defaultValue: '/va/john-doe',
      label: 'Profile Link'
    }
  }
});
```

### Ejemplo 3: VA Grid Component (Dinámico)

```typescript
// src/webflow-components/VAGrid.webflow.tsx
import React, { useState } from 'react';
import { declareComponent } from '@webflow/react';
import { VACard } from './VACard.webflow';

interface VA {
  id: string;
  name: string;
  experience: string;
  languages: string[];
  specializations: string[];
  imageUrl: string;
  profileLink: string;
}

interface VAGridProps {
  vas: VA[];
  columns?: 3 | 4;
  showFilters?: boolean;
}

export const VAGrid: React.FC<VAGridProps> = ({
  vas,
  columns = 3,
  showFilters = true
}) => {
  const [filteredVAs, setFilteredVAs] = useState(vas);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const handleFilter = () => {
    let filtered = vas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((va) =>
        va.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter((va) =>
        va.languages.includes(selectedLanguage)
      );
    }

    setFilteredVAs(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedLanguage]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Filters */}
      {showFilters && (
        <div style={{ marginBottom: '30px', display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="Search VAs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
              flex: 1
            }}
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Bilingual">Bilingual</option>
          </select>
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 4 ? '280px' : '320px'}, 1fr))`,
          gap: '20px'
        }}
      >
        {filteredVAs.map((va) => (
          <VACard key={va.id} {...va} />
        ))}
      </div>

      {/* No results */}
      {filteredVAs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No VAs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

declareComponent(VAGrid, {
  name: 'VA Grid',
  description: 'Grid of Virtual Assistants with search and filter',
  icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995467.png',
  props: {
    vas: {
      type: 'array',
      items: {
        type: 'object',
        fields: {
          id: { type: 'string' },
          name: { type: 'string' },
          experience: { type: 'string' },
          languages: { type: 'array', items: { type: 'string' } },
          specializations: { type: 'array', items: { type: 'string' } },
          imageUrl: { type: 'string' },
          profileLink: { type: 'string' }
        }
      },
      label: 'Virtual Assistants',
      helpText: 'Array of VA objects'
    },
    columns: {
      type: 'enum',
      options: [3, 4],
      defaultValue: 3,
      label: 'Grid Columns'
    },
    showFilters: {
      type: 'boolean',
      defaultValue: true,
      label: 'Show Filters'
    }
  }
});
```

---

## 🔄 Paso 3: Sincronizar con Webflow

### Iniciar DevLink

```bash
# En una terminal, inicia el servidor de desarrollo
npm run dev

# En otra terminal, sincroniza con Webflow
npm run webflow:watch
```

### En Webflow Designer

1. Abre tu sitio en Webflow Designer
2. Ve a **Assets** → **Code Components**
3. Deberías ver tus componentes listados
4. Arrastra y suelta en el canvas
5. Configura props en el panel derecho

---

## 📊 Paso 4: Usar Data API para Contenido Dinámico

### Crear helper para Data API

```typescript
// src/utils/webflow-api.ts
import axios from 'axios';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const WEBFLOW_TOKEN = process.env.VITE_WEBFLOW_API_TOKEN;

export const webflowAPI = axios.create({
  baseURL: WEBFLOW_API_BASE,
  headers: {
    'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
    'Accept-Version': '2.0'
  }
});

// Obtener items de una colección
export const getCollectionItems = async (collectionId: string) => {
  const response = await webflowAPI.get(`/collections/${collectionId}/items`);
  return response.data.items;
};

// Crear un item en una colección
export const createCollectionItem = async (
  collectionId: string,
  fieldData: Record<string, any>
) => {
  const response = await webflowAPI.post(
    `/collections/${collectionId}/items`,
    { fieldData }
  );
  return response.data;
};

// Publicar cambios
export const publishSite = async (siteId: string) => {
  const response = await webflowAPI.post(`/sites/${siteId}/publish`);
  return response.data;
};
```

### Usar en un Component

```typescript
// src/webflow-components/DynamicVAGrid.webflow.tsx
import React, { useEffect, useState } from 'react';
import { declareComponent } from '@webflow/react';
import { getCollectionItems } from '../utils/webflow-api';
import { VAGrid } from './VAGrid.webflow';

interface DynamicVAGridProps {
  collectionId: string;
  columns?: 3 | 4;
}

export const DynamicVAGrid: React.FC<DynamicVAGridProps> = ({
  collectionId,
  columns = 3
}) => {
  const [vas, setVas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVAs = async () => {
      try {
        const items = await getCollectionItems(collectionId);
        setVas(items);
      } catch (err) {
        setError('Failed to load VAs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVAs();
  }, [collectionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <VAGrid vas={vas} columns={columns} />;
};

declareComponent(DynamicVAGrid, {
  name: 'Dynamic VA Grid',
  description: 'VA Grid that fetches data from Webflow CMS',
  props: {
    collectionId: {
      type: 'string',
      label: 'Collection ID',
      helpText: 'Webflow CMS collection ID for VAs'
    },
    columns: {
      type: 'enum',
      options: [3, 4],
      defaultValue: 3,
      label: 'Grid Columns'
    }
  }
});
```

---

## 🎯 Mejores Prácticas

### 1. **Nombra los archivos correctamente**
```
✅ Hero.webflow.tsx
✅ VACard.webflow.tsx
❌ Hero.tsx (sin .webflow)
```

### 2. **Usa TypeScript para props**
```typescript
✅ interface HeroProps { title: string; }
❌ const Hero = ({ title }) => { }
```

### 3. **Documenta props con helpText**
```typescript
✅ label: 'Title', helpText: 'Main heading text'
❌ label: 'Title'
```

### 4. **Usa estilos inline o CSS modules**
```typescript
✅ style={{ color: '#049d98' }}
✅ import styles from './Hero.module.css'
❌ Importar CSS global que conflicte con Webflow
```

### 5. **Haz componentes reutilizables**
```typescript
✅ VACard (individual) → VAGrid (múltiples)
❌ Un componente monolítico para todo
```

---

## 🚀 Próximos Pasos

1. **Crear 3 componentes principales** (Hero, Pricing, VACard)
2. **Publicar como shared library**
3. **Instalar en sitio Webflow**
4. **Validar en Designer**
5. **Documentar proceso**

