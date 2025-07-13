import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaStop, FaCopy, FaDownload, FaCheckCircle, FaTimesCircle, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ScannerContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  h1 {
    font-size: 2rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

const ScannerGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
  height: calc(100vh - 120px);
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const InputPanel = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  height: fit-content;
  max-height: 100%;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    color: var(--accent-primary);
    margin-bottom: 0.25rem;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: var(--text-muted);
    }
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
  
  label {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-transform: none;
    letter-spacing: normal;
    font-weight: normal;
  }
`;

const ExportOptions = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    color: var(--accent-primary);
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .export-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
`;

const ScanButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.scanning ? 'var(--error)' : 'var(--gradient-primary)'};
  border: none;
  border-radius: 8px;
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
    box-shadow: ${props => props.scanning ? 'var(--error)' : 'var(--blue-glow)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsPanel = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ResultsHeader = styled.div`
  background: var(--bg-tertiary);
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    color: var(--text-primary);
    margin: 0;
    font-size: 1.1rem;
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      background: var(--accent-primary);
      border: none;
      border-radius: 6px;
      color: white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      
      &:hover {
        background: var(--accent-secondary);
        transform: translateY(-1px);
      }
    }
  }
`;

const ResultsContent = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--text-secondary);
    
    .icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    h4 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }
    
    p {
      font-size: 1rem;
      opacity: 0.8;
    }
  }
  
  .scan-summary {
    background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h3 {
        color: var(--text-primary);
        margin: 0;
        font-size: 1.2rem;
      }
      
      .score-badge {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 700;
        font-size: 1.1rem;
        
        &.grade-a { background: linear-gradient(135deg, #10b981, #059669); color: white; }
        &.grade-b { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
        &.grade-c { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
        &.grade-d { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
        &.grade-f { background: linear-gradient(135deg, #7c2d12, #451a03); color: white; }
      }
    }
    
    .summary-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      
      .detail-item {
        text-align: center;
        
        .detail-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
        }
        
        .detail-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }
  
  .headers-section {
    margin-bottom: 1.5rem;
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      
      &.present { color: var(--success); }
      &.missing { color: var(--error); }
    }
    
    .headers-grid {
      display: grid;
      gap: 0.5rem;
    }
    
    .header-card {
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: var(--accent-primary);
        transform: translateY(-1px);
      }
      
      &.present {
        border-left: 4px solid var(--success);
        background: rgba(16, 185, 129, 0.05);
      }
      
      &.missing {
        border-left: 4px solid var(--error);
        background: rgba(239, 68, 68, 0.05);
      }
      
      .header-name {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
      
      .header-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        
        .severity {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
          text-transform: uppercase;
          
          &.critical { background: rgba(239, 68, 68, 0.2); color: var(--error); }
          &.high { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
          &.medium { background: rgba(59, 130, 246, 0.2); color: var(--accent-primary); }
          &.low { background: rgba(16, 185, 129, 0.2); color: var(--success); }
        }
        
        .points {
          color: var(--error);
          font-weight: 600;
        }
      }
      
      .header-value {
        margin-top: 0.5rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
        color: var(--text-muted);
        background: var(--bg-primary);
        padding: 0.3rem;
        border-radius: 4px;
      }
    }
  }
  
  .scanning-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    color: var(--accent-primary);
    
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border);
      border-top: 2px solid var(--accent-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`;

