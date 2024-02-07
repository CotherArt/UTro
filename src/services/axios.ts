import axios, { type AxiosInstance } from 'axios'

export interface ErrorResponseData {
  detail?: string
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COONAPI_URL
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the access token from local storage and update the Authorization header
    const accessToken = localStorage.getItem('access_token')

    // Ensure the Authorization header is present and not overridden by another interceptor
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response status is 401 (unauthorized), you may want to handle it based on your authentication flow
    // You might want to redirect to the login page or refresh the token if needed

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
