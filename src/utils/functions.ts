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

export const unmaskPhone = (phone: string) => {
  return phone.replace(/\D/g, "");
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

export const maskCNPJ = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length > 14) {
    return cleaned.slice(0, 14);
  }
  return cleaned
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/\/(\d{4})(\d)/, '/$1-$2')
    .replace(/-/, '');
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

export const getMonthOptions = () => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const currentMonth = new Date().getMonth();
  return months.slice(currentMonth).map((month, index) => ({
    value: (currentMonth + index + 1).toString().padStart(2, "0"),
    label: month,
  }));
};

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => ({
    value: (currentYear + i).toString(),
    label: (currentYear + i).toString(),
  }));
};

export const daysOfWeek = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

// Função para calcular todas as datas do mês atual
export const getDatesOfMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dates = [];

  // Obter o primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  // Obter o último dia do mês
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Obter o dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  // Ajustar para começar na segunda-feira
  const adjustedFirstDayOfWeek = (firstDayOfWeek + 6) % 7;

  // Preencher os dias do mês anterior
  for (let i = 0; i < adjustedFirstDayOfWeek; i++) {
    const date = new Date(firstDayOfMonth);
    date.setDate(firstDayOfMonth.getDate() - adjustedFirstDayOfWeek + i);
    dates.push({ date, isCurrentMonth: false });
  }

  // Preencher as datas do mês atual
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    dates.push({ date: new Date(year, month, day), isCurrentMonth: true });
  }

  // Preencher os dias do próximo mês até completar a última semana
  const totalDays = dates.length;
  const remainingDays = (7 - (totalDays % 7)) % 7; // Calcula os dias restantes para completar a semana
  for (let i = 0; i < remainingDays; i++) {
    const date = new Date(lastDayOfMonth);
    date.setDate(lastDayOfMonth.getDate() + i + 1);
    dates.push({ date, isCurrentMonth: false });
  }

  return dates;
};

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to convert file to base64'));
    };

    reader.readAsDataURL(file);
  });
}