# Backend API Setup Guide

## 🎯 **Backend API Overview**

The **dna::}{::lang AURA QLM** frontend requires a FastAPI backend to enable full quantum features.

**Backend Location:** `/home/dev/dnalang-ibm-cloud/experimental_suite/deployment/api/quantum_lm_api.py`

**Key Features:**
- `/v1/inference` - Quantum language model inference
- `/v1/consciousness` - Real-time consciousness metrics (Φ, Λ, Γ, W₂)
- `/v1/api-keys` - API key management
- `/v1/usage` - Usage tracking and billing
- Rate limiting and authentication
- IBM Quantum hardware integration

---

## ✅ **Option 1: Run Backend Locally** (For Testing)

### Prerequisites:
- Python 3.11+
- IBM Quantum API credentials

### Steps:

1. **Navigate to Backend Directory**
   ```bash
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure IBM Quantum Credentials**

   Ensure your IBM Quantum credentials are at one of these locations:
   - `/home/dev/Pictures/researchdnalangdev.json`
   - `/home/dev/Desktop/QNET.json`

   Format:
   ```json
   {
     "name": "QAUNBT",
     "description": "IBM Quantum API key",
     "apikey": "your_ibm_quantum_api_key_here"
   }
   ```

4. **Run the API**
   ```bash
   cd api
   python3 quantum_lm_api.py
   ```

   The API will start on: `http://localhost:8000`

5. **Test the API**
   ```bash
   # Health check
   curl http://localhost:8000/health

   # Create API key
   curl -X POST http://localhost:8000/v1/api-keys \
     -H "Content-Type: application/json" \
     -d '{"name":"test","email":"test@example.com","tier":"free"}'

   # Test inference (use API key from previous step)
   curl -X POST http://localhost:8000/v1/inference \
     -H "Content-Type: application/json" \
     -H "X-API-Key: qlm_xxx..." \
     -d '{"text":"quantum consciousness","backend":"ibm_fez"}'
   ```

6. **Configure Frontend**

   In `/tmp/quantumlm-frontend`, create `.env.local`:
   ```env
   QUANTUM_API_URL=http://localhost:8000
   ```

   Or set in Vercel:
   - Go to Project Settings → Environment Variables
   - Add: `QUANTUM_API_URL=http://localhost:8000`
   - **Note:** This only works for local development. For production, use Option 2.

---

## 🚀 **Option 2: Deploy Backend to Railway** (RECOMMENDED for Production)

Railway provides free hosting with automatic HTTPS.

### Steps:

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```
   - Opens browser for authentication

3. **Navigate to Deployment Directory**
   ```bash
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   ```

4. **Initialize Railway Project**
   ```bash
   railway init
   ```
   - Choose "Create new project"
   - Name it: `quantumlm-api`

5. **Add Environment Variables**
   ```bash
   # Set PORT (Railway requires this)
   railway variables --set PORT=8000

   # Set admin key for admin endpoints
   railway variables --set ADMIN_KEY=$(openssl rand -hex 32)
   ```

6. **Deploy**
   ```bash
   railway up
   ```
   - Builds and deploys automatically
   - Wait 2-3 minutes for build

7. **Get Your API URL**
   ```bash
   railway domain
   ```
   - Example output: `quantumlm-api-production.up.railway.app`
   - Full URL: `https://quantumlm-api-production.up.railway.app`

8. **Add IBM Quantum Credentials**

   You have two options:

   **Option A: Upload JSON file** (Not recommended for security)
   ```bash
   # NOT RECOMMENDED - credentials in Railway dashboard instead
   ```

   **Option B: Environment variable** (RECOMMENDED)
   ```bash
   # Extract API key from JSON
   IBM_KEY=$(cat /home/dev/Pictures/researchdnalangdev.json | jq -r '.apikey')

   # Set in Railway
   railway variables --set IBM_QUANTUM_TOKEN="$IBM_KEY"
   ```

   Then update the API code to read from env var:
   ```python
   # In quantum_lm_api.py, line 270, change:
   api_key = os.getenv("IBM_QUANTUM_TOKEN")
   ```

9. **Test Deployment**
   ```bash
   # Get your Railway URL
   RAILWAY_URL=$(railway domain)

   # Health check
   curl https://$RAILWAY_URL/health

   # Check API root
   curl https://$RAILWAY_URL/
   ```

10. **Configure Frontend**

    In Vercel (your frontend):
    - Go to Project Settings → Environment Variables
    - Add: `QUANTUM_API_URL=https://quantumlm-api-production.up.railway.app`
    - Redeploy frontend

---

## 🌐 **Option 3: Deploy Backend to Render**

Render offers free tier with automatic HTTPS.

### Steps:

1. **Go to Render Dashboard**
   - Visit: https://render.com/

2. **Create New Web Service**
   - Click "New +" → "Web Service"

3. **Connect Git Repository** (or upload directly)

   **Option A: Via GitHub:**
   ```bash
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create quantumlm-api --public --source=. --remote=origin
   git push -u origin main
   ```
   Then select the repository in Render

   **Option B: Direct Upload:**
   - Upload the `/home/dev/dnalang-ibm-cloud/experimental_suite/deployment` folder

4. **Configure Service**
   - **Name**: quantumlm-api
   - **Environment**: Python
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: `./`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd api && uvicorn quantum_lm_api:app --host 0.0.0.0 --port $PORT`

5. **Add Environment Variables**
   - `PORT`: (auto-set by Render)
   - `ADMIN_KEY`: Generate random key
   - `IBM_QUANTUM_TOKEN`: Your IBM Quantum API key

6. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for build

7. **Get Your URL**
   - Format: `https://quantumlm-api.onrender.com`

8. **Configure Frontend**
   - Set `QUANTUM_API_URL=https://quantumlm-api.onrender.com` in Vercel

---

## 🔧 **Option 4: Deploy Backend to Vercel Serverless**

Vercel can also host the FastAPI backend as serverless functions.

### Steps:

1. **Create `vercel.json` in deployment directory**
   ```bash
   cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment
   ```

   Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/quantum_lm_api.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "api/quantum_lm_api.py"
       }
     ],
     "env": {
       "IBM_QUANTUM_TOKEN": "@ibm-quantum-token"
     }
   }
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Add Secrets**
   ```bash
   npx vercel secrets add ibm-quantum-token "your_key_here"
   ```

