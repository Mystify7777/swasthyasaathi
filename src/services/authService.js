import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { auth } from "./firebase";

export const loginUser = async (email, password) => {

  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};