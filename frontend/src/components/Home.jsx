import React from 'react';
import UrlShortener from './UrlShortener';
import UrlLookup from './UrlLookup';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl ">
        <main className="space-y-8">
          <UrlShortener />
          <UrlLookup />
        </main>
      </div>
    </div>
  );
}

export default Home;