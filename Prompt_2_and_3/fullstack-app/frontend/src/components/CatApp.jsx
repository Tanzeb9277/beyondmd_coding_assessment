import React, { useState, useEffect } from 'react';


import CatAppBar from './CatAppBar';
import CardList from './CardList';


import './CatApp.css'

// This component renders the main Cat App UI.
function CatsApp() {

  // Return the main app UI.
  return (
    <div className="catapp-container">
      <CatAppBar />
      <CardList/>
    </div>
  );
}

export default CatsApp;