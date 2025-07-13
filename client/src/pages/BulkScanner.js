import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUpload, FaSpinner, FaDownload, FaTrash } from 'react-icons/fa';

const BulkScannerContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
`;

const ScanForm = styled.form`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  h2 {
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 500;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
  }
`;

const UrlInputSection = styled.div`
  margin-bottom: 2rem;
  
  label {
    display: block;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    padding: 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    font-family: 'Fira Code', monospace;
    resize: vertical;
    
    &:focus {
      border-color: var(--accent-primary);
      background: var(--bg-primary);
    }
    
    &::placeholder {
      color: var(--text-muted);
    }
  }
  
  .url-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  .input-group {
    label {
      display: block;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text-primary);
      
      &:focus {
        border-color: var(--accent-primary);
        background: var(--bg-primary);
      }
    }
  }
`;

const ScanButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.disabled ? 'var(--bg-tertiary)' : 'transparent'};
  border: 1px solid ${props => props.disabled ? 'var(--text-muted)' : 'var(--accent-primary)'};
  color: ${props => props.disabled ? 'var(--text-muted)' : 'var(--accent-primary)'};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }
`;

const ProgressSection = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2rem;
  margin-bottom: 2rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .progress-text {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }
  }
  
  .progress-bar {
    width: 100%;
    height: 20px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: var(--gradient-primary);
      transition: width 0.3s ease;
      border-radius: 10px;
    }
  }
`;

const ResultsSection = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2rem;
  
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h3 {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
  
  .summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    
    .stat {
      background: var(--bg-tertiary);
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
      
      .value {
        font-size: 2rem;
        font-weight: 700;
        background: var(--gradient-secondary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .label {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }
  }
`;

const ResultItem = styled.div`
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    
    .url {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }
    
    .score {
      font-weight: 500;
    }
  }
  
  .result-details {
    color: var(--text-secondary);
    font-size: 0.9rem;
    
    .detail {
      margin: 0.25rem 0;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }
`;