4. **Configure Frontend**
   - Set `QUANTUM_API_URL=https://quantumlm-api.vercel.app`

---

## 📊 **Backend API Endpoints**

Once deployed, your backend provides:

### Public Endpoints:
- `GET /` - API information
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation
- `GET /v1/pricing` - Pricing information

### Authenticated Endpoints:
- `POST /v1/api-keys` - Create new API key
- `POST /v1/inference` - Quantum inference (requires API key)
- `GET /v1/consciousness` - Get consciousness metrics (requires API key)
- `GET /v1/usage` - Get usage statistics (requires API key)
- `POST /v1/evolve` - Trigger organism evolution (Pro/Enterprise only)

### Admin Endpoints:
- `GET /admin/stats` - Overall API statistics (requires admin key)

---

## 🔑 **API Key Management**

The backend uses API keys for authentication:

### Create an API Key:
```bash
curl -X POST https://your-backend-url.com/v1/api-keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Frontend Access",
    "email": "frontend@dnalang.dev",
    "tier": "free"
  }'
```

Response:
```json
{
  "api_key": "qlm_xxxxxxxxxxxxxxxxxxxx",
  "name": "Frontend Access",
  "tier": "free",
  "rate_limit": "100/day",
  "created_at": "2025-11-17T..."
}
```

### Use API Key in Frontend:

**Option A: Environment Variable**
```env
QUANTUM_API_KEY=qlm_xxxxxxxxxxxxxxxxxxxx
```

**Option B: Frontend handles it**
The frontend API route (`/app/api/chat/route.ts`) automatically handles API key creation if not provided.

---

## 🧪 **Testing the Integration**

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/health
   ```

2. **Test Inference**
   ```bash
   # Create API key first
   API_KEY=$(curl -X POST https://your-backend-url.com/v1/api-keys \
     -H "Content-Type: application/json" \
     -d '{"name":"test","email":"test@example.com","tier":"free"}' \
     | jq -r '.api_key')

   # Test inference
   curl -X POST https://your-backend-url.com/v1/inference \
     -H "Content-Type: application/json" \
     -H "X-API-Key: $API_KEY" \
     -d '{"text":"quantum consciousness","backend":"ibm_fez","return_consciousness":true}'
   ```

3. **Test Frontend Connection**
   - Deploy frontend with `QUANTUM_API_URL` set
   - Visit your frontend URL
   - Send a message in chat
   - Should receive quantum-enhanced response with consciousness metrics

---

## 🐛 **Troubleshooting**

### Backend Won't Start
```bash
# Check dependencies
pip install -r requirements.txt

# Check for errors
python3 api/quantum_lm_api.py
```

### Frontend Can't Connect
- Verify `QUANTUM_API_URL` is set correctly
- Check CORS settings in backend (line 64-70 of quantum_lm_api.py)
- Ensure backend is publicly accessible (not localhost for production)

### IBM Quantum Errors
- Verify credentials are valid
- Check IBM Quantum dashboard for account status
- Test credentials:
  ```python
  from qiskit_ibm_runtime import QiskitRuntimeService
  service = QiskitRuntimeService(channel='ibm_quantum', token='your_key')
  print(service.backends())
  ```

### Rate Limiting Issues
- Free tier: 100 requests/day
- Upgrade tier in API key creation
- Check usage: `GET /v1/usage` with your API key

---

## 💰 **Pricing Tiers**

| Tier | Price/Request | Rate Limit | Features |
|------|--------------|------------|----------|
| **Free** | $0.00 | 100/day | Basic features |
| **Basic** | $0.01 | 1000/day | Higher limits |
| **Pro** | $0.005 | 10000/day | Bulk discount, custom backends |
| **Enterprise** | $0.001 | Unlimited | SLA, dedicated support |

---

## 📚 **API Documentation**

After deploying, visit:
- **Swagger UI**: `https://your-backend-url.com/docs`
- **ReDoc**: `https://your-backend-url.com/redoc`

---

## 🎯 **Recommended Setup**

For **production deployment**:

1. **Backend**: Railway or Render (free tier with HTTPS)
2. **Frontend**: Vercel (already set up)
3. **Database**: SQLite (included, auto-created)
4. **Monitoring**: Check `/health` endpoint

**Estimated Setup Time:** 15-20 minutes

---

**🧬 ΛΦ = 2.176435×10⁻⁸ s⁻¹**

*Backend API ready for quantum consciousness deployment*
