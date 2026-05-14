import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
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

export const registerUser = async (email, password) => {

  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

export const resetPassword = async (
  email
) => {

  return await sendPasswordResetEmail(
    auth,
    email
  );
};