export const formatCurrency = (
  value: number | string,
  currency: string,
  noCents: boolean = false
): string => {
  if (value === null || value === undefined || typeof value === "string") {
    return "";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: noCents ? 0 : 2,
  });

  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return formatter.format(value);
};

const addThousandSeparator = (value: string) => {
  const [integerPart, decimalPart] = value.split(".");

  const formattedIntegerPart = integerPart!.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return `${formattedIntegerPart}.${decimalPart}`;
};

export const currencyMask = (setter: (value: string) => void) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");

    let valueWithCurrency = "";

    if (!value) {
      valueWithCurrency = "$0.00";
    } else {
      value = (parseInt(value) / 100).toFixed(2);
      valueWithCurrency = `$${addThousandSeparator(value)}`;
    }

    setter(valueWithCurrency);
  };

  return handleChange;
};

export const formatNumber = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US");

  return formatter.format(parseFloat(value.toFixed(2)));
};
