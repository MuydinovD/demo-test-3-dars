import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

export function useRegister() {
  const registerWithEmailAndPassword = (displayName, email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (profile) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        console.log(profile);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { registerWithEmailAndPassword };
}
