# SentinelHeaders GUI

<div align="center">
[![Live Scan](https://img.shields.io/badge/🌐_Live_Scan-local-00d4aa?style=for-the-badge)](https://lively-tulumba-7c4175.netlify.app/)
**Professional HTTP Security Headers Scanner with Modern React Web Interface**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://docker.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

*Scan • Analyze • Secure - Now with Professional Web Interface*

</div>

## 🌟 Overview

**SentinelHeaders GUI** is a comprehensive web application for HTTP security headers analysis, featuring a modern React frontend with an intuitive dashboard. Built for security professionals, penetration testers, and developers, it provides enterprise-grade security assessment capabilities through an elegant web interface.

### ✨ Key Features

- 🎨 **Modern React Frontend** - Professional, responsive web interface
- 🖥️ **Animated Terminal Demo** - Live demonstration of scanning capabilities  
- 🔍 **Single & Bulk Scanning** - Analyze individual URLs or process multiple targets
- 📊 **Advanced Scoring System** - Letter grades (A+ to F) with detailed metrics
- 📁 **Multiple Export Formats** - JSON, CSV, and detailed text reports
- 🎯 **Real-time Results** - Interactive scanning with live progress updates
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔗 **RESTful API** - Clean API for integration with other tools

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Styled Components** - CSS-in-JS for dynamic theming
- **React Router** - Client-side routing for SPA experience
- **React Hot Toast** - Beautiful notification system
- **React Icons** - Professional icon library

### Backend
- **Node.js & Express** - Fast, scalable server architecture
- **Python Integration** - Core scanning engine powered by SentinelHeaders CLI
- **RESTful API** - Clean endpoints for frontend communication

### DevOps
- **Docker & Docker Compose** - Containerized deployment
- **Environment Configuration** - Flexible config management

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+ 
- **Docker** (optional, for containerized deployment)

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/sneckey0day/SentinelHeaders-GUI.git
cd SentinelHeaders-GUI

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Start the development servers
npm run dev
```

### Option 2: Docker Deployment

```bash
# Clone and build
git clone https://github.com/sneckey0day/SentinelHeaders-GUI.git
cd SentinelHeaders-GUI

# Run with Docker Compose
docker-compose up --build
```

### Access the Application
- **Web Interface**: http://localhost:3000
- **API Endpoint**: http://localhost:5000

## 💻 Usage

### Web Interface

#### 🏠 Dashboard
- Overview of scanning capabilities and statistics
- Animated terminal demonstration
- Quick access to all features
- Security metrics and insights

#### 🔍 Single Scanner
- Analyze individual URLs with detailed results
- Real-time scanning progress
- Comprehensive security scoring
- Export results in multiple formats

#### 📊 Bulk Scanner
- Process multiple URLs simultaneously
- Progress tracking for large scans
- Batch export functionality
- Performance metrics

#### 📚 Headers Reference
- Complete documentation of security headers
- Severity levels and recommendations
- Implementation examples
- Best practices guide

### API Endpoints

#### Single URL Scan
```bash
curl -X POST http://localhost:5000/api/scan/single \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "verbose": true,
    "followRedirects": true
  }'
```

#### Bulk URL Scan
```bash
curl -X POST http://localhost:5000/api/scan/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://example.com", "https://google.com"],
    "threads": 5
  }'
