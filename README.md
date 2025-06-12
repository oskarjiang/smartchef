# Smart Chef Application

Smart Chef is a React application that recommends recipes based on the ingredients you have. It uses OpenAI's API to generate intelligent recipe recommendations.

## Features

- Select ingredients from a categorized list
- Search for specific ingredients
- Get AI-powered recipe recommendations
- View detailed recipe information

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
   - Create a project named "Matinventarie" in your Todoist account
   - Add your ingredients as tasks in this project
   - Set `REACT_APP_USE_TEST_DATA=true` if you want to use test data instead of calling OpenAI

4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
