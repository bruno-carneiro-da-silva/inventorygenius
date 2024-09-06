import { Libraries } from "@react-google-maps/api";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const TIMEOUT = Number(import.meta.env.VITE_TIMEOUT) || 10000;
export const REACT_GOOGLE_MAPS_API_KEY = import.meta.env
  .VITE_GOOGLE_MAPS_API_KEY;
export const googleMapsLibraries: Libraries = ["places"];
