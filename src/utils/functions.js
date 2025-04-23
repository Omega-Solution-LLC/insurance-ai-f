import toast from "react-hot-toast";

export function toastHandler(message, status) {
  if (status === "warning") {
    toast.error(message);
  } else if (status === "success") {
    toast.success(message);
  }
}
