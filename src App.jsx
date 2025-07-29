import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './assets/styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="container">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;