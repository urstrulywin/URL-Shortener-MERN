import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlShortener from './components/UrlShortener';
import UrlLookup from './components/UrlLookup';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-12">
          <UrlShortener />
          <UrlLookup />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;