// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import About from './About'; // Assuming you have an About page

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/about" component={About} />
          {/* Define more routes as needed */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