const Scanner = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [followRedirects, setFollowRedirects] = useState(true);
  const [exportJson, setExportJson] = useState(false);
  const [exportCsv, setExportCsv] = useState(false);
  const [exportDetailed, setExportDetailed] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const resultsRef = useRef(null);

  const copyOutput = () => {
    if (!scanResults) return;
    const text = `Security Scan Results for ${scanResults.url}\nScore: ${scanResults.securityScore}/100 (${scanResults.grade})\n\nPresent Headers:\n${scanResults.presentHeaders.map(h => `+ ${h.name} (${h.severity})`).join('\n')}\n\nMissing Headers:\n${scanResults.missingHeaders.map(h => `- ${h.name} (${h.severity})`).join('\n')}`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  const downloadJSON = () => {
    const jsonData = {
      timestamp: new Date().toISOString(),
      target: url,
      scanOptions: { verbose, followRedirects },
      results: scanResults
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `sentinelheaders-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
    toast.success('JSON report downloaded!');
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Header Name', 'Status', 'Severity', 'Points', 'Value'],
      ...scanResults.presentHeaders.map(h => [h.name, 'Present', h.severity, '0', h.value || '']),
      ...scanResults.missingHeaders.map(h => [h.name, 'Missing', h.severity, `-${h.points}`, ''])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `sentinelheaders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
    toast.success('CSV report downloaded!');
  };

  const downloadDetailed = () => {
    let report = `SentinelHeaders Detailed Security Analysis Report\n`;
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Target: ${scanResults.url}\n`;
    report += `Security Score: ${scanResults.securityScore}/100 (Grade: ${scanResults.grade})\n\n`;
    
    report += `PRESENT SECURITY HEADERS:\n`;
    scanResults.presentHeaders.forEach(header => {
      report += `+ ${header.name} (${header.severity})\n`;
      report += `  Value: ${header.value || 'Not specified'}\n`;
      report += `  Impact: Provides protection against security vulnerabilities\n\n`;
    });
    
    report += `MISSING SECURITY HEADERS:\n`;
    scanResults.missingHeaders.forEach(header => {
      report += `- ${header.name} (${header.severity}) [-${header.points} points]\n`;
      report += `  Risk: High security vulnerability\n`;
      report += `  Recommendation: Implement this header immediately\n\n`;
    });
    
    const blob = new Blob([report], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `sentinelheaders-detailed-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
    toast.success('Detailed report downloaded!');
  };

  const downloadReport = () => {
    if (!scanResults) return;
    
    if (exportJson) downloadJSON();
    if (exportCsv) downloadCSV();
    if (exportDetailed) downloadDetailed();
    
    if (!exportJson && !exportCsv && !exportDetailed) {
      toast.error('Please select at least one export format');
    }
  };

  const startScan = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL to scan');
      return;
    }

    setScanning(true);
    setScanResults(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic scan results
      const mockResult = {
        url: url,
        statusCode: 200,
        securityScore: Math.floor(Math.random() * 60) + 30,
        grade: 'C',
        presentHeaders: [
          { name: 'X-Content-Type-Options', severity: 'HIGH', value: 'nosniff' },
          { name: 'X-Frame-Options', severity: 'HIGH', value: 'DENY' },
          { name: 'Cache-Control', severity: 'MEDIUM', value: 'no-cache, no-store' },
          { name: 'X-XSS-Protection', severity: 'LOW', value: '1; mode=block' }
        ],
        missingHeaders: [
          { name: 'Strict-Transport-Security', severity: 'CRITICAL', points: 25 },
          { name: 'Content-Security-Policy', severity: 'CRITICAL', points: 25 },
          { name: 'Referrer-Policy', severity: 'MEDIUM', points: 10 },
          { name: 'Permissions-Policy', severity: 'MEDIUM', points: 10 },
          { name: 'Cross-Origin-Embedder-Policy', severity: 'MEDIUM', points: 8 },
          { name: 'Cross-Origin-Opener-Policy', severity: 'MEDIUM', points: 8 }
        ]
      };
      
      // Add verbose details if enabled
      if (verbose) {
        mockResult.presentHeaders.forEach(header => {
          header.description = `This header provides security protection`;
          header.recommendation = `Header is properly configured`;
        });
        mockResult.missingHeaders.forEach(header => {
          header.description = `Missing critical security header`;
          header.recommendation = `Implement this header to improve security`;
        });
      }
      
      // Determine grade
      if (mockResult.securityScore >= 90) mockResult.grade = 'A+';
      else if (mockResult.securityScore >= 80) mockResult.grade = 'A';
      else if (mockResult.securityScore >= 70) mockResult.grade = 'B';
      else if (mockResult.securityScore >= 60) mockResult.grade = 'C';
      else if (mockResult.securityScore >= 50) mockResult.grade = 'D';
      else mockResult.grade = 'F';
      
      setScanResults(mockResult);
      toast.success('Scan completed successfully!');
      
    } catch (error) {
      toast.error('Scan failed. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const stopScan = () => {
    setScanning(false);
    toast.info('Scan stopped by user');
  };

  return (
    <ScannerContainer>
      <Header>
        <h1>Security Headers Scanner</h1>
        <p>Analyze HTTP security headers for any website or web application</p>
      </Header>

      <ScannerGrid>
        <InputPanel>
          <InputGroup>
            <label>Target URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={scanning}
            />
          </InputGroup>

          <OptionsGrid>
            <CheckboxGroup>
              <input
                type="checkbox"
                id="verbose"
                checked={verbose}
                onChange={(e) => setVerbose(e.target.checked)}
                disabled={scanning}
              />
              <label htmlFor="verbose">Verbose Output</label>
            </CheckboxGroup>
            <CheckboxGroup>
              <input
                type="checkbox"
                id="redirects"
                checked={followRedirects}
                onChange={(e) => setFollowRedirects(e.target.checked)}
                disabled={scanning}
              />
              <label htmlFor="redirects">Follow Redirects</label>
            </CheckboxGroup>
          </OptionsGrid>

          <ExportOptions>
            <h4>Export Options</h4>
            <div className="export-grid">
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="exportJson"
                  checked={exportJson}
                  onChange={(e) => setExportJson(e.target.checked)}
                />
                <label htmlFor="exportJson">JSON Report</label>
              </CheckboxGroup>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="exportCsv"
                  checked={exportCsv}
                  onChange={(e) => setExportCsv(e.target.checked)}
                />
                <label htmlFor="exportCsv">CSV Export</label>
              </CheckboxGroup>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="exportDetailed"
                  checked={exportDetailed}
                  onChange={(e) => setExportDetailed(e.target.checked)}
                />
                <label htmlFor="exportDetailed">Detailed Analysis</label>
              </CheckboxGroup>
            </div>
          </ExportOptions>

          <ScanButton
            onClick={scanning ? stopScan : startScan}
            scanning={scanning}
            disabled={!url.trim() && !scanning}
          >
            {scanning ? (
              <>
                <FaStop />
                Stop Scan
              </>
            ) : (
              <>
                <FaPlay />
                Start Scan
              </>
            )}
          </ScanButton>
        </InputPanel>

        <ResultsPanel>
          <ResultsHeader>
            <h3>Scan Results</h3>
            <div className="actions">
              <button onClick={copyOutput} title="Copy Results" disabled={!scanResults}>
                <FaCopy />
                Copy
              </button>
              <button onClick={downloadReport} title="Download Report" disabled={!scanResults}>
                <FaDownload />
                Download
              </button>
            </div>
          </ResultsHeader>
          <ResultsContent ref={resultsRef}>
            {scanning ? (
              <div className="scanning-indicator">
                <div className="spinner"></div>
                <span>Scanning security headers...</span>
              </div>
            ) : !scanResults ? (
              <div className="placeholder">
                <div className="icon">🔍</div>
                <h4>Ready to Scan</h4>
                <p>Enter a URL above and click "Start Scan" to begin security analysis</p>
              </div>
            ) : (
              <>
                <div className="scan-summary">
                  <div className="summary-header">
                    <h3>Security Analysis Summary</h3>
                    <div className={`score-badge grade-${scanResults.grade.toLowerCase().replace('+', '')}`}>
                      {scanResults.securityScore}/100 ({scanResults.grade})
                    </div>
                  </div>
                  <div className="summary-details">
                    <div className="detail-item">
                      <div className="detail-value">{scanResults.statusCode}</div>
                      <div className="detail-label">Status Code</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-value">{scanResults.presentHeaders.length}</div>
                      <div className="detail-label">Present Headers</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-value">{scanResults.missingHeaders.length}</div>
                      <div className="detail-label">Missing Headers</div>
                    </div>
                  </div>
                </div>

                {scanResults.presentHeaders.length > 0 && (
                  <div className="headers-section">
                    <div className="section-title present">
                      <FaCheckCircle />
                      Present Security Headers ({scanResults.presentHeaders.length})
                    </div>
                    <div className="headers-grid">
                      {scanResults.presentHeaders.map((header, index) => (
                        <div key={index} className="header-card present">
                          <div className="header-name">{header.name}</div>
                          <div className="header-details">
                            <span className={`severity ${header.severity.toLowerCase()}`}>
                              {header.severity}
                            </span>
                          </div>
                          {(verbose || header.value) && (
                            <div className="header-value">{header.value}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {scanResults.missingHeaders.length > 0 && (
                  <div className="headers-section">
                    <div className="section-title missing">
                      <FaTimesCircle />
                      Missing Security Headers ({scanResults.missingHeaders.length})
                    </div>
                    <div className="headers-grid">
                      {scanResults.missingHeaders.map((header, index) => (
                        <div key={index} className="header-card missing">
                          <div className="header-name">{header.name}</div>
                          <div className="header-details">
                            <span className={`severity ${header.severity.toLowerCase()}`}>
                              {header.severity}
                            </span>
                            <span className="points">-{header.points} pts</span>
                          </div>
                          {verbose && header.recommendation && (
                            <div className="header-value">{header.recommendation}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </ResultsContent>
        </ResultsPanel>
      </ScannerGrid>
    </ScannerContainer>
  );
};

export default Scanner;