```

## 📋 Security Headers Analyzed

### Critical Headers (25 points each)
- **Strict-Transport-Security (HSTS)** - Enforces HTTPS connections
- **Content-Security-Policy (CSP)** - Prevents XSS and injection attacks

### High Priority Headers (15 points each)
- **X-Frame-Options** - Protects against clickjacking
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **Set-Cookie** - Secure cookie configuration

### Medium Priority Headers (10 points each)
- **Referrer-Policy** - Controls referrer information leakage
- **Permissions-Policy** - Manages browser API access
- **Cross-Origin-Embedder-Policy** - Controls cross-origin embedding
- **Cross-Origin-Opener-Policy** - Manages window object access
- **Cross-Origin-Resource-Policy** - Controls resource sharing
- **Cache-Control** - Prevents sensitive data caching

### Low Priority Headers (5 points each)
- **X-XSS-Protection** - Legacy XSS protection
- **Expect-CT** - Certificate Transparency enforcement

## 📊 Scoring System

### Grade Scale
- **A+ (95-100)** - Excellent security posture
- **A (90-94)** - Very good security implementation
- **B (80-89)** - Good security with minor improvements needed
- **C (70-79)** - Adequate security, several issues to address
- **D (60-69)** - Poor security, significant vulnerabilities
- **F (0-59)** - Critical security issues, immediate action required

### Sample API Response
```json
{
  "url": "https://example.com",
  "statusCode": 200,
  "securityScore": 75,
  "grade": "B",
  "presentHeaders": [
    {
      "name": "X-Content-Type-Options",
      "severity": "HIGH",
      "value": "nosniff"
    }
  ],
  "missingHeaders": [
    {
      "name": "Content-Security-Policy",
      "severity": "CRITICAL",
      "points": 25
    }
  ],
  "recommendations": [
    "Implement Content-Security-Policy to prevent XSS attacks",
    "Add Strict-Transport-Security for HTTPS enforcement"
  ]
}
```

## 🔧 Configuration

### Environment Variables
```bash
# Backend Configuration
PORT=5000
NODE_ENV=production

# Frontend Configuration  
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TITLE=SentinelHeaders GUI
```

### Docker Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
      
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
```

## 🤝 Contributing

We welcome contributions from the security and development community!

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/SentinelHeaders-GUI.git
cd SentinelHeaders-GUI

# Install dependencies
npm install
cd client && npm install && cd ..

# Start development servers
npm run dev
```

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow React best practices and coding standards
4. Write clean, documented code
5. Test thoroughly before submitting
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **SentinelHeaders CLI** - [Original command-line tool](https://github.com/sneckey0day/SentinelHeaders)
- **Security Headers Guide** - [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

## 👥 Development Team

<div align="center">
<table>
<tr>
<td align="center">
<a href="https://github.com/sneckey0day">
<img src="https://github.com/sneckey0day.png" width="100" height="100" style="border-radius: 50%;" alt="Sneckey0day">
</a>
<br>
<strong>Harsh Parashar</strong>
<br>
<sub>Lead Developer & Security Researcher</sub>
<br>
<a href="https://linkedin.com/in/sneckey0day">LinkedIn</a> • 
<a href="https://github.com/sneckey0day">GitHub</a>
</td>
<td align="center">
<a href="https://github.com/prash0xd">
<img src="https://github.com/prash0xd.png" width="100" height="100" style="border-radius: 50%;" alt="prash0xd">
</a>
<br>
<strong>Prashant Kumar</strong>
<br>
<sub>Frontend Developer & UI/UX Designer</sub>
<br>
<a href="https://linkedin.com/in/c0dewithprash/">LinkedIn</a> • 
<a href="https://github.com/prash0xd">GitHub</a>
</td>
</tr>
</table>
</div>

## 🙏 Acknowledgments

- **OWASP** for comprehensive security header guidelines
- **React Community** for excellent documentation and ecosystem
- **Security Research Community** for continuous feedback
- **Open Source Contributors** who helped shape this project

## 📸 Features Preview

### 🏠 Professional Dashboard
- Clean, modern interface with cyber-themed design
- Animated terminal demonstration
- Real-time statistics and metrics
- Quick navigation to all features

### 🔍 Advanced Scanner Interface
- Intuitive single URL scanning
- Real-time progress indicators
- Comprehensive results display
- Multiple export options

### 📊 Detailed Results Analysis
- Color-coded security scoring
- Present vs missing headers visualization
- Actionable security recommendations
- Professional reporting capabilities

### 📚 Comprehensive Documentation
- Complete headers reference guide
- Implementation examples
- Security best practices
- Severity level explanations

---

<div align="center">

**⚠️ Security Notice**

This tool is designed for authorized security testing and educational purposes. Users must ensure compliance with applicable laws and obtain proper authorization before scanning systems they do not own.

**🔒 Privacy Commitment**

SentinelHeaders GUI processes all scans locally and does not transmit data to external services, ensuring your security assessments remain confidential.

---

*Built with ❤️ for the security community*

</div>
