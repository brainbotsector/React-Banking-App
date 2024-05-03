// Tabs.js
import React from 'react';

function Tabs({ selectedTab, handleTabChange }) {
  return (
    <div className="tabs">
      <button className={selectedTab === 'Home' ? 'active' : ''} onClick={() => handleTabChange('Home')}>Home</button>
      <button className={selectedTab === 'About' ? 'active' : ''} onClick={() => handleTabChange('About')}>About</button>
      <button className={selectedTab === 'Services' ? 'active' : ''} onClick={() => handleTabChange('Services')}>Services</button>
      <button className={selectedTab === 'Contact' ? 'active' : ''} onClick={() => handleTabChange('Contact')}>Contact</button>
      <button className={selectedTab === 'Other' ? 'active' : ''} onClick={() => handleTabChange('Other')}>Other</button>
    </div>
  );
}

export default Tabs;
