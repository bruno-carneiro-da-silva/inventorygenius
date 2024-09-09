export const getIsPersistent = () => {
  const isPersistent = localStorage.getItem("isPersistent");
  if (isPersistent === null || isPersistent === undefined) {
    return false;
  }
  try {
    return JSON.parse(isPersistent);
  } catch (e) {
    console.error("Erro ao analisar isPersistent:", e);
    return false;
  }
};

export const setIsPersistent = (isPersistent: boolean | undefined) => {
  if (isPersistent !== undefined) {
    localStorage.setItem("isPersistent", JSON.stringify(isPersistent));
  }
};
