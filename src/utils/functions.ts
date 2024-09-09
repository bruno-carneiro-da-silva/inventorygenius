export const generateTimezoneOptions = () => {
  const options = [];
  for (let i = -12; i <= 14; i++) {
    let label = `GMT${i > 0 ? "+" : ""}${i}`;
    if (i === 0) label = "GMT (GMT+0)";
    options.push({ value: `GMT${i > 0 ? "+" : ""}${i}`, label });
  }
  return options;
};

export const maskPhone = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const maskDate = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{4})(\d)/, "$1/$2")
    .replace(/(\d{4}\/\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4}\/\d{2}\/\d{2})(\d)/, "$1");
};

export const maskDateISO = (value: string) => {
  const datePart = value.split("T")[0];
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
};

export const extractCityAndCountry = (address: string) => {
  const parts = address.split(", ");
  const country = parts.pop();
  let city = parts.pop();

  if (city && /\d/.test(city)) {
    city = parts.pop();
  }

  return { city, country };
};

export const calculateDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const calculateDaysToTargetDate = (date: string) => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 0) {
    return "expirada";
  }

  return daysDifference;
};

export const calculateDaysFromSeconds = (totalSeconds: number): number => {
  return Math.floor(totalSeconds / 86400);
};

export function calculateDurationFromSeconds(totalSeconds: number) {
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
}

export const getFileExtension = (url: string): string => {
  const parts = url.split(".");
  return parts[parts.length - 1];
};
