# SentinelHeaders - HTTP Security Headers Scanner

A professional Python-based CLI tool for assessing HTTP security headers. Scans single or multiple targets, calculates security scores, identifies misconfigurations, and provides actionable recommendations.

## Features
- Comprehensive security header scanning with severity ratings (CRITICAL to LOW)
- Automatic security scoring (0-100) with letter grade (A+ to F)
- Multi-threaded scanning for bulk operations
- Detailed verbose mode with remediation advice
- CSV export for easy reporting
- Customizable scanning parameters (timeout, delay, threads, proxy)
- Color-coded terminal output (with disable option)
- Built-in security headers reference (`--help-headers`)

## Installation
```bash
git clone https://github.com/yourusername/SentinelHeaders.git
cd SentinelHeaders
pip install -r requirements.txt
