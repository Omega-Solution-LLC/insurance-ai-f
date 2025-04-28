import clsx from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function toastHandler(message, status) {
  if (status === "warning") {
    toast.error(message);
  } else if (status === "success") {
    toast.success(message);
  }
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
