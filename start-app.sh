#!/bin/bash

# Kill any existing processes
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
sleep 2

# Clear environment variables that might cause issues
unset LD_LIBRARY_PATH

# Get current directory
CURRENT_DIR=$(pwd)

# Start the backend server
echo "Starting backend server..."
cd "$CURRENT_DIR"
/usr/bin/node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start the frontend
echo "Starting frontend..."
cd "$CURRENT_DIR/client"
/usr/bin/node /usr/bin/npm start &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Backend running on: http://localhost:5000"
echo "Frontend running on: http://localhost:3000"
echo ""
echo "SentinelHeaders is starting up..."
echo "Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running and handle Ctrl+C
trap 'echo "Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait