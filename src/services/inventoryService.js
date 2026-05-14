import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const medicinesRef = collection(db, "medicines");

export const addMedicine = async (medicineData) => {

  return await addDoc(
    medicinesRef,
    medicineData
  );
};

export const getMedicines = async () => {

  const snapshot = await getDocs(medicinesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteMedicine = async (id) => {

  await deleteDoc(
    doc(db, "medicines", id)
  );
};

export const updateMedicine = async (
  id,
  updatedData
) => {

  await updateDoc(
    doc(db, "medicines", id),
    updatedData
  );
};
