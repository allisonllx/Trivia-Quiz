import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase.config"

// const auth = getAuth(app);
// const db = getFirestore(app);

let isAuthenticated = false;

// Function to handle sign-in
async function authenticate() {
  if (!isAuthenticated) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        import.meta.env.VITE_FIREBASE_EMAIL,
        import.meta.env.VITE_FIREBASE_PASSWORD
      );
      console.log("Logged in successfully:", userCredential.user);
      isAuthenticated = true; // Mark as authenticated
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Prevent further operations if authentication fails
    }
  }
}

// Fetch scores after ensuring authentication
export async function fetchScore() {
  try {
    await authenticate(); // Ensure sign-in is complete
    const querySnapshot = await getDocs(collection(db, "scores"));
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log("Retrieved data:", data);
    return data;
  } catch (error) {
    console.error("Error retrieving player scores:", error);
  }
}

// Save a score after ensuring authentication
export async function saveScore(player, score) {
  try {
    await authenticate(); // Ensure sign-in is complete
    const docRef = await addDoc(collection(db, "scores"), { player, score });
    console.log("Score uploaded with ID:", docRef.id);
  } catch (error) {
    console.error("Error uploading score:", error);
  }
}
