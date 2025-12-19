// Auto-generated simple API client to reach the backend
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function apiRequest(method, path, data) {
  const url = `${API_BASE}${path}`;
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}

// Known endpoints derived from the project spec
export const endpoints = {
  "/hotels/search?location={location}&checkin={date}&checkout={date}": {
    "method": "GET",
    "path": "/hotels/search?location={location}&checkin={date}&checkout={date}"
  },
  "/hotel/{id}": {
    "method": "GET",
    "path": "/hotel/{id}"
  },
  "/bookings": {
    "method": "POST",
    "path": "/bookings"
  }
};

export function buildUrl(path) {
  return `${API_BASE}${path}`;
}

export async function callEndpoint(name, payload) {
  const ep = endpoints[name];
  if (!ep) {
    throw new Error(`Unknown endpoint: ${name}`);
  }
  return apiRequest(ep.method || 'GET', ep.path || '/', payload);
}

export { apiRequest };
