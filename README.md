# Trivia Quiz
This project was created as a personal endeavour to enhance my front-end development skills. Through this side project, I focused on applying key concepts and technologies such as API, React and Firebase, while working towards building a functional and visually appealing quiz web app.

By developing this project, I aimed to strengthen my understanding of state management and API integration, as well as become more familiar with Firebase as a database solution, improving my skills in backend integration and real-time data management.

## Setting up
A Firebase account is required to upload players' scores to Firestore database.
Create a .env file containing the following details: 
- `VITE_FIREBASE_API_KEY`, 
- `VITE_FIREBASE_AUTH_DOMAIN`, 
- `VITE_FIREBASE_PROJECT_ID`, 
- `VITE_FIREBASE_STORAGE_BUCKET`, 
- `VITE_FIREBASE_MESSAGING_SENDER_ID`, 
- `VITE_FIREBASE_APP_ID`, 
- `VITE_FIREBASE_EMAIL`, 
- `VITE_FIREBASE_PASSWORD`. 
Most of these information can be found in the project settings when you initialise a new project on Firebase.
Run `npm run dev` to launch the quiz web app.