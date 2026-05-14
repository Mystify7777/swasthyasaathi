import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

const patientsRef = collection(db, "patients");

export const addPatient = async (patientData) => {

  const response = await addDoc(
    patientsRef,
    patientData
  );

  return response;
};

export const getPatients = async (
  userId
) => {

  const q = query(
    patientsRef,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deletePatient = async (id) => {

  await deleteDoc(doc(db, "patients", id));
};

export const updatePatient = async (id, updatedData) => {

  await updateDoc(
    doc(db, "patients", id),
    updatedData
  );
};