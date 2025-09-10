const environments = {
  baseUrl: process.env.VITE_API_URL,
  APP_TITLE: process.env.VITE_APP_TITLE,
  APP_URL: process.env.VITE_APP_URL,
  API_URL: process.env.VITE_API_URL,
  API_PUBLIC_URL: process.env.VITE_PUBLIC_API_URL,
  cookies: process.env.VITE_COOKIES_USER_TOKEN,
};

// DEV-only debug logging
if (import.meta.env.MODE !== "production") {
  // Debug logging removed for production
}

export default environments;
