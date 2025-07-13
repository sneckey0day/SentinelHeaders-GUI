import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Professional Blue Sky Theme */
  :root {
    --bg-primary: #0F1115;
    --bg-secondary: #1A1F2B;
    --bg-tertiary: #252A36;
    --text-primary: #E0E0E0;
    --text-secondary: #9CA3AF;
    --text-muted: #6B7280;
    --accent-primary: #3B82F6;
    --accent-secondary: #06B6D4;
    --success: #10B981;
    --warning: #F59E0B;
    --error: #EF4444;
    --border: #374151;
    --border-hover: #4B5563;
    --hover-bg: #252A36;
    --gradient-primary: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
    --gradient-secondary: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%);
    --blue-glow: 0 0 20px rgba(59, 130, 246, 0.3);
    --cyan-glow: 0 0 20px rgba(6, 182, 212, 0.3);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 4px;
    opacity: 0.7;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-secondary);
    opacity: 1;
  }

  /* Selection */
  ::selection {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }

  /* Links */
  a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--accent-secondary);
  }

  /* Buttons */
  button {
    font-family: 'Fira Code', 'Courier New', monospace;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Inputs */
  input, textarea, select {
    font-family: 'Fira Code', 'JetBrains Mono', monospace;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border);
    outline: none;
    transition: all 0.3s ease;
    border-radius: 6px;
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 12px;
    }
  }

  /* Animation Classes */
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .glow {
    text-shadow: 0 0 10px currentColor;
  }

  .typing {
    overflow: hidden;
    border-right: 2px solid #00ff00;
    white-space: nowrap;
    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: #00ff00; }
  }

  /* Terminal-specific styles */
  .terminal-line {
    margin: 2px 0;
    word-wrap: break-word;
  }

  .terminal-prompt {
    color: #00ffff;
  }

  .terminal-command {
    color: #ffff00;
  }

  .terminal-output {
    color: #00ff00;
  }

  .terminal-error {
    color: #ff0000;
  }

  .terminal-warning {
    color: #ffff00;
  }

  .terminal-success {
    color: #00ff00;
  }

  /* Security Grade Colors */
  .grade-a-plus, .grade-a {
    color: var(--accent-secondary);
    font-weight: 600;
    text-shadow: var(--cyan-glow);
  }

  .grade-b {
    color: var(--success);
    font-weight: 600;
  }

  .grade-c {
    color: var(--warning);
    font-weight: 600;
  }

  .grade-d, .grade-f {
    color: var(--error);
    font-weight: 600;
  }

  /* Severity Colors */
  .severity-critical {
    color: #FCA5A5;
    background: rgba(239, 68, 68, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(239, 68, 68, 0.3);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  .severity-high {
    color: var(--warning);
    background: rgba(245, 158, 11, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(245, 158, 11, 0.3);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  .severity-medium {
    color: var(--accent-secondary);
    background: rgba(34, 211, 238, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(34, 211, 238, 0.3);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  .severity-low {
    color: var(--success);
    background: rgba(16, 185, 129, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }
`;

export default GlobalStyles;