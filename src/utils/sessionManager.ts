export const setIsPersistent = (value: boolean) => {
  localStorage.setItem("isPersistent", JSON.stringify(value));
};

export const getIsPersistent = () => {
  return JSON.parse(localStorage.getItem("isPersistent") || "false");
};
