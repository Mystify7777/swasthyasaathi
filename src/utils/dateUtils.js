export const getVaccinationStatus = (
  vaccinationDate
) => {

  if (!vaccinationDate) {
    return "No Date";
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const vaccineDate = new Date(
    vaccinationDate
  );

  vaccineDate.setHours(0, 0, 0, 0);

  if (
    vaccineDate.getTime() ===
    today.getTime()
  ) {
    return "Due Today";
  }

  if (vaccineDate < today) {
    return "Overdue";
  }

  return "Upcoming";
};
