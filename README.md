# Smart Chef Application

Smart Chef is a React application that recommends recipes based on the ingredients you have. It uses OpenAI's API to generate intelligent recipe recommendations. Ingridients are kept within a ToDoist project

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your API keys:

   - Copy `.env.example` to `.env`
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Replace `your_todoist_api_token_here` with your Todoist API token:
     - Login to Todoist web app
     - Go to Settings (gear icon) > Integrations > Developer
     - Copy your API token
   - Replace `your_todoist_project_id_here` with your actual Project ID
   - Add your ingredients as tasks in this project

4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
