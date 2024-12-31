import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` instead of `react-dom`
import App from './App'; // Main App component
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import your Redux store
import './index.css'; // Ensure this matches your file path

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Wrap the app with Provider and pass in the Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
