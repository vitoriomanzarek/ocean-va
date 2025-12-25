/**
 * Main Page Entry Point
 * This is the root page that renders the FindYourPerfectVA component
 */

import React from 'react';
import FindYourPerfectVA from '../src/components/FindYourPerfectVA/FindYourPerfectVA';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <FindYourPerfectVA />
    </div>
  );
}

