# 🔐 SentinelHeaders Web - HTTP Security Headers Scanner

<div align="center">

![SentinelHeaders Web](https://img.shields.io/badge/SentinelHeaders-Web%20App-00ff00?style=for-the-badge)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-61dafb?style=for-the-badge)](https://github.com/facebook/react)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)

**Professional HTTP Security Headers Scanner with Web Interface & Terminal**

*Scan • Score • Secure - Now with Web Dashboard*

</div>

## 🚀 What is SentinelHeaders Web?

SentinelHeaders Web is a modern, responsive web application built on the MERN stack that brings the power of the original SentinelHeaders CLI tool to your browser. It features a terminal-style interface, comprehensive dashboard, and all the scanning capabilities you need for security assessment.

### ✨ Key Features

- 🌐 **Web-based Interface** - Access from any device, anywhere
- 💻 **Terminal Emulator** - Full command-line experience in the browser
- 📊 **Interactive Dashboard** - Real-time statistics and visualizations
- ⚡ **Single & Bulk Scanning** - Scan one URL or hundreds simultaneously
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- 🎨 **Terminal Themes** - Authentic hacker-style green-on-black interface
- 🔍 **Headers Reference** - Built-in comprehensive security headers guide
- 📈 **Progress Tracking** - Real-time scan progress and results
- 💾 **Export Results** - Download scan results as CSV
- 🔒 **Security-First** - Built with security best practices

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sentinelheaders-web
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   # Copy and edit environment variables
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start development servers**
   ```bash
   # Start both server and client in development mode
   npm run dev
   ```

5. **Access the application**
   - Web Interface: http://localhost:3000
   - API Server: http://localhost:5000

### Production Deployment

#### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t sentinelheaders-web .
docker run -p 5000:5000 sentinelheaders-web
```

#### Manual Deployment

```bash
# Build client
cd client
npm run build
cd ..

# Start production server
NODE_ENV=production npm start
```

---

## 🎯 Usage Guide

### 1. Dashboard
- View scanning statistics and system status
- Quick access to all features
- Real-time terminal preview

### 2. Single URL Scanner
- Enter any URL to scan
- Configure timeout and user agent
- Get detailed security analysis with scoring

### 3. Bulk Scanner
- Upload multiple URLs (up to 50 per scan)
- Configure threading and delays
- Export results to CSV
- Real-time progress tracking

### 4. Terminal Interface
- Full command-line experience in browser
- All original CLI commands available
- Command history and auto-completion

### 5. Headers Reference
- Comprehensive security headers guide
- Search and filter by severity
- Examples and implementation details

---

## 🔧 API Endpoints

### Scanning
- `POST /api/scan/single` - Scan single URL
- `POST /api/scan/bulk` - Scan multiple URLs
- `GET /api/scan/headers-reference` - Get headers reference

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent` - Get recent scans

---

## 🎨 Terminal Commands

The web terminal supports all original SentinelHeaders commands:

```bash
# Show help
help

# Scan single URL
scan -u https://example.com

# Scan with options
scan -u example.com -t 15

# Show headers reference
headers

# Check system status
status

# Clear terminal
clear
```

---

## 📱 Responsive Design

SentinelHeaders Web is fully responsive and works perfectly on:

- 📱 **Mobile phones** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Laptops** (1024px+)
- 🖥️ **Desktops** (1200px+)

The terminal interface adapts to screen size while maintaining readability and functionality.

---

## 🔒 Security Features

- **Rate Limiting** - Prevents abuse with configurable limits
- **Input Validation** - All inputs are sanitized and validated
- **CORS Protection** - Configurable cross-origin policies
- **Helmet.js** - Security headers for the web app itself
- **Environment Variables** - Sensitive data stored securely

---

## 🚀 Deployment Options

### 1. Heroku
```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

### 2. Vercel
```bash
# Install Vercel CLI
npm i -g vercel
vercel --prod
```

### 3. DigitalOcean App Platform
- Connect your GitHub repository
- Configure build settings
- Deploy automatically

### 4. AWS/Azure/GCP
- Use Docker container deployment
- Configure load balancer and SSL

---

## 🔧 Configuration

### Environment Variables

```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# Security
JWT_SECRET=your-secret-key
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=https://yourdomain.com
```

### Custom Themes

The terminal interface supports custom themes. Edit the CSS variables in `GlobalStyles.js`:

```css
:root {
  --terminal-bg: #0a0a0a;
  --terminal-fg: #00ff00;
  --terminal-accent: #00ffff;
  /* ... more variables */
}
```

---

## 📊 Performance

- **Fast Scanning** - Multi-threaded concurrent requests
- **Optimized Frontend** - Code splitting and lazy loading
- **Efficient API** - Minimal response payloads
- **Caching** - Smart caching strategies
- **CDN Ready** - Static assets optimized for CDN

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Original SentinelHeaders CLI tool
- React and Node.js communities
- Security research community
- All contributors and users

---

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-repo/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **Email**: support@sentinelheaders.com
- 💬 **Discord**: [Join our community](https://discord.gg/sentinelheaders)

---

<div align="center">

**Built with ❤️ for the security community**

[🌟 Star this repo](https://github.com/your-repo) • [🐛 Report Bug](https://github.com/your-repo/issues) • [💡 Request Feature](https://github.com/your-repo/discussions)

</div>