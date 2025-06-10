import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Folders from './pages/Folders';
import FolderDetail from './pages/FolderDetail';
import PrivateRoute from './components/utils/PrivateRoute';
import KeyRedirect from './components/KeyRedirect';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/folders"
          element={
            <PrivateRoute>
              <Folders />
            </PrivateRoute>
          }
        />

        <Route 
          path="/folder/:id" 
          element={
            <PrivateRoute>
              <FolderDetail />
            </PrivateRoute>            
          } 
        />

        {/* Ruta pública para resolver el key */}
        <Route path="/uri/:key" element={<KeyRedirect />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
