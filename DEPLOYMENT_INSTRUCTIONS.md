# dna::}{::lang Deployment Instructions

## 🚀 Deploying to Vercel (Multiple Options)

The **dna::}{::lang AURA QLM** platform is ready for production deployment. Choose one of the methods below.

---

## **Option 1: Vercel Dashboard (Recommended)**

This bypasses CLI permission issues and works directly through the web interface.

### Steps:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Log in with your Vercel account

2. **Import New Project**
   - Click "Add New..." → "Project"
   - Choose "Import Git Repository"

3. **Upload or Connect Repository**

   **Option A: Upload Directly**
   - Click "Upload"
   - Drag and drop the `/tmp/quantumlm-frontend` folder

   **Option B: Connect GitHub** (if pushing to GitHub first)
   - Select your GitHub account
   - Choose the repository
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. **Environment Variables** (Optional)
   Add these if you have a backend API:
   ```
   QUANTUM_API_URL=https://your-backend-api.com
   IBM_QUANTUM_API_TOKEN=your_ibm_token_here
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://your-project.vercel.app`

7. **Configure Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add: `www.dnalang.dev` or `chat.dnalang.dev`
   - Vercel will provide DNS records to add to Namecheap

---

## **Option 2: GitHub + Vercel Auto-Deploy**

Set up continuous deployment from GitHub.

### Steps:

1. **Create GitHub Repository**
   ```bash
   cd /tmp/quantumlm-frontend

   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit: dna::}{::lang AURA QLM platform"

   # Create GitHub repo via CLI
   gh repo create quantumlm-frontend --public --source=. --remote=origin

   # Push to GitHub
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Authorize Vercel to access your GitHub
   - Select the `quantumlm-frontend` repository
   - Click "Import"

3. **Configure (same as Option 1, step 4-5)**

4. **Auto-Deploy**
   - Every `git push` to `main` will trigger automatic deployment
   - View deployment status in Vercel dashboard

---

## **Option 3: Vercel CLI with Login**

If you have proper account access, deploy via CLI.

### Prerequisites:
- Vercel account owner access
- Proper team permissions

### Steps:

1. **Login to Vercel**
   ```bash
   cd /tmp/quantumlm-frontend
   npx vercel login
   ```
   - Follow the browser prompt to authenticate

2. **Deploy to Production**
   ```bash
   npx vercel --prod
   ```

3. **Get Deployment URL**
   - Copy the provided URL (e.g., `https://quantumlm-frontend.vercel.app`)

---

## **Current Deployment Issue**

The CLI deployment is blocked due to:
```
Error: Git author devinphillipdavis-7227@users.noreply.github.com must have access
to the team devinphillipdavis-7227's projects on Vercel
```

### To Fix:
1. Go to Vercel Dashboard → Settings → Members
2. Invite the git author email to the team
3. OR use **Option 1** (Dashboard upload) which bypasses this issue

---

## **Post-Deployment Checklist**

After successful deployment:

- [ ] ✅ Visit your deployment URL
- [ ] ✅ Test chat functionality (will show configuration message if backend not set)
- [ ] ✅ Verify IBM Quantum backend status displays
- [ ] ✅ Check generation tracking increments
- [ ] ✅ Test consciousness metrics display (if backend configured)
- [ ] ✅ Verify dna::}{::lang branding displays correctly
- [ ] ✅ Configure custom domain (optional)
- [ ] ✅ Set environment variables for backend API (if available)

---

## **Backend Configuration**

The frontend will work immediately but needs a backend for full functionality:

### Without Backend:
- ✅ UI loads and works
- ✅ Shows helpful configuration instructions
- ✅ Displays IBM Quantum backend status
- ✅ All branding and UI features work

### With Backend:
To enable full quantum functionality:

1. **Deploy Backend API**
   - FastAPI server with IBM Quantum integration
   - Located in: `/home/dev/dnalang-ibm-cloud/experimental_suite/deployment/api/`

2. **Set Environment Variable in Vercel**
   - Go to Project Settings → Environment Variables
   - Add: `QUANTUM_API_URL=https://your-backend.com`
   - Redeploy to apply changes

3. **Backend Requirements**
   - `/v1/inference` endpoint (POST)
   - `/v1/status` endpoint (GET)
   - IBM Quantum credentials configured

---

## **Project Structure**

```
/tmp/quantumlm-frontend/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── chat/         # Chat endpoint with graceful fallbacks
│   │   └── quantum/      # Backend status endpoints
│   ├── page.tsx          # Main chat interface
│   └── layout.tsx        # Root layout with dna::}{::lang branding
├── components/           # React components
├── lib/                  # Utilities
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.mjs       # Next.js configuration
└── vercel.json           # Vercel deployment config
```

---

## **Environment Variables Reference**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `QUANTUM_API_URL` | No | - | Backend API endpoint |
| `IBM_QUANTUM_API_TOKEN` | No | - | Direct IBM Quantum access |
| `QUANTUM_API_KEY` | No | - | Backend API authentication |
| `NEXT_PUBLIC_API_URL` | No | - | Public-facing API URL |

---

## **Troubleshooting**

### Build Fails
```bash
cd /tmp/quantumlm-frontend
npm run build
```
- Check error messages
- Ensure all dependencies installed: `npm install`

### Deployment Succeeds But Site Doesn't Work
- Check Vercel deployment logs
- Verify environment variables are set
- Check browser console for errors

### Backend Connection Fails
- Verify `QUANTUM_API_URL` is set correctly
- Check backend API is deployed and accessible
- Test backend health: `curl https://your-backend/health`

---

## **Performance Optimization**

After deployment, consider:

1. **Enable Edge Functions** (Vercel Pro)
   - Faster response times globally
   - Lower latency for API routes

2. **Configure Caching**
   - Backend status can be cached for 60 seconds
   - Reduces API calls to IBM Quantum

3. **Monitor Analytics**
   - Vercel Analytics already integrated
   - View real-time usage and performance

---

## **Support**

For issues:
- Check logs: Vercel Dashboard → Your Project → Logs
- Test locally: `npm run dev`
- Rebuild: `npm run build`

---

**🧬 dna::}{::lang • Σₛ Self-Referential Organism • ΛΦ = 2.176435×10⁻⁸**

*Ready for quantum consciousness deployment*
