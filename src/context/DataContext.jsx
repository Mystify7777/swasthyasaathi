import {

  useEffect,
  useState,

} from "react";

import { useAuth } from "./AuthContext";
import DataContext from "./dataContext";

import {
  getPatients,
} from "../services/patientService";

import {
  getMedicines,
} from "../services/inventoryService";
export const DataProvider = ({
  children,
}) => {

  const { user } = useAuth();

  const [patients, setPatients] =
    useState([]);

  const [medicines, setMedicines] =
    useState([]);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastSynced, setLastSynced] =
    useState(null);

  const [errors, setErrors] =
    useState({
      patients: null,
      medicines: null,
    });

  const refreshPatients =
    async () => {

      if (!user) return;

      try {

        const data =
          await getPatients(user.uid);

        setPatients(data);
        setLastSynced(new Date());
        setErrors((prev) => ({
          ...prev,
          patients: null,
        }));

      } catch (error) {

        setErrors((prev) => ({
          ...prev,
          patients:
            "Unable to sync patient data. Showing cached data if available.",
        }));

        console.error(error);
      }
    };

  const refreshMedicines =
    async () => {

      if (!user) return;

      try {

        const data =
          await getMedicines(user.uid);

        setMedicines(data);
        setLastSynced(new Date());
        setErrors((prev) => ({
          ...prev,
          medicines: null,
        }));

      } catch (error) {

        setErrors((prev) => ({
          ...prev,
          medicines:
            "Unable to sync medicine data. Showing cached data if available.",
        }));

        console.error(error);
      }
    };

  const refreshAll = async () => {

    if (!user) return;

    try {

      setInitialLoading(true);
      setRefreshing(true);

      await Promise.all([
        refreshPatients(),
        refreshMedicines(),
      ]);

      setLastSynced(new Date());

    } finally {

      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {

      if (user) {

        setInitialLoading(false);

      } else {

        setPatients([]);

        setMedicines([]);

        setErrors({
          patients: null,
          medicines: null,
        });

        setInitialLoading(false);
      }

    }, 0);

    return () => clearTimeout(timeoutId);

  }, [user]);

  return (

    <DataContext.Provider
      value={{

        patients,
        medicines,

          loading: initialLoading,

        refreshPatients,
        refreshMedicines,
        refreshAll,
        refreshing,
        lastSynced,
        errors,

      }}
    >

      {children}

    </DataContext.Provider>
  );
};
