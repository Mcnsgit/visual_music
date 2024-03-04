import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const VisualMusic = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          {/* You can define more routes as needed */}
        </Routes>
        <Main />
        <Footer />
      </div>
    </Router>
  );
};

export default VisualMusic;
