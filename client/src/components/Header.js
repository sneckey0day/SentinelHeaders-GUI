import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaTimes, FaUsers, FaLinkedin } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  position: relative;
  
  &:hover {
    color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-1px);
  }
  
  &.active {
    color: var(--accent-primary);
    background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 1px;
    }
  }
`;

const IconSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconButton = styled.a`
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-1px);
  }
`;

const TeamDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const TeamButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-1px);
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  right: 0;
  top: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  min-width: 240px;
  z-index: 1000;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border);
  position: relative;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
    color: var(--accent-primary);
    transform: translateX(2px);
    
    .linkedin-icon {
      transform: scale(1.1);
    }
    
    .dev-info .name {
      color: var(--accent-primary);
    }
  }
  
  .linkedin-icon {
    transition: transform 0.2s ease;
    font-size: 1.1rem;
  }
  
  .dev-info {
    display: flex;
    flex-direction: column;
    
    .name {
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }
    
    .handle {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: 'Fira Code', monospace;
    }
  }
`;

const FloatingButtons = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FloatingButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: var(--cyber-glow);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--hover-bg);
    border-color: var(--accent-secondary);
    color: var(--accent-secondary);
    box-shadow: var(--cyan-glow);
    transform: scale(1.1);
  }
`;

const GitHubPanel = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }
    
    button {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        color: var(--accent-primary);
      }
    }
  }
  
  .content {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  
  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-primary);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--hover-bg);
      border-color: var(--accent-primary);
    }
  }
`;

const TeamPanel = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }
    
    button {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        color: var(--accent-primary);
      }
    }
  }
  
  .team-member {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--hover-bg);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .linkedin-icon {
      color: #0077b5;
      font-size: 1.1rem;
    }
    
    .dev-info {
      display: flex;
      flex-direction: column;
      
      .name {
        font-weight: 600;
        font-size: 0.9rem;
      }
      
      .handle {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-family: 'Fira Code', monospace;
      }
    }
  }
`;

const Header = () => {
  const [isGitHubOpen, setIsGitHubOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">SentinelHeaders</Logo>
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/scanner" className={location.pathname === '/scanner' ? 'active' : ''}>Scanner</NavLink>
          <NavLink to="/bulk-scanner" className={location.pathname === '/bulk-scanner' ? 'active' : ''}>Bulk Scanner</NavLink>
          <NavLink to="/headers-reference" className={location.pathname === '/headers-reference' ? 'active' : ''}>Headers Reference</NavLink>
        </NavLinks>
        <FloatingButtons>
          {isGitHubOpen && (
            <GitHubPanel>
              <div className="header">
                <h3>SentinelHeaders</h3>
                <button onClick={() => setIsGitHubOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="content">
                Professional HTTP Security Headers Scanner built with MERN stack.
              </div>
              <a 
                href="https://github.com/sneckey0day/SentinelHeaders" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link"
              >
                <FaGithub />
                View on GitHub
              </a>
            </GitHubPanel>
          )}
          
          {isTeamOpen && (
            <TeamPanel>
              <div className="header">
                <h3>Meet the Team</h3>
                <button onClick={() => setIsTeamOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <a 
                href="https://linkedin.com/in/sneckey0day" 
                target="_blank" 
                rel="noopener noreferrer"
                className="team-member"
                onClick={() => setIsTeamOpen(false)}
              >
                <FaLinkedin className="linkedin-icon" />
                <div className="dev-info">
                  <span className="name">Harsh Parashar</span>
                  <span className="handle">@Sneckey0day</span>
                </div>
              </a>
              <a 
                href="https://www.linkedin.com/in/c0dewithprash/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="team-member"
                onClick={() => setIsTeamOpen(false)}
              >
                <FaLinkedin className="linkedin-icon" />
                <div className="dev-info">
                  <span className="name">Prashant Kumar</span>
                  <span className="handle">@prax0d</span>
                </div>
              </a>
            </TeamPanel>
          )}
          
          <FloatingButton onClick={() => {
            setIsGitHubOpen(!isGitHubOpen);
            setIsTeamOpen(false);
          }}>
            <FaGithub />
          </FloatingButton>
          
          <FloatingButton onClick={() => {
            setIsTeamOpen(!isTeamOpen);
            setIsGitHubOpen(false);
          }}>
            <FaUsers />
          </FloatingButton>
        </FloatingButtons>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;