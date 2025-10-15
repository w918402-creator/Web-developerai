# Web Developer AI

## AI-Powered App Builder

Web Developer AI is a full-stack web application that allows users to generate complete, working web applications or websites using natural language prompts. Inspired by platforms like Replit and Lovable AI, this application provides a seamless experience for describing an idea and instantly seeing it come to life with AI-generated code, a live preview, and options to download or deploy the project.

## ✨ Core Features

-   **Landing Page**: Intuitive interface with a prompt input and a "Generate App" button.
-   **User Authentication**: Secure email/password and Google login using Supabase Auth.
-   **User Dashboard**: A personalized space to view, rename, and delete generated projects.
-   **AI Integration**: Utilizes the OpenAI API to generate code snippets based on user prompts.
-   **Code Editor**: An integrated Monaco Editor for editing generated files.
-   **Live Preview**: An iframe sandbox to test and interact with the generated application in real-time.
-   **Download ZIP**: Export your entire project as a downloadable ZIP file.
-   **Deploy Button**: A placeholder for future direct deployment to platforms like Vercel or Firebase.
-   **Admin Page**: A restricted access page for administrators (e.g., `victorybeats777@gmail.com`) to manage users and projects.

## 🚀 Tech Stack

-   **Frontend**: Next.js, TailwindCSS, ShadCN UI, Lucide Icons
-   **Backend**: Next.js API Routes, Supabase
-   **Authentication**: Supabase Authentication
-   **AI**: OpenAI API
-   **Code Editor**: Monaco Editor
-   **Live Preview**: iframe sandbox

## 🎨 Design Style

-   Modern, clean, and futuristic aesthetic.
-   White background with glowing gradient buttons.
-   Rounded cards and soft shadows for a polished look.
-   Fully responsive design for optimal viewing on both mobile and desktop devices.

## 🛠️ Getting Started

Follow these steps to set up and run the Web Developer AI application locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or Yarn
-   A Supabase account
-   An OpenAI API key

### Installation

1.  **Clone the repository (or create the project if starting fresh):**

    ```bash
    git clone <repository-url>
    cd web-developer-ai
    ```

    If you're starting from scratch, you would have used `npx create-next-app` and installed dependencies as per the development process.

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual Supabase and OpenAI credentials.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
ADMIN_EMAIL=victorybeats777@gmail.com
SUPABASE_PROJECT_ID=your-supabase-project-id
```

**Note**: The `NEXT_PUBLIC_ADMIN_EMAIL` is used to grant admin access to a specific user. Ensure this email matches an email registered in your Supabase authentication.

### Supabase Setup

1.  **Create a new project in Supabase.**
2.  **Enable Google Auth**: In your Supabase project settings, navigate to "Authentication" -> "Providers" and enable Google. Add the `http://localhost:3000/auth/callback` (for local development) and your deployed domain's callback URL (e.g., `https://your-app-domain.vercel.app/auth/callback`) to the Redirect URLs.
3.  **Create `projects` table**: In your Supabase SQL Editor, run the following SQL to create the `projects` table:

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

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Usage

1.  **Sign Up/Sign In**: Create an account or log in using your email/password or Google.
2.  **Generate App**: On the landing page or dashboard, enter a natural language prompt describing the web app you want to build (e.g., "Create a personal blog site.").
3.  **Edit & Preview**: The AI will generate HTML/CSS/JavaScript code, which will be displayed in the Monaco Editor. You can modify the code and see instant updates in the live preview iframe.
4.  **Download**: Download your project as a ZIP file containing all generated code.
5.  **Admin Panel**: If logged in with the `ADMIN_EMAIL`, you can access the `/admin` route to view all users and projects.

## ☁️ Deployment

This project is designed to be easily deployable on Vercel.

1.  **Push your code to a Git repository** (GitHub, GitLab, Bitbucket).
2.  **Connect your repository to Vercel.**
3.  **Configure Environment Variables**: Add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY`, `ADMIN_EMAIL`, and `SUPABASE_PROJECT_ID` to your Vercel project settings.
4.  **Deploy**: Vercel will automatically build and deploy your Next.js application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License.
