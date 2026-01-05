# Deployment & Build Guide

## Phase 7: Build & Deployment Strategy

### Pre-Deployment Checklist

#### Code Quality
- [ ] TypeScript strict mode passes (no `any` types)
- [ ] ESLint passes without warnings
- [ ] No console.log() or debug statements left in production code
- [ ] All environment variables configured
- [ ] API key properly set in `.env.local`

#### Functionality Testing
- [ ] All 9 portfolio pages load correctly
- [ ] Navigation links work on all pages
- [ ] Theme toggle works (light/dark mode)
- [ ] Chat API integration works
- [ ] Resume data loads without errors
- [ ] Mobile menu opens/closes properly
- [ ] All internal links working

#### Visual Testing
- [ ] Dark mode works on all pages
- [ ] Animations run smoothly (60fps)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images load correctly
- [ ] Responsive design works at all breakpoints
- [ ] No broken styling or missing assets

#### Performance
- [ ] Lighthouse score ≥ 90
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)
- [ ] Build size optimized
- [ ] No unused dependencies

### Build Steps

#### 1. Local Build & Test

```bash
# Install dependencies (if needed)
npm install

# Run type checking
npm run type-check

# Run linter
npm run lint

# Build for production
npm run build

# Start production server locally
npm start
```

#### 2. Build Verification

After running `npm run build`, verify:

```bash
# Check build output
ls -la .next/

# Verify all pages are static/prerendered if possible
# Check for any warnings in build output
```

#### 3. Test Production Build Locally

```bash
npm run build
npm start
# Visit http://localhost:3000 in browser
# Test all pages and functionality
```

### Deployment Platforms

#### Option 1: **Vercel** (Recommended for Next.js)

**Advantages:**
- Zero-config deployment
- Automatic optimizations for Next.js
- Serverless functions for API routes
- Built-in CI/CD
- Free tier available
- Edge caching

**Steps:**

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Connect your repository
5. Configure environment variables:
   - `OPENAI_API_KEY` - Set your OpenAI API key
   - `NEXT_PUBLIC_SITE_URL` - Set your deployment URL
6. Click "Deploy"

**Important Configuration:**
```
Environment Variables:
OPENAI_API_KEY = sk-... (get from OpenAI dashboard)
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

#### Option 2: **Netlify**

**Steps:**

1. Push code to Git repository
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Set environment variables (same as above)
7. Deploy

**netlify.toml configuration:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

#### Option 3: **Custom Server (Node.js)**

**Requirements:**
- Node.js 18+ server
- Ubuntu/Debian or similar Linux
- SSL certificate (Let's Encrypt)

**Deployment Steps:**

1. SSH into server
2. Clone repository
3. Install dependencies: `npm install --production`
4. Set environment variables
5. Run production server: `npm start`
6. Set up PM2 or systemd for process management
7. Configure Nginx as reverse proxy
8. Set up SSL with Certbot

**Example Nginx config:**
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

#### Option 4: **Docker Container**

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t portfolio .
docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... portfolio
```

### Environment Variables Setup

Create `.env.production` with:
```
OPENAI_API_KEY=sk-[your-api-key]
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

**Important**: Never commit `.env.local` or actual API keys to version control!

### Pre-Deployment Optimization

#### 1. Minify & Bundle
Next.js automatically handles this, but verify:
```bash
npm run build
# Check .next/static/chunks/ for minified code
```

#### 2. Image Optimization
Already configured in `next.config.js`. Verify:
- Images use `Image` component from `next/image`
- Responsive images with `srcSet`

#### 3. Code Splitting
Next.js automatically splits at page level. Verify:
```bash
# Check build output for code splitting info
npm run build | grep "Analyzing"
```

#### 4. Remove Debug Code
```bash
# Search for console.log in source
grep -r "console.log" app/ components/ --include="*.tsx"
# Remove any found instances
```

### Post-Deployment Tasks

#### 1. Verify Deployment
- [ ] Home page loads at your domain
- [ ] All pages accessible
- [ ] Chat API works with real API key
- [ ] Theme toggle persists
- [ ] Dark mode works

#### 2. Monitor Performance
```
Lighthouse Targets:
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90
```

Use browser DevTools Lighthouse tab or:
```bash
# Using Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

#### 3. Set Up Monitoring
- Enable error tracking (Sentry optional)
- Set up analytics (Google Analytics optional)
- Monitor API usage (OpenAI dashboard)

#### 4. Domain Setup
- Point domain DNS to deployment
- Set up SSL certificate
- Configure email if needed

### Scaling Considerations

As traffic grows:

1. **Database**: Current setup uses no database (all data in resume.json)
2. **API Rate Limiting**: Add rate limiting for chat API calls
3. **Caching**: Enable edge caching for static assets
4. **CDN**: Use CDN for global distribution

### Rollback Plan

If deployment has issues:

1. **Vercel**: Click "Deployments" → select previous → click "Promote"
2. **Netlify**: Site settings → Deploys → previous deploy → "Restore"
3. **Custom**: Keep previous code folder, point to it via PM2/systemd

### Continuous Integration (CI/CD)

#### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
      - run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Security Checklist

- [ ] HTTPS enabled
- [ ] API key not exposed in client code
- [ ] `.env.local` in `.gitignore`
- [ ] No hardcoded secrets
- [ ] CORS configured if needed
- [ ] Input validation on API routes
- [ ] Rate limiting on API endpoints

### Monitoring & Analytics (Optional)

#### Error Tracking
Install Sentry:
```bash
npm install @sentry/react @sentry/nextjs
```

#### Analytics
```bash
npm install next-google-analytics
```

### Domain Configuration

For custom domain:

1. Register domain (GoDaddy, Namecheap, etc.)
2. Configure DNS:
   - Point A record to deployment IP
   - Or configure CNAME if platform supports it
3. Enable SSL/TLS
4. Wait for DNS propagation (24-48 hours)

### Final Checklist

- [ ] Build succeeds without warnings
- [ ] All tests pass
- [ ] Environment variables set correctly
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] Responsive design verified
- [ ] Dark mode works
- [ ] Chat API functional
- [ ] Analytics configured (if using)
- [ ] Error tracking configured (if using)
- [ ] Backup/rollback plan ready
- [ ] Domain set up
- [ ] SSL certificate valid
- [ ] DNS configured

### Post-Launch Monitoring

Monitor for 24 hours:
- [ ] Server uptime
- [ ] Error rates
- [ ] API response times
- [ ] Chat API usage
- [ ] User engagement (if analytics enabled)

### Troubleshooting Deployment Issues

#### Issue: API Key not working
- Verify key is set in environment variables
- Check OpenAI dashboard for key status
- Ensure key has correct permissions

#### Issue: Chat API returning 500 errors
- Check server logs
- Verify API key format
- Test with curl locally first

#### Issue: Pages not loading
- Check build logs for errors
- Verify all dependencies installed
- Check for missing environment variables

#### Issue: Dark mode not persisting
- Clear browser localStorage
- Check ThemeProvider implementation
- Verify CSS variables are set

## Deployment Timeline

**Estimated Timeline:**
- Pre-deployment checks: 15-30 min
- Build & test locally: 5-10 min
- Deploy to production: 2-5 min
- Post-deployment verification: 10-15 min
- **Total: ~45 minutes**

## Support & Maintenance

After deployment:
- Monitor error logs regularly
- Update dependencies monthly
- Review and update resume.json as needed
- Check Lighthouse scores quarterly
- Monitor API usage and costs

