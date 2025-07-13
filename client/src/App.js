import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

// Components
import Header from './components/Header';
import GitHubLink from './components/GitHubLink';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import BulkScanner from './pages/BulkScanner';
import HeadersReference from './pages/HeadersReference';

// Styles
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 100%;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/bulk-scanner" element={<BulkScanner />} />
            <Route path="/headers-reference" element={<HeadersReference />} />
          </Routes>
        </MainContent>
        <GitHubLink />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '2px solid var(--accent-primary)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: 'var(--cyber-glow)'
            },
            success: {
              iconTheme: {
                primary: 'var(--accent-secondary)',
                secondary: 'var(--bg-primary)'
              }
            },
            error: {
              iconTheme: {
                primary: 'var(--accent-primary)',
                secondary: 'var(--bg-primary)'
              }
            }
          }}
        />
      </AppContainer>
    </Router>
  );
}

export default App;