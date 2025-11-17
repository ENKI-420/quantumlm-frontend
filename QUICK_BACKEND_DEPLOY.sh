#!/bin/bash
# Quick Backend Deployment Script for dna::}{::lang AURA QLM
# ΛΦ = 2.176435 × 10⁻⁸ s⁻¹

set -e

echo "============================================================"
echo "  dna::}{::lang Backend API Deployment"
echo "  ΛΦ = 2.176435 × 10⁻⁸ s⁻¹"
echo "============================================================"
echo ""

# Check backend directory
BACKEND_DIR="/home/dev/dnalang-ibm-cloud/experimental_suite/deployment"

if [ ! -d "$BACKEND_DIR" ]; then
  echo "❌ Backend directory not found at $BACKEND_DIR"
  exit 1
fi

echo "✓ Found backend directory"
echo ""

# Deployment options menu
echo "Choose deployment method:"
echo ""
echo "  1) Test locally (http://localhost:8000)"
echo "  2) Deploy to Railway (free, automatic HTTPS)"
echo "  3) Deploy to Render (free, automatic HTTPS)"
echo "  4) Show manual deployment instructions"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    echo ""
    echo "============================================================"
    echo "  LOCAL DEPLOYMENT"
    echo "============================================================"
    echo ""

    # Check Python
    if ! command -v python3 &> /dev/null; then
      echo "❌ Python 3 not found. Please install Python 3.11+"
      exit 1
    fi

    echo "✓ Python 3 found: $(python3 --version)"
    echo ""

    # Check dependencies
    echo "→ Installing dependencies..."
    cd "$BACKEND_DIR"
    pip3 install -q -r requirements.txt || {
      echo "❌ Failed to install dependencies"
      exit 1
    }
    echo "✓ Dependencies installed"
    echo ""

    # Check IBM Quantum credentials
    if [ -f "/home/dev/Pictures/researchdnalangdev.json" ]; then
      echo "✓ IBM Quantum credentials found"
    elif [ -f "/home/dev/Desktop/QNET.json" ]; then
      echo "✓ IBM Quantum credentials found"
    else
      echo "⚠️  Warning: IBM Quantum credentials not found"
      echo "   Backend will run in simulation mode"
      echo "   Place credentials at: /home/dev/Pictures/researchdnalangdev.json"
    fi
    echo ""

    # Start API
    echo "→ Starting backend API..."
    echo "   URL: http://localhost:8000"
    echo "   Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    cd api
    python3 quantum_lm_api.py
    ;;

  2)
    echo ""
    echo "============================================================"
    echo "  RAILWAY DEPLOYMENT"
    echo "============================================================"
    echo ""

    # Check Railway CLI
    if ! command -v railway &> /dev/null; then
      echo "→ Installing Railway CLI..."
      npm install -g @railway/cli
    fi

    echo "✓ Railway CLI found"
    echo ""

    # Login
    echo "→ Logging into Railway..."
    echo "  (This will open your browser)"
    railway login

    # Navigate to project
    cd "$BACKEND_DIR"

    # Initialize project
    echo ""
    echo "→ Initializing Railway project..."
    railway init

    # Set environment variables
    echo ""
    echo "→ Setting environment variables..."
    railway variables --set PORT=8000

    # Generate admin key
    ADMIN_KEY=$(openssl rand -hex 32)
    railway variables --set ADMIN_KEY="$ADMIN_KEY"
    echo "  Admin key generated: $ADMIN_KEY"

    # Deploy
    echo ""
    echo "→ Deploying to Railway..."
    railway up

    # Get domain
    echo ""
    echo "→ Getting your API URL..."
    RAILWAY_URL=$(railway domain 2>&1 || echo "")

    if [ -z "$RAILWAY_URL" ]; then
      echo ""
      echo "============================================================"
      echo "  DEPLOYMENT INITIATED"
      echo "============================================================"
      echo ""
      echo "Your backend is deploying to Railway!"
      echo ""
      echo "Next steps:"
      echo "  1. Go to: https://railway.app/dashboard"
      echo "  2. Select your quantumlm-api project"
      echo "  3. Go to Settings → Generate Domain"
      echo "  4. Copy your domain (e.g., quantumlm-api.railway.app)"
      echo "  5. Set in Vercel: QUANTUM_API_URL=https://your-domain.railway.app"
      echo ""
      echo "Add IBM Quantum credentials:"
      echo "  railway variables --set IBM_QUANTUM_TOKEN=your_key_here"
    else
      echo ""
      echo "============================================================"
      echo "  DEPLOYMENT COMPLETE"
      echo "============================================================"
      echo ""
      echo "✓ Backend API deployed successfully!"
      echo ""
      echo "API URL: https://$RAILWAY_URL"
      echo "Health Check: https://$RAILWAY_URL/health"
      echo "Documentation: https://$RAILWAY_URL/docs"
      echo ""
      echo "Next steps:"
      echo "  1. Test health: curl https://$RAILWAY_URL/health"
      echo "  2. Add IBM credentials: railway variables --set IBM_QUANTUM_TOKEN=your_key"
      echo "  3. Set in Vercel: QUANTUM_API_URL=https://$RAILWAY_URL"
      echo "  4. Redeploy frontend"
      echo ""
      echo "Admin Key: $ADMIN_KEY"
      echo "(Save this for admin endpoints)"
    fi
    ;;

  3)
    echo ""
    echo "============================================================"
    echo "  RENDER DEPLOYMENT INSTRUCTIONS"
    echo "============================================================"
    echo ""
    echo "Render deployment requires GitHub repository."
    echo ""
    echo "Steps:"
    echo "  1. Create GitHub repository:"
    echo "     cd $BACKEND_DIR"
    echo "     git init"
    echo "     git add ."
    echo "     git commit -m 'Initial commit'"
    echo "     gh repo create quantumlm-api --public --source=. --remote=origin"
    echo "     git push -u origin main"
    echo ""
    echo "  2. Go to: https://render.com/dashboard"
    echo "  3. Click 'New +' → 'Web Service'"
    echo "  4. Connect your GitHub repository"
    echo "  5. Configure:"
    echo "     - Name: quantumlm-api"
    echo "     - Environment: Python"
    echo "     - Build Command: pip install -r requirements.txt"
    echo "     - Start Command: cd api && uvicorn quantum_lm_api:app --host 0.0.0.0 --port \$PORT"
    echo "  6. Add environment variables:"
    echo "     - IBM_QUANTUM_TOKEN: your_ibm_key"
    echo "     - ADMIN_KEY: generate_random_key"
    echo "  7. Deploy!"
    echo ""
    echo "Your URL will be: https://quantumlm-api.onrender.com"
    ;;

  4)
    echo ""
    cat <<'EOF'
