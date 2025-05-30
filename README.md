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

## Available Scripts

In the project directory, you can run:ed with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
