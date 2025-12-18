import React from 'react';
import './DesignSystemShowcase.css';

const DesignSystemShowcase = () => {
  // Color Palette
  const colors = {
    primary: [
      { name: 'Primary 900', value: '#037b77', usage: 'Darkest teal - Headers, CTAs' },
      { name: 'Primary 700', value: '#049d98', usage: 'Main brand color - Buttons, Links' },
      { name: 'Primary 500', value: '#05bfb9', usage: 'Light teal - Accents' },
      { name: 'Primary 100', value: '#e6fffe', usage: 'Lightest - Backgrounds' },
    ],
    grays: [
      { name: 'Gray 900', value: '#111827', usage: 'Almost black - Headings' },
      { name: 'Gray 800', value: '#1f2937', usage: 'Dark gray' },
      { name: 'Gray 700', value: '#374151', usage: 'Medium dark gray' },
      { name: 'Gray 600', value: '#4b5563', usage: 'Medium gray' },
      { name: 'Gray 500', value: '#6b7280', usage: 'Body text' },
      { name: 'Gray 400', value: '#9ca3af', usage: 'Lighter gray' },
      { name: 'Gray 200', value: '#e5e7eb', usage: 'Borders' },
      { name: 'Gray 100', value: '#f3f4f6', usage: 'Light backgrounds' },
      { name: 'Gray 50', value: '#f9fafb', usage: 'Very light backgrounds' },
    ],
    semantic: [
      { name: 'White', value: '#ffffff', usage: 'Text on dark, cards' },
      { name: 'Black', value: '#000000', usage: 'Pure black' },
      { name: 'Success', value: '#10b981', usage: 'Success states' },
      { name: 'Warning', value: '#f59e0b', usage: 'Warning states' },
      { name: 'Error', value: '#ef4444', usage: 'Error states' },
    ]
  };

  // Typography Scale
  const typography = [
    { name: 'XS', size: '12px', rem: '0.75rem', usage: 'Labels, captions' },
    { name: 'SM', size: '14px', rem: '0.875rem', usage: 'Small text' },
    { name: 'Base', size: '16px', rem: '1rem', usage: 'Body text' },
    { name: 'LG', size: '18px', rem: '1.125rem', usage: 'Large body' },
    { name: 'XL', size: '20px', rem: '1.25rem', usage: 'Small headings' },
    { name: '2XL', size: '24px', rem: '1.5rem', usage: 'Section headings' },
    { name: '3XL', size: '28px', rem: '1.75rem', usage: 'Page headings' },
    { name: '4XL', size: '32px', rem: '2rem', usage: 'Large headings' },
    { name: '5XL', size: '36px', rem: '2.25rem', usage: 'Hero subheadings' },
    { name: '6XL', size: '40px', rem: '2.5rem', usage: 'Hero headings' },
    { name: '7XL', size: '48px', rem: '3rem', usage: 'Large hero' },
    { name: '8XL', size: '56px', rem: '3.5rem', usage: 'Extra large hero' },
  ];

  const fontWeights = [
    { name: 'Normal', value: '400', usage: 'Body text' },
    { name: 'Medium', value: '500', usage: 'Emphasis' },
    { name: 'Semibold', value: '600', usage: 'Subheadings' },
    { name: 'Bold', value: '700', usage: 'Headings' },
  ];

  // Spacing Scale
  const spacing = [
    { name: '0', value: '0', rem: '0', usage: 'No spacing' },
    { name: '1', value: '4px', rem: '0.25rem', usage: 'Tight spacing' },
    { name: '2', value: '8px', rem: '0.5rem', usage: 'Small spacing' },
    { name: '3', value: '12px', rem: '0.75rem', usage: 'Medium-small' },
    { name: '4', value: '16px', rem: '1rem', usage: 'Base spacing' },
    { name: '5', value: '20px', rem: '1.25rem', usage: 'Medium' },
    { name: '6', value: '24px', rem: '1.5rem', usage: 'Large' },
    { name: '8', value: '32px', rem: '2rem', usage: 'Extra large' },
    { name: '10', value: '40px', rem: '2.5rem', usage: 'Section spacing' },
    { name: '12', value: '48px', rem: '3rem', usage: 'Large sections' },
    { name: '16', value: '64px', rem: '4rem', usage: 'Page sections' },
    { name: '20', value: '80px', rem: '5rem', usage: 'Hero spacing' },
  ];

  // Border Radius
  const borderRadius = [
    { name: 'None', value: '0', usage: 'Square elements' },
    { name: 'SM', value: '4px', usage: 'Small elements' },
    { name: 'Base', value: '8px', usage: 'Cards, buttons' },
    { name: 'MD', value: '12px', usage: 'Large cards' },
    { name: 'LG', value: '16px', usage: 'Modals' },
    { name: 'XL', value: '24px', usage: 'Hero sections' },
    { name: 'Full', value: '9999px', usage: 'Pills, badges' },
  ];

  // Shadows
  const shadows = [
    { name: 'None', value: 'none', usage: 'Flat elements' },
    { name: 'SM', value: '0 1px 2px rgba(0, 0, 0, 0.05)', usage: 'Subtle elevation' },
    { name: 'Base', value: '0 2px 4px rgba(0, 0, 0, 0.1)', usage: 'Cards' },
    { name: 'MD', value: '0 4px 8px rgba(0, 0, 0, 0.1)', usage: 'Elevated cards' },
    { name: 'LG', value: '0 8px 16px rgba(0, 0, 0, 0.1)', usage: 'Modals' },
    { name: 'XL', value: '0 20px 25px rgba(0, 0, 0, 0.2)', usage: 'Popovers' },
  ];

  // Breakpoints
  const breakpoints = [
    { name: 'SM', value: '640px', usage: 'Small devices (phones)' },
    { name: 'MD', value: '768px', usage: 'Tablets' },
    { name: 'LG', value: '1024px', usage: 'Desktops' },
    { name: 'XL', value: '1280px', usage: 'Large desktops' },
  ];

  return (
    <div className="ds-showcase">
      <div className="ds-showcase-container">
        {/* Header */}
        <header className="ds-showcase-header">
          <h1 className="ds-showcase-title">Ocean VA Design System</h1>
          <p className="ds-showcase-subtitle">
            Sistema de diseño unificado para componentes Webflow
          </p>
        </header>

        {/* Color Palette */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Color Palette</h2>
          
          {/* Primary Colors */}
          <div className="ds-showcase-subsection">
            <h3 className="ds-showcase-subsection-title">Primary Colors</h3>
            <div className="ds-color-grid">
              {colors.primary.map((color, idx) => (
                <div key={idx} className="ds-color-card">
                  <div 
                    className="ds-color-swatch" 
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="ds-color-info">
                    <div className="ds-color-name">{color.name}</div>
                    <div className="ds-color-value">{color.value}</div>
                    <div className="ds-color-usage">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gray Scale */}
          <div className="ds-showcase-subsection">
            <h3 className="ds-showcase-subsection-title">Gray Scale</h3>
            <div className="ds-color-grid">
              {colors.grays.map((color, idx) => (
                <div key={idx} className="ds-color-card">
                  <div 
                    className="ds-color-swatch" 
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="ds-color-info">
                    <div className="ds-color-name">{color.name}</div>
                    <div className="ds-color-value">{color.value}</div>
                    <div className="ds-color-usage">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="ds-showcase-subsection">
            <h3 className="ds-showcase-subsection-title">Semantic Colors</h3>
            <div className="ds-color-grid">
              {colors.semantic.map((color, idx) => (
                <div key={idx} className="ds-color-card">
                  <div 
                    className="ds-color-swatch" 
                    style={{ 
                      backgroundColor: color.value,
                      border: color.value === '#ffffff' ? '1px solid #e5e7eb' : 'none'
                    }}
                  />
                  <div className="ds-color-info">
                    <div className="ds-color-name">{color.name}</div>
                    <div className="ds-color-value">{color.value}</div>
                    <div className="ds-color-usage">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Typography</h2>
          
          {/* Font Sizes */}
          <div className="ds-showcase-subsection">
            <h3 className="ds-showcase-subsection-title">Font Sizes</h3>
            <div className="ds-typography-grid">
              {typography.map((type, idx) => (
                <div key={idx} className="ds-typography-item">
                  <div 
                    className="ds-typography-preview"
                    style={{ fontSize: type.size }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="ds-typography-info">
                    <div className="ds-typography-name">{type.name}</div>
                    <div className="ds-typography-size">{type.size} / {type.rem}</div>
                    <div className="ds-typography-usage">{type.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Weights */}
          <div className="ds-showcase-subsection">
            <h3 className="ds-showcase-subsection-title">Font Weights</h3>
            <div className="ds-typography-grid">
              {fontWeights.map((weight, idx) => (
                <div key={idx} className="ds-typography-item">
                  <div 
                    className="ds-typography-preview"
                    style={{ fontWeight: weight.value }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="ds-typography-info">
                    <div className="ds-typography-name">{weight.name}</div>
                    <div className="ds-typography-size">{weight.value}</div>
                    <div className="ds-typography-usage">{weight.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Spacing System</h2>
          <p className="ds-showcase-description">
            Sistema basado en 8px (0.5rem) para consistencia
          </p>
          <div className="ds-spacing-grid">
            {spacing.map((space, idx) => (
              <div key={idx} className="ds-spacing-item">
                <div className="ds-spacing-visual">
                  <div 
                    className="ds-spacing-box"
                    style={{ 
                      width: space.value === '0' ? '20px' : space.value,
                      height: space.value === '0' ? '20px' : space.value,
                      backgroundColor: '#049d98'
                    }}
                  />
                </div>
                <div className="ds-spacing-info">
                  <div className="ds-spacing-name">Space {space.name}</div>
                  <div className="ds-spacing-value">{space.value} / {space.rem}</div>
                  <div className="ds-spacing-usage">{space.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Border Radius</h2>
          <div className="ds-border-radius-grid">
            {borderRadius.map((radius, idx) => (
              <div key={idx} className="ds-border-radius-item">
                <div 
                  className="ds-border-radius-visual"
                  style={{ 
                    borderRadius: radius.value,
                    backgroundColor: '#049d98',
                    width: '80px',
                    height: '80px'
                  }}
                />
                <div className="ds-border-radius-info">
                  <div className="ds-border-radius-name">{radius.name}</div>
                  <div className="ds-border-radius-value">{radius.value}</div>
                  <div className="ds-border-radius-usage">{radius.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Shadows</h2>
          <div className="ds-shadow-grid">
            {shadows.map((shadow, idx) => (
              <div key={idx} className="ds-shadow-item">
                <div 
                  className="ds-shadow-visual"
                  style={{ 
                    boxShadow: shadow.value,
                    backgroundColor: '#ffffff',
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px'
                  }}
                />
                <div className="ds-shadow-info">
                  <div className="ds-shadow-name">{shadow.name}</div>
                  <div className="ds-shadow-value">{shadow.value}</div>
                  <div className="ds-shadow-usage">{shadow.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Buttons</h2>
          <div className="ds-button-showcase">
            <div className="ds-button-group">
              <button className="ds-button ds-button-primary">Primary Button</button>
              <button className="ds-button ds-button-secondary">Secondary Button</button>
              <button className="ds-button ds-button-outline">Outline Button</button>
              <button className="ds-button ds-button-ghost">Ghost Button</button>
            </div>
            <div className="ds-button-group">
              <button className="ds-button ds-button-primary ds-button-sm">Small</button>
              <button className="ds-button ds-button-primary">Default</button>
              <button className="ds-button ds-button-primary ds-button-lg">Large</button>
            </div>
            <div className="ds-button-group">
              <button className="ds-button ds-button-primary" disabled>Disabled</button>
              <button className="ds-button ds-button-primary ds-button-loading">Loading...</button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Cards</h2>
          <div className="ds-card-grid">
            <div className="ds-card">
              <div className="ds-card-header">
                <h3 className="ds-card-title">Default Card</h3>
              </div>
              <div className="ds-card-body">
                <p>This is a default card with standard styling. It includes padding, border radius, and shadow.</p>
              </div>
            </div>
            <div className="ds-card ds-card-elevated">
              <div className="ds-card-header">
                <h3 className="ds-card-title">Elevated Card</h3>
              </div>
              <div className="ds-card-body">
                <p>This card has a stronger shadow for more visual prominence.</p>
              </div>
            </div>
            <div className="ds-card ds-card-bordered">
              <div className="ds-card-header">
                <h3 className="ds-card-title">Bordered Card</h3>
              </div>
              <div className="ds-card-body">
                <p>This card uses a border instead of shadow for a cleaner look.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breakpoints */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Responsive Breakpoints</h2>
          <div className="ds-breakpoint-grid">
            {breakpoints.map((bp, idx) => (
              <div key={idx} className="ds-breakpoint-item">
                <div className="ds-breakpoint-name">{bp.name}</div>
                <div className="ds-breakpoint-value">{bp.value}</div>
                <div className="ds-breakpoint-usage">{bp.usage}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Gradients */}
        <section className="ds-showcase-section">
          <h2 className="ds-showcase-section-title">Gradients</h2>
          <div className="ds-gradient-grid">
            <div className="ds-gradient-item">
              <div 
                className="ds-gradient-visual"
                style={{
                  background: 'linear-gradient(135deg, #037b77 0%, #049d98 100%)',
                  height: '120px',
                  borderRadius: '8px'
                }}
              />
              <div className="ds-gradient-info">
                <div className="ds-gradient-name">Primary Gradient</div>
                <div className="ds-gradient-value">linear-gradient(135deg, #037b77 0%, #049d98 100%)</div>
                <div className="ds-gradient-usage">Hero sections, CTAs</div>
              </div>
            </div>
            <div className="ds-gradient-item">
              <div 
                className="ds-gradient-visual"
                style={{
                  background: 'linear-gradient(135deg, #037b77 0%, #049d98 50%, #05bfb9 100%)',
                  height: '120px',
                  borderRadius: '8px'
                }}
              />
              <div className="ds-gradient-info">
                <div className="ds-gradient-name">Extended Gradient</div>
                <div className="ds-gradient-value">linear-gradient(135deg, #037b77 0%, #049d98 50%, #05bfb9 100%)</div>
                <div className="ds-gradient-usage">Special hero sections</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;

