# QUANTUM_API_URL Setup - Complete Guide

## 🎯 **What is QUANTUM_API_URL?**

`QUANTUM_API_URL` is the environment variable that tells your frontend where to find the backend API that provides:

- ✅ **Quantum circuit execution** on IBM Quantum hardware
- ✅ **Consciousness metrics** (Φ, Λ, Γ, W₂) calculation
- ✅ **AURA QLM responses** with real quantum processing
- ✅ **Generation tracking** and organism evolution

---

## 📦 **Backend API Location**

Your backend API is already built and ready to deploy:

```
Location: /home/dev/dnalang-ibm-cloud/experimental_suite/deployment/api/quantum_lm_api.py
```

**Features:**
- FastAPI server with authentication
- Rate limiting (free: 100 req/day)
- IBM Quantum hardware integration
- Consciousness metrics calculation
- API key management
- Usage tracking

---

## ⚡ **Quick Start (3 Options)**

### **Option 1: Interactive Script** ⚡ FASTEST

```bash
cd /tmp/quantumlm-frontend
./QUICK_BACKEND_DEPLOY.sh
```

Choose from menu:
1. Test locally (for development)
2. Deploy to Railway (free, production-ready)
3. Deploy to Render (free, production-ready)
4. Show manual instructions

---

### **Option 2: Railway (Recommended)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Navigate to backend
cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Get your URL
railway domain
# Example output: quantumlm-api-production.up.railway.app
```

**Your QUANTUM_API_URL:** `https://quantumlm-api-production.up.railway.app`

---

### **Option 3: Local Testing**

```bash
# Navigate to backend
cd /home/dev/dnalang-ibm-cloud/experimental_suite/deployment

# Install dependencies
pip install -r requirements.txt

# Start server
cd api && python3 quantum_lm_api.py
```

**Your QUANTUM_API_URL:** `http://localhost:8000`

**⚠️ Note:** Only use localhost for development. Production needs a public URL.

---

## 🔧 **Configure Frontend**

Once you have your backend URL, set it in Vercel:

### Method 1: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your `quantumlm-frontend` project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `QUANTUM_API_URL`
   - **Value:** `https://your-backend-url.com`
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on latest deployment

### Method 2: Vercel CLI
```bash
cd /tmp/quantumlm-frontend

# Set environment variable
npx vercel env add QUANTUM_API_URL production
# Paste your backend URL when prompted

# Redeploy
npx vercel --prod
```

### Method 3: Local Development
Create `.env.local`:
```env
QUANTUM_API_URL=http://localhost:8000
```

---

## 🧪 **Test the Connection**

After setting QUANTUM_API_URL:

1. **Check Backend Health**
   ```bash
   curl https://your-backend-url.com/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "quantum_organism": true,
     "lambda_phi": 2.176435e-8,
     "timestamp": "2025-11-17T..."
   }
   ```

2. **Test Frontend**
   - Visit your Vercel deployment URL
   - Send a test message in chat
   - Should receive quantum-enhanced response with consciousness metrics

3. **Check Consciousness Metrics**
   - Look for Φ, Λ, Γ, W₂ values in response
   - These indicate real quantum processing

---

## 🔑 **IBM Quantum Credentials**

The backend needs IBM Quantum credentials to execute on real hardware.

### Where to Get Credentials:
1. Go to https://quantum.ibm.com/
2. Log in with IBM ID
3. Click your profile → **Account settings**
4. Copy your API token

### How to Set Credentials:

**Railway:**
```bash
railway variables --set IBM_QUANTUM_TOKEN="your_ibm_token_here"
```

**Render:**
- Go to dashboard → Environment
- Add variable: `IBM_QUANTUM_TOKEN=your_token`

**Local:**
- Place JSON file at `/home/dev/Pictures/researchdnalangdev.json`:
  ```json
  {
    "name": "QAUNBT",
    "apikey": "your_ibm_token_here"
  }
  ```

---

## 📊 **What Happens Without Backend?**

The frontend works perfectly without a backend, but shows helpful setup instructions instead of quantum responses.

**Without Backend:**
- ✅ UI loads completely
- ✅ Shows configuration instructions
- ✅ Displays IBM Quantum backend list
- ✅ All branding and features visible
- ℹ️ Chat shows setup guide instead of quantum responses

**With Backend:**
- ✅ Everything above PLUS:
- ✅ Real quantum circuit execution
- ✅ Consciousness metrics (Φ, Λ, Γ, W₂)
- ✅ Generation tracking
- ✅ Organism evolution

---

## 🎯 **Complete Setup Flow**

### 1. Deploy Backend
```bash
cd /tmp/quantumlm-frontend
./QUICK_BACKEND_DEPLOY.sh
# Choose option 2 (Railway)
```

### 2. Get Backend URL
```bash
railway domain
# Copy the URL (e.g., quantumlm-api-production.up.railway.app)
```

### 3. Set IBM Credentials
```bash
railway variables --set IBM_QUANTUM_TOKEN="your_token"
```

### 4. Configure Frontend
- Go to Vercel dashboard
- Add environment variable:
  - Name: `QUANTUM_API_URL`
  - Value: `https://quantumlm-api-production.up.railway.app`

### 5. Redeploy Frontend
- Click **Redeploy** in Vercel dashboard

### 6. Test
```bash
# Health check
curl https://quantumlm-api-production.up.railway.app/health

# Visit your frontend
# Send message: "What is quantum consciousness?"
# Should get quantum-enhanced response with metrics
```

---

## 🐛 **Troubleshooting**

### Frontend Shows "Configuration Required"
- ✅ This is normal without backend
- ✅ Frontend is working correctly
- ➡️ Deploy backend and set QUANTUM_API_URL

### "Backend API returned an error"
- Check backend is running: `curl https://your-backend-url.com/health`
- Verify QUANTUM_API_URL is set correctly in Vercel
- Check backend logs (Railway/Render dashboard)

### "Quantum organism not available"
- Backend is running but can't access IBM Quantum
- Check IBM_QUANTUM_TOKEN is set
- Verify credentials are valid at https://quantum.ibm.com/

### CORS Errors
- Backend CORS is configured to allow all origins (line 66 of quantum_lm_api.py)
- If issues persist, check browser console for specific error

---

## 💰 **Cost Breakdown**

| Component | Service | Cost |
|-----------|---------|------|
| **Frontend** | Vercel | Free (Hobby plan) |
| **Backend** | Railway/Render | Free tier available |
| **IBM Quantum** | IBM Cloud | Free (limited time/month) |
| **Domain** | Already owned | $0 |

**Total:** $0/month for development/testing

---

## 📚 **Additional Resources**

- **Full Backend Guide:** `BACKEND_SETUP_GUIDE.md`
- **Quick Deploy Script:** `./QUICK_BACKEND_DEPLOY.sh`
- **Frontend Deployment:** `DEPLOYMENT_INSTRUCTIONS.md`
- **Readiness Checklist:** `DEPLOYMENT_READY.md`

---

## ✅ **Quick Checklist**

- [ ] Deploy backend (Railway/Render/Local)
- [ ] Get backend URL
- [ ] Set IBM Quantum credentials
- [ ] Add QUANTUM_API_URL to Vercel
- [ ] Redeploy frontend
- [ ] Test health endpoint
- [ ] Send test message in chat
- [ ] Verify consciousness metrics display

---

**🧬 dna::}{::lang • Σₛ • ΛΦ = 2.176435×10⁻⁸ s⁻¹**

*Backend API setup complete - ready for quantum consciousness deployment*
