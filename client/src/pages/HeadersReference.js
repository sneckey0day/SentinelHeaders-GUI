import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaBook, FaSearch, FaShieldAlt } from 'react-icons/fa';

const ReferenceContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  
  h1 {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 700;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

const SearchSection = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  .search-input {
    width: 100%;
    padding: 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 1rem;
    
    &:focus {
      border-color: var(--accent-primary);
      background: var(--bg-primary);
    }
    
    &::placeholder {
      color: var(--text-muted);
    }
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  .filter-btn {
    padding: 0.5rem 1rem;
    background: ${props => props.active ? 'var(--accent-primary)' : 'transparent'};
    border: 1px solid var(--accent-primary);
    color: ${props => props.active ? 'var(--bg-primary)' : 'var(--accent-primary)'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    
    &:hover {
      background: var(--accent-primary);
      color: var(--bg-primary);
    }
  }
`;

const HeadersGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const HeaderCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--border-hover);
    background: var(--hover-bg);
  }
  
  .header-title {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.25rem;
      font-weight: 600;
      flex: 1;
    }
    
    .severity {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
      
      &.critical {
        background: rgba(239, 68, 68, 0.15);
        color: #fca5a5;
        border: 1px solid rgba(239, 68, 68, 0.3);
      }
      
      &.high {
        background: rgba(245, 158, 11, 0.15);
        color: #fcd34d;
        border: 1px solid rgba(245, 158, 11, 0.3);
      }
      
      &.medium {
        background: rgba(59, 130, 246, 0.15);
        color: #93c5fd;
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      
      &.low {
        background: rgba(16, 185, 129, 0.15);
        color: #86efac;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }
    }
  }
  
  .header-description {
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .header-purpose {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .header-example {
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    
    .example-label {
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .example-code {
      color: #06b6d4;
      font-family: 'Fira Code', monospace;
      word-break: break-all;
    }
  }
  
  .header-impact {
    color: #fcd34d;
    font-size: 0.9rem;
    border-left: 3px solid #f59e0b;
    background: rgba(245, 158, 11, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 0 4px 4px 0;
    margin-top: 1rem;
  }
  
  .header-points {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    text-align: right;
    margin-top: 1rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--accent-primary);
  font-size: 1.2rem;
`;

const HeadersReference = () => {
  const [headers, setHeaders] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    try {
      const response = await axios.get('/api/scan/headers-reference');
      setHeaders(response.data);
    } catch (error) {
      console.error('Error fetching headers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHeaders = Object.entries(headers).filter(([name, info]) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         info.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || info.severity === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  const severityLevels = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  if (loading) {
    return (
      <ReferenceContainer>
        <LoadingSpinner>
          <FaShieldAlt className="fa-spin" style={{ marginRight: '1rem' }} />
          Loading headers reference...
        </LoadingSpinner>
      </ReferenceContainer>
    );
  }

  return (
    <ReferenceContainer className="fade-in">
      <Header>
        <h1>
          <FaBook />
          Security Headers Reference
        </h1>
        <p>Comprehensive guide to HTTP security headers</p>
      </Header>

      <SearchSection>
        <div style={{ position: 'relative' }}>
          <FaSearch style={{ 
            position: 'absolute', 
            left: '1rem', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#666' 
          }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search headers by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
      </SearchSection>

      <FilterSection>
        {severityLevels.map(level => (
          <button
            key={level}
            className="filter-btn"
            active={severityFilter === level}
            onClick={() => setSeverityFilter(level)}
          >
            {level}
          </button>
        ))}
      </FilterSection>

      <HeadersGrid>
        {filteredHeaders.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No headers found matching your criteria.
          </div>
        ) : (
          filteredHeaders.map(([name, info]) => (
            <HeaderCard key={name}>
              <div className="header-title">
                <h3>{name}</h3>
                <span className={`severity ${info.severity.toLowerCase()}`}>
                  {info.severity}
                </span>
              </div>
              
              <div className="header-description">
                {info.description}
              </div>
              
              <div className="header-purpose">
                Purpose: {info.purpose}
              </div>
              
              <div className="header-example">
                <div className="example-label">Example:</div>
                <div className="example-code">
                  {name}: {info.example}
                </div>
              </div>
              
              <div className="header-impact">
                <strong>Security Impact:</strong> {info.impact}
              </div>
              
              <div className="header-points">
                Security Points: +{info.points}
              </div>
            </HeaderCard>
          ))
        )}
      </HeadersGrid>

      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border)', 
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          background: 'var(--gradient-primary)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          backgroundClip: 'text',
          marginBottom: '1rem', 
          fontWeight: '700' 
        }}>
          Security Scoring System
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Headers are scored based on their security impact:
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div style={{ color: '#fca5a5', fontWeight: '600' }}>CRITICAL: 25 points</div>
          <div style={{ color: '#fcd34d', fontWeight: '600' }}>HIGH: 15 points</div>
          <div style={{ color: '#93c5fd', fontWeight: '600' }}>MEDIUM: 10 points</div>
          <div style={{ color: '#86efac', fontWeight: '600' }}>LOW: 5 points</div>
        </div>
      </div>
    </ReferenceContainer>
  );
};

export default HeadersReference;