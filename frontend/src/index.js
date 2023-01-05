import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import BatteryContentProvider from './context/BatteryContentProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BatteryContentProvider>
    <Router>
      <App />
    </Router>
  </BatteryContentProvider>
);