import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SavedAddresses from './pages/saved-addresses';

const App = () => {
  return (
    <Router>
 <div className="bg-red-700">
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/locations" element={<SavedAddresses />} />
   </Routes>
 </div>
</Router>
  );
};

export default App;
