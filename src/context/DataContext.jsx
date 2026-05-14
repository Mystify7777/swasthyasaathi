import {

  createContext,
  useContext,
  useEffect,
  useState,

} from "react";

import { useAuth } from "./AuthContext";

import {
  getPatients,
} from "../services/patientService";

import {
  getMedicines,
} from "../services/inventoryService";

import AppLoader from "../components/common/AppLoader";

const DataContext = createContext();

export const DataProvider = ({
  children,
}) => {

  const { user } = useAuth();

  const [patients, setPatients] =
    useState([]);

  const [medicines, setMedicines] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const refreshPatients =
    async () => {

      if (!user) return;

      try {

        const data =
          await getPatients(user.uid);

        setPatients(data);

      } catch (error) {

        console.error(
          "Failed to load patients",
          error
        );
      }
    };

  const refreshMedicines =
    async () => {

      if (!user) return;

      try {

        const data =
          await getMedicines(user.uid);

        setMedicines(data);

      } catch (error) {

        console.error(
          "Failed to load medicines",
          error
        );
      }
    };

  const refreshAll = async () => {

    if (!user) return;

    try {

      setLoading(true);

      await Promise.all([
        refreshPatients(),
        refreshMedicines(),
      ]);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (user) {

      refreshAll();

    } else {

      setPatients([]);

      setMedicines([]);

      setLoading(false);
    }

  }, [user]);

  if (loading) {
    return <AppLoader />;
  }

  return (

    <DataContext.Provider
      value={{

        patients,
        medicines,

        loading,

        refreshPatients,
        refreshMedicines,
        refreshAll,

      }}
    >

      {children}

    </DataContext.Provider>
  );
};

export const useData = () =>
  useContext(DataContext);
