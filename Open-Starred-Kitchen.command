#!/bin/bash
cd "$(dirname "$0")/dist" 2>/dev/null || cd "$(dirname "$0")"
PORT=5173
(sleep 1; open "http://localhost:$PORT") &
python3 -m http.server "$PORT"
