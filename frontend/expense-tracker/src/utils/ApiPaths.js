// Centralized API endpoint paths for the backend
export const BASE_URL ="http://localhost:8000"
const ApiPaths = {
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    GET_USER_INFO: '/api/v1/auth/getUser'
  },
  INCOME: {
    ADD_INCOME: '/api/v1/income/add',
    GET_ALL_INCOME: '/api/v1/income/get',
    DELETE_INCOME: (id) => `/api/v1/income/${id}`,
    DOWNLOAD_INCOME: '/api/v1/income/downloadexcel',
  },
  EXPENSE: {
    ADD_EXPENSE: '/api/v1/expense/add',
    GET_ALL_EXPENSE: '/api/v1/expense/get',
    DELETE_EXPENSE: (id) => `/api/v1/expense/${id}`,
    DOWNLOAD_EXPENSE: '/api/v1/expense/downloadexcel',
  },
  DASHBOARD: {
    GET_DATA: '/api/v1/dashboard', // GET
  },
  IMAGE:{
  UPLOADS_IMAGE:`/api/v1/auth/upload`
}
}

export default ApiPaths;
