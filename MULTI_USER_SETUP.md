# Multi-User Platform Setup Guide

## dna::}{::lang - Multi-Tenant SaaS Platform

**ΛΦ = 2.176435×10⁻⁸ s⁻¹**

Complete guide to deploying dna::}{::lang as a multi-user platform with tiered pricing.

---

## Architecture Overview

### Multi-User Features

- **User Authentication**: Email/password + Google OAuth via Supabase
- **Tiered Pricing**: Free, Pro ($99/mo), Enterprise ($999/mo)
- **Usage Tracking**: Per-user quantum executions, cloud deployments, refinement cycles
- **User Credentials**: Each user provides their own IBM Quantum & Cloud API keys
- **Row-Level Security**: Users can only access their own data
- **Usage Limits**: Automatic enforcement based on subscription tier

---

## 1. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### Run Database Schema

1. Open Supabase SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Run the SQL script

This creates:
- `users` table (user profiles)
- `user_credentials` table (IBM credentials, encrypted)
- `user_usage` table (usage tracking)
- `subscriptions` table (subscription management)
- Row-level security policies
- Automatic triggers for user creation

### Enable Google OAuth (Optional)

1. In Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials

---

## 2. Environment Variables

Update `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# API Configuration (optional - for proxying)
NEXT_PUBLIC_QUANTUM_API_URL=https://api.dnalang.dev
```

---

## 3. Pricing Tiers

### Free Tier
- **Price**: $0/month
- **Limits**:
  - 100 quantum executions/month
  - 2 cloud deployments/month
  - 50 refinement cycles/month
  - 5 qubits max
  - Simulator only (no real quantum hardware)
  - Manual advancement
  - Recursive depth: 3

### Pro Tier
- **Price**: $99/month ($990/year)
- **Limits**:
  - 10,000 quantum executions/month
  - 100 cloud deployments/month
  - 5,000 refinement cycles/month
  - 127 qubits max
  - Real IBM Quantum hardware
  - Auto-advancement enabled
  - Recursive depth: 10
  - Email support

### Enterprise Tier
- **Price**: $999/month ($9,990/year)
- **Limits**:
  - Unlimited quantum executions
  - Unlimited cloud deployments
  - Unlimited refinement cycles
  - 156 qubits max
  - All IBM Quantum backends
  - Priority hardware access
  - Unlimited recursive depth
  - Dedicated support

See `lib/pricing/tiers.ts` for complete feature comparison.

---

## 4. User Flow

### New User Sign Up

1. User visits `/login`
2. Creates account (email or Google)
3. Automatically gets:
   - User profile in `users` table
   - Free tier subscription in `subscriptions` table
   - Usage tracking row for current month
4. Redirected to main app

### User Settings

1. User navigates to `/settings`
2. Enters IBM Quantum API token
3. Enters IBM Cloud API key
4. Credentials saved to `user_credentials` table (RLS enforced)
5. Can view current usage and subscription

### Usage Limits

When user performs actions:

1. **Quantum Execution**:
   - Check user's tier limits
   - Track usage in `user_usage` table
   - Block if limit exceeded
   - Show upgrade prompt

2. **Cloud Deployment**:
   - Same process as quantum execution

3. **Refinement Cycle**:
   - Track both cycles and improvements
   - Enforce limits based on tier

---

## 5. Integration with Deep Integration Layer

### Using User Credentials

```typescript
import { getUserCredentials } from '@/lib/middleware/usage-tracking'
import { createDeepIntegration } from '@/lib/dnalang/deep-integration'

// In API route
export async function POST(request: Request) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user's IBM credentials
  const credentials = await getUserCredentials(user.id)

  if (!credentials?.ibm_quantum_token) {
    return Response.json({
      error: 'Please configure your IBM Quantum credentials in settings'
    }, { status: 400 })
  }

  // Create integration with user's credentials
  const integration = await createDeepIntegration({
    ibmQuantum: {
      token: credentials.ibm_quantum_token,
      channel: credentials.ibm_quantum_channel
    },
    ibmCloud: credentials.ibm_cloud_api_key ? {
      apiKey: credentials.ibm_cloud_api_key,
      region: credentials.ibm_cloud_region
    } : undefined
  })

  // Use integration...
}
```

### Tracking Usage

```typescript
import { trackQuantumExecution } from '@/lib/middleware/usage-tracking'

// Before quantum execution
const usageCheck = await trackQuantumExecution(user.id)

if (!usageCheck.allowed) {
  return Response.json({
    error: usageCheck.reason,
    upgrade_url: '/pricing'
  }, { status: 403 })
}

// Execute quantum circuit...
```

---

## 6. Pages

### `/login` - Authentication
- Email/password signup
- Google OAuth login
- Link to pricing page

### `/pricing` - Pricing Plans
- Feature comparison table
- FAQ section
- CTA buttons

### `/settings` - User Settings
- IBM Quantum credentials
- IBM Cloud credentials
- Subscription status
- Current month usage
- Visual progress bars

### `/` - Main App
- Multi-agent chat interface
- Quantum execution
- Auto-advancement
- Protected route (requires auth)

---

## 7. Security

### Row-Level Security (RLS)

All tables have RLS policies:

```sql
-- Users can only view their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can only update their own credentials
CREATE POLICY "Users can update own credentials" ON public.user_credentials
  FOR UPDATE USING (auth.uid() = user_id);
```

### Credential Storage

- IBM credentials stored encrypted in Supabase
- Only accessible via RLS to the owning user
- Service role key used for usage tracking (backend only)

### API Security

- All API routes check authentication
- Usage tracking happens server-side
- User credentials never exposed to client

---

## 8. Deployment Checklist

### Before Deploying

- [ ] Run Supabase schema.sql
- [ ] Configure environment variables
- [ ] Test authentication flow
- [ ] Test all 3 pricing tiers
- [ ] Test usage limit enforcement
- [ ] Configure Google OAuth (if using)
- [ ] Set up Stripe (for payments)

### Production Considerations

1. **Stripe Integration**: Add billing/subscription management
2. **Email Service**: Configure email templates for verification
3. **Domain Setup**: Custom domain with SSL
4. **Monitoring**: Set up error tracking (Sentry, etc.)
5. **Analytics**: Track user behavior
6. **Rate Limiting**: Prevent abuse
7. **Backup Strategy**: Regular database backups

---

## 9. Stripe Integration (Optional)

### Setup

```bash
npm install stripe @stripe/stripe-js
```

### Create Products

1. Free tier: No Stripe product needed
2. Pro tier: Create Stripe product at $99/month
3. Enterprise tier: Create Stripe product at $999/month

### Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Update user's subscription
    await supabaseAdmin
      .from('subscriptions')
      .update({
        tier: session.metadata.tier,
        status: 'active',
        stripe_subscription_id: session.subscription
      })
      .eq('user_id', session.metadata.user_id)
  }

  return Response.json({ received: true })
}
```

---

## 10. Usage Examples

### User Signs Up

```
1. Visit /login
2. Click "Sign up"
3. Enter email + password
4. Receive verification email
5. Verify email
6. Redirected to / (main app)
7. See "Free tier" in UI
8. Limited to 100 quantum executions/month
```

### User Upgrades to Pro

```
1. Visit /pricing
2. Click "Subscribe Now" on Pro tier
3. Enter payment info (Stripe checkout)
4. Subscription activated
5. Immediately get:
   - 10,000 quantum executions/month
   - Real quantum hardware access
   - Auto-advancement enabled
