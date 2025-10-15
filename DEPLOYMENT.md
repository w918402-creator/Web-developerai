# Deployment Guide for Web Developer AI

This guide provides step-by-step instructions for deploying the Web Developer AI application to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A Supabase project with the `projects` table created
3. An OpenAI API key
4. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Supabase Database

Make sure you have created the `projects` table in your Supabase database. Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  code JSONB
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects." ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects." ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects." ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects." ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

## Step 2: Configure Supabase Authentication

1. In your Supabase project, go to **Authentication** → **Providers**
2. Enable **Email** authentication
3. Enable **Google** authentication (optional but recommended)
4. Add your production domain to the **Redirect URLs**:
   - Format: `https://your-domain.vercel.app/auth/callback`
   - Also add: `https://your-domain.vercel.app/**` for wildcard support

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Step 4: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Your Supabase anonymous key |
| `OPENAI_API_KEY` | `sk-proj-...` | Your OpenAI API key |
| `ADMIN_EMAIL` | `victorybeats777@gmail.com` | Admin email for restricted access |
| `SUPABASE_PROJECT_ID` | `your-project-id` | Your Supabase project ID |

**Important**: Make sure to mark `OPENAI_API_KEY` as a **secret** environment variable for security.

## Step 5: Redeploy

After adding environment variables, trigger a new deployment:

1. Go to your Vercel project dashboard
2. Click **"Deployments"**
3. Click **"Redeploy"** on the latest deployment
4. Or push a new commit to your Git repository to trigger automatic deployment

## Step 6: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-project.vercel.app`)
2. Test the following features:
   - Landing page loads correctly
   - Sign up and sign in work
   - Google authentication works (if enabled)
   - Creating a new project works
   - AI code generation works
   - Code editor and live preview function properly
   - Download ZIP works
   - Admin panel is accessible with the admin email

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check the Vercel build logs for specific error messages
2. Ensure all dependencies are listed in `package.json`
3. Verify that your Node.js version is compatible (v18 or higher)

### Authentication Issues

If authentication doesn't work:

1. Verify that your Supabase redirect URLs include your Vercel domain
2. Check that environment variables are correctly set
3. Ensure your Supabase project is not paused

### AI Generation Errors

If code generation fails:

1. Verify your OpenAI API key is valid and has credits
2. Check the Vercel function logs for API errors
3. Ensure the API route is not timing out (Vercel has a 10-second timeout for serverless functions on the free plan)

## Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Update your DNS records as instructed by Vercel
5. Update your Supabase redirect URLs to include the custom domain

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring:

1. Go to your project dashboard
2. Click **"Analytics"** to view traffic and performance metrics
3. Click **"Logs"** to view function execution logs

## Security Best Practices

1. **Never commit** `.env.local` or any file containing secrets to Git
2. Use Vercel's environment variable encryption for sensitive data
3. Regularly rotate your API keys
4. Enable Supabase Row Level Security (RLS) policies
5. Monitor your OpenAI API usage to prevent unexpected charges

## Scaling Considerations

As your application grows:

1. Consider upgrading your Vercel plan for higher limits
2. Monitor your Supabase database size and upgrade if needed
3. Implement rate limiting for AI code generation
4. Consider caching frequently generated code patterns
5. Monitor OpenAI API costs and implement usage limits per user

## Support

For deployment issues:

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

**Congratulations!** Your Web Developer AI application is now live and ready to generate amazing web applications! 🚀

