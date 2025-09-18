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
    // Get token from storage
    const token = await AsyncStorage.getItem("userToken");
    
    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    // Prepare request options
    const requestOptions = {
      ...options,
      headers,
    };

    // Stringify body if it's an object
    if (requestOptions.body && typeof requestOptions.body === 'object') {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    // Check if response is successful
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = "API Error";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || `HTTP ${response.status}`;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Try to parse JSON response
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (e) {
      console.warn("Response is not JSON:", e);
      return null;
    }
  } catch (err) {
    console.error("❌ API Error:", err);
    
    // Enhance error message for network issues
    if (err.message === "Network request failed") {
      throw new Error("Network error. Please check your internet connection.");
    }
    
    throw err;
  }
};

export default API_BASE_URL;