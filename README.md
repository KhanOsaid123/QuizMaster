# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Quiz Application

A dynamic quiz application built with React and Tailwind CSS that features multiple question types, timer functionality, and a persistent leaderboard.

## Features

- **Welcome Screen**:
  - User name input
  - Leaderboard displaying top scores
  - Start quiz button

- **Quiz Interface**:
  - Support for multiple-choice and integer input questions
  - 30-second timer for each question
  - Real-time feedback on answers
  - Explanation feature for incorrect answers
  - Progress tracking

- **Question Types**:
  - Multiple Choice Questions (MCQ)
  - Integer input questions
  - Detailed explanations for each question

- **Scoring System**:
  - Real-time score tracking
  - Score persistence using IndexedDB
  - Leaderboard showing top 10 scores

- **User Interface**:
  - Clean and responsive design using Tailwind CSS
  - Interactive components with visual feedback
  - Progress indicator
  - Timer visualization

## Technologies Used

- React.js
- Tailwind CSS
- IndexedDB for local storage
- Vite for build tooling

## Running Locally

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Deployment

The application is deployed and can be accessed at:
[Your Deployment URL]

## Project Structure

```
quiz-app/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx
│   │   ├── QuizScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   └── Leaderboard.jsx
│   ├── utils/
│   │   └── indexedDB.js
│   ├── data/
│   │   └── questions.json
│   └── App.jsx
├── index.html
└── package.json
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License