const BulkScanner = () => {
  const [urls, setUrls] = useState('');
  const [options, setOptions] = useState({
    threads: 3,
    timeout: 10,
    delay: 0.5
  });
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);

  const urlList = urls.split('\n').filter(url => url.trim()).map(url => url.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (urlList.length === 0) {
      toast.error('Please enter URLs to scan');
      return;
    }

    if (urlList.length > 50) {
      toast.error('Maximum 50 URLs allowed per scan');
      return;
    }

    setIsScanning(true);
    setResults([]);
    setProgress({ current: 0, total: urlList.length });

    try {
      const response = await axios.post('/api/scan/bulk', {
        urls: urlList,
        options
      });

      setResults(response.data);
      setProgress({ current: urlList.length, total: urlList.length });
      toast.success(`Bulk scan completed! Scanned ${response.data.length} URLs`);
    } catch (error) {
      console.error('Bulk scan error:', error);
      toast.error(error.response?.data?.message || 'Bulk scan failed');
    } finally {
      setIsScanning(false);
    }
  };

  const exportResults = () => {
    const csvContent = [
      ['URL', 'Score', 'Grade', 'Status', 'Missing Headers', 'Present Headers'],
      ...results.map(result => [
        result.url,
        result.securityScore || 0,
        result.grade || 'N/A',
        result.statusCode || 'Error',
        result.missingHeaders ? result.missingHeaders.length : 0,
        result.presentHeaders ? result.presentHeaders.length : 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentinelheaders-bulk-scan-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearResults = () => {
    setResults([]);
    setProgress({ current: 0, total: 0 });
    toast.success('Results cleared');
  };

  const exportJSON = () => {
    if (results.length === 0) return;
    
    const jsonData = {
      scanDate: new Date().toISOString(),
      totalScanned: results.length,
      summary: summary,
      results: results
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-scan-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('JSON exported successfully!');
  };

  const exportDetailed = () => {
    if (results.length === 0) return;
    
    let report = `SentinelHeaders Bulk Scan Report\n`;
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Total URLs Scanned: ${results.length}\n\n`;
    
    results.forEach((result, index) => {
      report += `${index + 1}. ${result.url}\n`;
      if (result.error) {
        report += `   ERROR: ${result.error}\n\n`;
        return;
      }
      
      report += `   Security Score: ${result.securityScore}/100 (Grade: ${result.grade})\n`;
      report += `   Status Code: ${result.statusCode}\n`;
      
      if (result.presentHeaders?.length > 0) {
        report += `   Present Headers (${result.presentHeaders.length}):\n`;
        result.presentHeaders.forEach(header => {
          report += `     + ${header.name} (${header.severity})\n`;
        });
      }
      
      if (result.missingHeaders?.length > 0) {
        report += `   Missing Headers (${result.missingHeaders.length}):\n`;
        result.missingHeaders.forEach(header => {
          report += `     - ${header.name} (${header.severity}) [-${header.points} pts]\n`;
        });
      }
      
      report += `\n`;
    });
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-scan-detailed-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Detailed report exported successfully!');
  };

  const getGradeClass = (grade) => {
    if (!grade) return '';
    return `grade-${grade.toLowerCase().replace('+', '-plus')}`;
  };

  const calculateSummary = () => {
    if (results.length === 0) return null;

    const successful = results.filter(r => !r.error);
    const avgScore = successful.length > 0 
      ? Math.round(successful.reduce((sum, r) => sum + (r.securityScore || 0), 0) / successful.length)
      : 0;

    const grades = successful.reduce((acc, r) => {
      const grade = r.grade || 'F';
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {});

    return {
      total: results.length,
      successful: successful.length,
      failed: results.length - successful.length,
      avgScore,
      grades
    };
  };

  const summary = calculateSummary();

  return (
    <BulkScannerContainer className="fade-in">
      <ScanForm onSubmit={handleSubmit}>
        <h2><FaUpload /> Bulk URL Scanner</h2>
        
        <UrlInputSection>
          <label htmlFor="urls">URLs to Scan (one per line)</label>
          <textarea
            id="urls"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder={`https://example1.com
https://example2.com
example3.com
...`}
            disabled={isScanning}
          />
          <div className="url-count">
            {urlList.length} URL{urlList.length !== 1 ? 's' : ''} ready to scan
          </div>
        </UrlInputSection>

        <OptionsGrid>
          <div className="input-group">
            <label htmlFor="threads">Concurrent Threads</label>
            <input
              id="threads"
              type="number"
              value={options.threads}
              onChange={(e) => setOptions({...options, threads: parseInt(e.target.value) || 3})}
              min="1"
              max="10"
              disabled={isScanning}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="timeout">Timeout (seconds)</label>
            <input
              id="timeout"
              type="number"
              value={options.timeout}
              onChange={(e) => setOptions({...options, timeout: parseInt(e.target.value) || 10})}
              min="1"
              max="60"
              disabled={isScanning}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="delay">Delay (seconds)</label>
            <input
              id="delay"
              type="number"
              step="0.1"
              value={options.delay}
              onChange={(e) => setOptions({...options, delay: parseFloat(e.target.value) || 0.5})}
              min="0"
              max="5"
              disabled={isScanning}
            />
          </div>
        </OptionsGrid>

        <ScanButton type="submit" disabled={isScanning || urlList.length === 0}>
          {isScanning ? (
            <>
              <FaSpinner className="fa-spin" />
              Scanning...
            </>
          ) : (
            <>
              <FaUpload />
              Start Bulk Scan
            </>
          )}
        </ScanButton>
      </ScanForm>

      {isScanning && (
        <ProgressSection className="slide-in">
          <div className="progress-header">
            <h3>Scanning Progress</h3>
            <div className="progress-text">
              {progress.current} / {progress.total} completed
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </ProgressSection>
      )}

      {results.length > 0 && (
        <ResultsSection className="slide-in">
          <div className="results-header">
            <h3>Scan Results ({results.length} URLs)</h3>
            <div className="actions">
              <ActionButton onClick={exportResults}>
                <FaDownload />
                Export CSV
              </ActionButton>
              <ActionButton onClick={exportJSON}>
                <FaDownload />
                Export JSON
              </ActionButton>
              <ActionButton onClick={exportDetailed}>
                <FaDownload />
                Detailed Report
              </ActionButton>
              <ActionButton onClick={clearResults}>
                <FaTrash />
                Clear
              </ActionButton>
            </div>
          </div>

          {summary && (
            <div className="summary">
              <div className="stat">
                <div className="value">{summary.total}</div>
                <div className="label">Total Scanned</div>
              </div>
              <div className="stat">
                <div className="value">{summary.successful}</div>
                <div className="label">Successful</div>
              </div>
              <div className="stat">
                <div className="value">{summary.failed}</div>
                <div className="label">Failed</div>
              </div>
              <div className="stat">
                <div className="value">{summary.avgScore}</div>
                <div className="label">Avg Score</div>
              </div>
            </div>
          )}

          <div className="results-list">
            {results.map((result, index) => (
              <ResultItem key={index}>
                <div className="result-header">
                  <div className="url">{result.url}</div>
                  <div className={`score ${getGradeClass(result.grade)}`}>
                    {result.error ? 'ERROR' : `${result.securityScore}/100 (${result.grade})`}
                  </div>
                </div>
                <div className="result-details">
                  {result.error ? (
                    <div className="detail" style={{ color: '#ff0000' }}>
                      Error: {result.error}
                    </div>
                  ) : (
                    <>
                      <div className="detail">
                        Status: {result.statusCode} | 
                        Present: {result.presentHeaders?.length || 0} | 
                        Missing: {result.missingHeaders?.length || 0}
                      </div>
                    </>
                  )}
                </div>
              </ResultItem>
            ))}
          </div>
        </ResultsSection>
      )}
    </BulkScannerContainer>
  );
};

export default BulkScanner;