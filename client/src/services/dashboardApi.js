import axios from "axios"; // Imports Axios, a tool used to send web network requests.

const API = axios.create({ // Creates a customized instance of Axios.
  baseURL: import.meta.env.VITE_API_URL, // Pulls your backend's main web link from environment variables.
  withCredentials: true, // Crucial for security; tells Axios to securely carry cookies/session logs.
});

export const getDashboard = async () => { // An exported function the app can invoke to request dashboard records.
  const { data } = await API.get("/dashboard"); // Sends a network GET request to "http://yourbackendurl/dashboard" and extracts data.
  return data; // Returns that server response package.
};