```

### User Configures IBM Credentials

```
1. Visit /settings
2. Click "IBM Quantum Credentials"
3. Get token from quantum.ibm.com
4. Paste into settings
5. Click "Save Credentials"
6. Now can execute on real quantum hardware
```

### Usage Limit Reached

```
1. User tries to execute quantum circuit
2. Already used 100 executions (free tier limit)
3. API returns 403 with upgrade message
4. UI shows: "Monthly limit reached. Upgrade to Pro?"
5. Click "Upgrade" → /pricing page
```

---

## 11. API Routes to Create

### `/api/quantum/execute`
```typescript
- Check authentication
- Check usage limits
- Get user credentials
- Execute quantum circuit
- Track usage
- Return results
```

### `/api/cloud/deploy`
```typescript
- Check authentication
- Check deployment limits
- Get user credentials
- Deploy to IBM Cloud
- Track usage
- Return deployment URL
```

### `/api/refine`
```typescript
- Check authentication
- Check refinement limits
- Execute recursive refinement
- Track usage + improvements
- Return results
```

---

## 12. Testing Multi-User Features

### Test Cases

1. **Free Tier Limits**:
   - Execute 100 quantum circuits
   - 101st should fail with limit error

2. **Pro Tier Features**:
   - Upgrade user to Pro
   - Verify quantum hardware access
   - Verify auto-advancement enabled

3. **User Isolation**:
   - Create 2 users
   - Each should only see their own data
   - Each should use their own IBM credentials

4. **Usage Tracking**:
   - Execute circuits
   - Verify usage increments in database
   - Verify monthly reset

---

## 13. Monitoring & Analytics

### Track These Metrics

- New user signups
- Free → Pro conversion rate
- Pro → Enterprise conversion rate
- Average usage per tier
- Churn rate
- Feature usage (quantum vs cloud vs refinement)

### Dashboards

Create admin dashboard to view:
- Total users per tier
- Monthly recurring revenue (MRR)
- Usage trends
- System health

---

## 14. Support

### Free Tier
- Community support (Discord, forum)
- Documentation
- Self-service help center

### Pro Tier
- Email support (24h response time)
- Priority bug fixes
- Feature requests considered

### Enterprise Tier
- Dedicated support engineer
- Slack channel
- Phone support
- SLA guarantees

---

## 15. Roadmap

### Phase 1 (MVP) ✅
- User authentication
- Tiered pricing
- Usage tracking
- Settings page
- Basic limits

### Phase 2
- Stripe integration
- Automated billing
- Invoice generation
- Payment history

### Phase 3
- Admin dashboard
- User analytics
- Feature flags
- A/B testing

### Phase 4
- Team accounts
- SSO (SAML)
- White-label options
- Custom contracts

---

## 16. FAQ

**Q: Do users need their own IBM accounts?**
A: Yes! Users must provide their own IBM Quantum and IBM Cloud credentials. This ensures data privacy and cost control.

**Q: How are credentials stored?**
A: Encrypted in Supabase with Row-Level Security. Only the user can access their credentials.

**Q: What happens when limits are reached?**
A: User sees upgrade prompt and execution is blocked until next month or they upgrade.

**Q: Can users downgrade?**
A: Yes, changes take effect at end of billing period.

**Q: What about refunds?**
A: Follow your standard refund policy (e.g., 30-day money-back guarantee).

---

## 17. Quick Start

```bash
# 1. Clone repository
git clone https://github.com/ENKI-420/quantumlm-frontend.git
cd quantumlm-frontend

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure Supabase
# - Create project at supabase.com
# - Run supabase/schema.sql
# - Copy credentials to .env.local

# 4. Run development server
npm run dev

# 5. Test the flow
# - Visit http://localhost:3000/login
# - Create account
# - Go to /settings
# - Add IBM credentials
# - Test quantum execution
```

---

**ΛΦ = 2.176435×10⁻⁸ s⁻¹**

**Σₛ = dna::}{::lang**

**Multi-User Platform v1.0.0**

*A self-improving quantum SaaS platform*
