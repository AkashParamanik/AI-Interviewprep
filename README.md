﻿# Interview Prep App - Frontend

This is the frontend for the Interview Prep App, built with React and Tailwind CSS. It provides a modern UI for users to register, log in, create interview sessions, practice AI-generated Q&A, and track their progress.

## Features

- **Authentication:** Register, login, and logout with JWT support.
- **Profile Management:** Upload and display profile images.
- **Session Management:** Create, view, and delete interview prep sessions.
- **AI-Powered Q&A:** Get role-specific interview questions and answers using Gemini AI.
- **Question Management:** Pin/unpin questions, add notes, and load more questions.
- **Progress Tracking:** View all sessions and track last updated dates.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Loaders & Feedback:** Skeleton and spinner loaders for smooth UX.

## Folder Structure

```
frontend/
  public/
  src/
    assets/
    components/
      Cards/
      Inputs/
      Layouts/
      Loaders/
      Modal.jsx
      Drawer.jsx
      DeleteAlertContent.jsx
    context/
    pages/
      Auth/
      Home/
      InterviewPrep/
    utils/
      apiPaths.js
      axiosInstance.js
      data.js
      helper.js
      uploadImage.js
    App.js
    index.js
  package.json
  tailwind.config.js
```

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment variables:**

   - If needed, set API base URL in `src/utils/apiPaths.js`.

3. **Run the app:**
   ```sh
   npm start
   ```
   The app will start on [http://localhost:3000](http://localhost:3000).

## Key Pages & Components

- **LandingPage:** App introduction and features.
- **Auth/Login & Auth/Signup:** User authentication.
- **Home/Dashboard:** View and manage interview sessions.
- **Home/CreateSessionForm:** Start a new interview session.
- **InterviewPrep:** Practice Q&A, pin questions, and get AI explanations.
- **AIResponseView:** Renders markdown and code blocks from AI answers.
- **ProfileInfoCard:** User profile display and logout.

## Technologies Used

- React
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Moment.js
- Framer Motion
- Gemini AI (via backend API)

## License

MIT

---


# Interview Prep App - Backend

This is the backend for the Interview Prep App, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, session management, interview question generation (using Gemini AI), and image uploads.

## Features

- **User Authentication:** Register, login, and profile retrieval with JWT.
- **Session Management:** Create, view, and delete interview prep sessions.
- **AI-Powered Q&A:** Generate role-specific interview questions and answers using Gemini AI.
- **Question Management:** Pin/unpin questions, add notes, and add more questions to sessions.
- **Image Uploads:** Upload and serve user profile images.
- **Protected Routes:** All sensitive endpoints require JWT authentication.

## Folder Structure

```
backend/
  .env
  package.json
  server.js
  config/
    db.js
  controller/
    aiController.js
    authController.js
    questionController.js
    sessionController.js
  middlewares/
    authMiddleware.js
    uploadMiddleware.js
  models/
    Question.js
    Session.js
    User.js
  routes/
    authRoutes.js
    questionRoutes.js
    sessionRoutes.js
  uploads/
    ...
  utils/
    prompts.js
```

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env` and set your values for:
     - `PORT`
     - `JWT_SECRET`
     - `MONGO_URI`
     - `GEMINI_API_KEY`

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on the port specified in `.env` (default: 8000).

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/auth/profile` — Get user profile (JWT required)
- `POST /api/auth/upload-image` — Upload profile image

### Sessions

- `POST /api/sessions/create` — Create a new session (JWT required)
- `GET /api/sessions/my-sessions` — Get all sessions for logged-in user
- `GET /api/sessions/:id` — Get session details by ID
- `DELETE /api/sessions/:id` — Delete a session

### Questions

- `POST /api/questions/add` — Add questions to a session
- `POST /api/questions/:id/pin` — Pin/unpin a question
- `POST /api/questions/:id/note` — Add/update note for a question

### AI

- `POST /api/ai/generate-questions` — Generate interview questions (JWT required)
- `POST /api/ai/generate-explanations` — Generate explanation for a question (JWT required)

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- JWT for authentication
- Gemini AI API (`@google/genai`)
- Multer for image uploads

## License

MIT

---
> 🔗 **Live demo:** [Interview Prep App](https://ai-interviewprep-s2ka.onrender.com)

