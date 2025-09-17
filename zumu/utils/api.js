// utils/api.js

import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Backend Base URL
const API_BASE_URL = "https://zumu.onrender.com/api";

/**
 * Universal API Caller
 * @param {string} endpoint - API endpoint (e.g. "/matches")
 * @param {object} options - fetch options (method, headers, body)
 * @returns {Promise<any>} - response data
 */
export const api = async (endpoint, options = {}) => {
  try {
    // যদি user token থাকে, সেটা header এ add করা হবে
    const token = await AsyncStorage.getItem("userToken");

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "API Error");
    return data;
  } catch (err) {
    console.error("❌ API Error:", err);
    throw err;
  }
};

export default API_BASE_URL;
