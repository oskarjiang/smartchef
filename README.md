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

## How It Works

1. The app fetches ingredients from your Todoist "Matinventarie" project (or uses local ingredients as a fallback)
2. Click the "Get Recipe Recommendations" button
3. The app will send your ingredients to OpenAI's API
4. AI will generate recipe recommendations based on your ingredients
5. View the recommended dishes with descriptions and ingredient lists

### Todoist Integration

To use the Todoist integration:

1. Make sure you have a Todoist account and have created a project called "Matinventarie"
2. Add your ingredients as tasks in this project
3. Get your API token from Todoist Settings > Integrations > API token
4. Add it to your `.env` file as `REACT_APP_TODOIST_API_KEY`
5. Start the app and toggle the switch to use Todoist instead of local ingredients
