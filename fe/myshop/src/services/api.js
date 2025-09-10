const BASE_URL = "http://localhost:5000";

// Helper chung cho CRUD
const request = async (url, method = "GET", data = null) => {
  try {
    const options = { method, headers: { "Content-Type": "application/json" } };
    if (data) options.body = JSON.stringify(data);
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};

// ================= User =================
export const UserApi = {
  getAll: () => request(`${BASE_URL}/users/all`),
  create: (data) => request(`${BASE_URL}/users`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/users/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/users/${id}`, "DELETE"),
};

// ================= Watch =================
export const WatchApi = {
  getAll: () => request(`${BASE_URL}/watches/all`),
  create: (data) => request(`${BASE_URL}/watches`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/watches/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/watches/${id}`, "DELETE"),
};

// ================= Order =================
export const OrderApi = {
  getAll: () => request(`${BASE_URL}/orders/all`),
  create: (data) => request(`${BASE_URL}/orders`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/orders/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/orders/${id}`, "DELETE"),
};

// ================= Order Detail =================
export const OrderDetailApi = {
  getAll: () => request(`${BASE_URL}/order-details/all`),
  create: (data) => request(`${BASE_URL}/order-details`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/order-details/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/order-details/${id}`, "DELETE"),
};

// ================= Transaction =================
export const TransactionApi = {
  getAll: () => request(`${BASE_URL}/transactions/all`),
  create: (data) => request(`${BASE_URL}/transactions`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/transactions/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/transactions/${id}`, "DELETE"),
};

// ================= Feedback =================
export const FeedbackApi = {
  getAll: () => request(`${BASE_URL}/feedbacks/all`),
  create: (data) => request(`${BASE_URL}/feedbacks`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/feedbacks/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/feedbacks/${id}`, "DELETE"),
};

// ================= Appraisal =================
export const AppraisalApi = {
  getAll: () => request(`${BASE_URL}/appraisals/all`),
  create: (data) => request(`${BASE_URL}/appraisals`, "POST", data),
  update: (id, data) => request(`${BASE_URL}/appraisals/${id}`, "PUT", data),
  delete: (id) => request(`${BASE_URL}/appraisals/${id}`, "DELETE"),
};

