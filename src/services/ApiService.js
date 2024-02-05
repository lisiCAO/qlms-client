const API_BASE_URL = "https://qlms-server.azurewebsites.net";

const ApiService = {
  /* Auth */
  async login(credentials) {
    const response = await fetchWithConfig(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    return data;
  },

  async fetchCurrentUser() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/users/userinfo`);
    return handleResponse(response);
  },

  async logout() {
    const response = await fetchWithConfig(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
    const data = await handleResponse(response);
    return data;
  },

  async register(userData) {
    const response = await fetchWithConfig(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    return data;
  },

  async forgotPassword(email) {
    const response = await fetchWithConfig(`${API_BASE_URL}/auth/resetpassword`, {
      method: "POST",
      body: JSON.stringify(email),
    });
    return response.json();
  },

  /* Properties */
  async fetchProperties() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/properties`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  async fetchPropertiesAvailable() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/properties/available`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  async fetchPropertiesTenant() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/properties/tenantinfo`, {
      method: "GET",
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  },

  async createProperty(formData) {
    const response = await fetch(`${API_BASE_URL}/api/properties`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  },

  async fetchLeaseByTenant() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/leases/tenant`, {
      method: "GET",
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  },

  /* Profiles */
  async fetchProfile() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/users/userinfo`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  async updateProfile(userId, profile) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(profile),
    });
    const data = await handleResponse(response);
    return data;
  },

  /* Users */

  async fetchUser(userId) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/users/${userId}`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  async updateUser(userId, user) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
    const data = await handleResponse(response);
    return data;
  },

  /* Tenants */
  async fetchTenants() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/properties/userinfo`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  /* Leases */
  async createLease(lease) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/leases`, {
      method: 'POST',
      body: JSON.stringify(lease),
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  },

  async fetchLeases() {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/leases/landlord`, {
      method: "GET"
    });
    const data = await handleResponse(response);
    return data;
  },

  async updateLease(leaseId, lease) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/leases/${leaseId}`, {
      method: "PUT",
      body: JSON.stringify(lease),
    });
    const data = await handleResponse(response);
    return data;
  },

  async deleteLease(leaseId) {
    const response = await fetchWithConfig(`${API_BASE_URL}/api/leases/${leaseId}`, {
      method: "DELETE",
    });
    const message = await response.json().message;
    return message;
  },

  /* Upload Image */
  async uploadImage(formData) {
    const response = await fetch(`${API_BASE_URL}/api/users/uploadimage`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  },

  // Other APIs

};

// Default Option
const fetchWithConfig = (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return fetch(url, { ...defaultOptions, ...options });
};

const handleResponse = async (response) => {
  if (!response.ok && (response.status === 401 || response.status === 403)) {
    ApiService.logout().finally(() => {
      window.location.href = "/auth";
    });
  }
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "An error occurred");
    }
  } else {
    const text = await response.text();
    throw new Error(`Non-JSON response: ${text}`);
  }
};

export default ApiService;