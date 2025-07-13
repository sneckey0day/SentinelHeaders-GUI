import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaGlobe, FaChartLine, FaUsers, FaRocket, FaTerminal } from 'react-icons/fa';

const DashboardContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 1.5rem;
  align-items: stretch;
  height: 80vh;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    height: auto;
    text-align: center;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: left;
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const HeroFeatures = styled.div`
  position: relative;
  z-index: 1;
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      color: var(--text-secondary);
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &::before {
        content: '🔹';
        color: var(--accent-primary);
      }
    }
  }
`;

const TerminalDemo = styled.div`
  background: var(--bg-primary);
  border: 2px solid var(--accent-primary);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  
  .terminal-header {
    background: var(--bg-secondary);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    
    .dots {
      display: flex;
      gap: 0.3rem;
      margin-right: 1rem;
      
      span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        
        &:nth-child(1) { background: #ff5f56; }
        &:nth-child(2) { background: #ffbd2e; }
        &:nth-child(3) { background: #27ca3f; }
      }
    }
    
    .title {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
  
  .terminal-content {
    flex: 1;
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
    line-height: 1.4;
    overflow-y: auto;
    color: var(--text-primary);
    
    .terminal-line {
      margin: 2px 0;
      white-space: pre-wrap;
    }
    
    .cursor {
      background: var(--accent-primary);
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .success { color: var(--success); }
    .error { color: var(--error); }
    .warning { color: var(--warning); }
    .info { color: var(--accent-secondary); }
    .critical { color: var(--error); }
    .high { color: var(--warning); }
    .medium { color: var(--accent-secondary); }
    .low { color: var(--text-muted); }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: var(--blue-glow);
  }
  
  .icon {
    font-size: 2rem;
    color: var(--accent-primary);
    margin-bottom: 0.5rem;
  }
  
  .number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .label {
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FeatureCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-secondary);
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 1.8rem;
    color: var(--accent-secondary);
    margin-bottom: 0.5rem;
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.4;
    font-size: 0.9rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: var(--gradient-primary);
  border: none;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--blue-glow);
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 1247,
    securityScore: 85,
    vulnerabilities: 23,
    activeUsers: 156
  });

  useEffect(() => {
    // Terminal Animation for Dashboard
    const terminalLines = [
      '┌─────────────────────────────────────────────────────────────────────────────────┐',
      '│                                                                                 │',
      '│    [#] HTTP SECURITY HEADERS SCANNER v3.0                                       │',
      '│                                                                                 │',
      '│    [*] Professional Security Assessment Tool                                    │',
      '│    [*] WAF Bypass | Threading | Security Policy Analysis                        │',
      '│    [*] Copyright (c) 2025 Security Headers Scanner                              │',
      '│                                                                                 │',
      '└─────────────────────────────────────────────────────────────────────────────────┘',
      '',
      '<span class="info">[*] Configuration:</span>',
      '    Timeout: 10s',
      '    Delay: 0.5s',
      '    Threads: 1',
      '',
      '<span class="success">[+] SINGLE URL SCAN</span>',
      '─────────────────────────────────────────────────────────────────────────────────',
      '',
      '<span class="success">[+] TARGET: https://jecrcuniversity.edu.in</span>',
      '─────────────────────────────────────────────────────────────────────────────────',
      '<span class="info">[*] Status Code: 200</span>',
      '<span class="info">[*] Security Score: 29/100 (Grade: F)</span>',
      '',
      '<span class="success">[+] SECURITY POLICIES</span>',
      '<span class="success">[+] HTTPS_Enforcement: Site uses HTTPS</span>',
      '<span class="warning">[!] Server_Info_Disclosure: Server header disclosed: LiteSpeed</span>',
      '<span class="info">[*] Cookie_Security: No cookies set</span>',
      '',
      '<span class="success">[+] PRESENT SECURITY HEADERS</span>',
      '<span class="success">[+] Content-Security-Policy             (CRITICAL)</span>',
      '<span class="success">[+] X-Powered-By                        (LOW)</span>',
      '',
      '<span class="error">[-] MISSING SECURITY HEADERS</span>',
      '<span class="critical">[-] Strict-Transport-Security           (CRITICAL) [-25 pts]</span>',
      '<span class="high">[-] Set-Cookie                          (HIGH) [-15 pts]</span>',
      '<span class="high">[-] X-Frame-Options                     (HIGH) [-15 pts]</span>',
      '<span class="high">[-] X-Content-Type-Options              (HIGH) [-15 pts]</span>',
      '<span class="low">[-] X-XSS-Protection                    (LOW) [-5 pts]</span>',
      '<span class="medium">[-] Cross-Origin-Resource-Policy        (MEDIUM) [-8 pts]</span>',
      '<span class="medium">[-] Cache-Control                       (MEDIUM) [-10 pts]</span>',
      '<span class="medium">[-] Referrer-Policy                     (MEDIUM) [-10 pts]</span>',
      '<span class="medium">[-] Permissions-Policy                  (MEDIUM) [-10 pts]</span>',
      '',
      '<span class="success">[+] Scan completed in 4.23 seconds</span>'
    ];

    let currentLine = 0;
    const terminalContent = document.getElementById('dashboardTerminal');

    function typeNextLine() {
      if (currentLine < terminalLines.length && terminalContent) {
        const line = terminalLines[currentLine];
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        lineElement.innerHTML = line;
        
        const existingCursor = terminalContent.querySelector('.cursor');
        if (existingCursor) {
          existingCursor.remove();
        }
        
        terminalContent.appendChild(lineElement);
        
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '█';
        lineElement.appendChild(cursor);
        
        terminalContent.scrollTop = terminalContent.scrollHeight;
        
        currentLine++;
        
        const delay = line.trim() === '' ? 300 : (Math.random() * 500 + 200);
        setTimeout(typeNextLine, delay);
      } else {
        setTimeout(() => {
          currentLine = 0;
          if (terminalContent) {
            terminalContent.innerHTML = '<div class="terminal-line"><span class="cursor">█</span></div>';
            setTimeout(typeNextLine, 2000);
          }
        }, 5000);
      }
    }

    setTimeout(typeNextLine, 1000);
  }, []);

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Security Headers Analysis",
      description: "Comprehensive scanning of HTTP security headers with detailed severity ratings and recommendations."
    },
    {
      icon: <FaGlobe />,
      title: "Bulk Domain Scanning",
      description: "Scan multiple domains simultaneously with multi-threaded processing for enterprise-scale assessments."
    },
    {
      icon: <FaChartLine />,
      title: "Security Scoring",
      description: "Advanced scoring algorithm provides letter grades (A+ to F) with actionable improvement suggestions."
    },
    {
      icon: <FaTerminal />,
      title: "Terminal Interface",
      description: "Authentic terminal experience with real-time scanning output and professional command-line feel."
    }
  ];

  return (
    <DashboardContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>SentinelHeaders</HeroTitle>
          <HeroSubtitle>
            Professional HTTP Security Headers Scanner for Red Teams & Security Professionals
          </HeroSubtitle>
          <HeroFeatures>
            <h3>Advanced Security Assessment Tool</h3>
            <ul>
              <li>Real-time Security Analysis</li>
              <li>WAF Bypass Detection</li>
              <li>Multi-threaded Bulk Scanning</li>
              <li>Comprehensive Security Reports</li>
              <li>Security Policy Validation</li>
            </ul>
          </HeroFeatures>
        </HeroContent>
        <TerminalDemo>
          <div className="terminal-header">
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="title">SentinelHeaders Live Demo</div>
          </div>
          <div className="terminal-content" id="dashboardTerminal">
            <div className="terminal-line"><span className="cursor">█</span></div>
          </div>
        </TerminalDemo>
      </Hero>

      <StatsGrid>
        <StatCard>
          <div className="icon"><FaShieldAlt /></div>
          <div className="number">{stats.totalScans.toLocaleString()}</div>
          <div className="label">Total Scans</div>
        </StatCard>
        <StatCard>
          <div className="icon"><FaChartLine /></div>
          <div className="number">{stats.securityScore}%</div>
          <div className="label">Avg Security Score</div>
        </StatCard>
        <StatCard>
          <div className="icon"><FaGlobe /></div>
          <div className="number">{stats.vulnerabilities}</div>
          <div className="label">Vulnerabilities Found</div>
        </StatCard>
        <StatCard>
          <div className="icon"><FaUsers /></div>
          <div className="number">{stats.activeUsers}</div>
          <div className="label">Active Users</div>
        </StatCard>
      </StatsGrid>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <QuickActions>
        <ActionButton onClick={() => window.location.href = '/scanner'}>
          <FaRocket />
          Start Single Scan
        </ActionButton>
        <ActionButton onClick={() => window.location.href = '/bulk-scanner'}>
          <FaGlobe />
          Bulk Scanner
        </ActionButton>
        <ActionButton onClick={() => window.location.href = '/headers-reference'}>
          <FaShieldAlt />
          Headers Reference
        </ActionButton>
      </QuickActions>
    </DashboardContainer>
  );
};

export default Dashboard;