
import React from 'react';

function Header() {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center">
        <span className="text-cyan-400">Short </span>
          <span className="text-white">N</span>
          <span className="text-cyan-400"> Fast</span>
          {/* <span className="ml-2 text-xs align-top bg-cyan-500 text-white px-2 py-1 rounded-md">beta</span> */}
        </h1>
        <p className="text-center text-gray-400 mt-2">Shorten your URLs with lightning speed</p>
      </div>
    </header>
  );
}

export default Header;