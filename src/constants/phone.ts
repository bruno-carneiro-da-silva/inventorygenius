export const formatPhoneNumber = (phoneNumber: string): string => {
  // Check if the phone number starts with '+' and has 11 digits
  if (!phoneNumber.startsWith("+")) {
    throw new Error("Invalid phone number format");
  }

  // Extract country code and the rest of the phone number
  const countryCode = phoneNumber.slice(0, 2); // +1
  const areaCode = phoneNumber.slice(2, 5); // 234
  const centralOfficeCode = phoneNumber.slice(5, 8); // 567
  const lineNumber = phoneNumber.slice(8); // 890

  // Return the formatted phone number
  return `${countryCode} (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
