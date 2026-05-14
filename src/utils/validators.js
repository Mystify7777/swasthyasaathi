export const validatePatient = (data) => {

  if (!data.name.trim()) {
    return "Patient name is required";
  }

  if (data.name.trim().length < 2) {
    return "Name is too short";
  }

  const age = Number(data.age);

  if (isNaN(age)) {
    return "Age must be a number";
  }

  if (age < 0 || age > 120) {
    return "Age must be between 0 and 120";
  }

  if (!/^[a-zA-Z\s]+$/.test(data.village)) {
    return "Village name is invalid";
  }

  if (!/^\d{10}$/.test(data.phone)) {
    return "Phone number must be 10 digits";
  }

  if (data.nextVaccinationDate) {
    // allow past dates (used to classify overdue reminders)
  }

  return null;
};
