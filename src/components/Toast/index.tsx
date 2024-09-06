import { toast, Slide } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    className: "toastify-success",
    autoClose: 1500,
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: true,
    transition: Slide,
    theme: "colored",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    className: "toastify-error",
    autoClose: 1500,
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: true,
    transition: Slide,
    theme: "colored",
  });
};