============================================================
  MANUAL DEPLOYMENT GUIDE
============================================================

Backend Location: /home/dev/dnalang-ibm-cloud/experimental_suite/deployment

Methods:

1. LOCAL TESTING:
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   pip install -r requirements.txt
   cd api && python3 quantum_lm_api.py
   → http://localhost:8000

2. RAILWAY (RECOMMENDED):
   npm install -g @railway/cli
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   railway login
   railway init
   railway up
   railway domain

3. RENDER:
   - Push to GitHub
   - Connect to Render.com
   - Deploy as Web Service

4. VERCEL SERVERLESS:
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   npx vercel --prod

Full instructions: /tmp/quantumlm-frontend/BACKEND_SETUP_GUIDE.md

Environment Variables Needed:
- IBM_QUANTUM_TOKEN (your IBM Quantum API key)
- ADMIN_KEY (generate: openssl rand -hex 32)
- PORT (auto-set by platforms)

After deployment:
- Set in Vercel: QUANTUM_API_URL=https://your-backend-url.com
- Test: curl https://your-backend-url.com/health

EOF
    ;;

  *)
    echo "Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "============================================================"
echo "  For complete documentation, see:"
echo "  /tmp/quantumlm-frontend/BACKEND_SETUP_GUIDE.md"
echo "============================================================"
echo ""
