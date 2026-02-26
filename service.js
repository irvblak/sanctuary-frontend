/* Sanctuary Club — Service Access (public) */

const ServiceConfig = {
  BACKEND_URL: "https://sanctuary-backend-8iqc.onrender.com"
};

const ServiceAuth = {
  storageKey: "sc_service_session",

  getSession(){
    try{
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    }catch{
      return null;
    }
  },

  setSession(session){
    localStorage.setItem(this.storageKey, JSON.stringify(session));
  },

  logout(){
    localStorage.removeItem(this.storageKey);
  },

  async login(entity_id, pin){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/auth/service-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ entity_id, pin }),
      mode: "cors"
    });

    const text = await res.text();
    let data = null;
    try{ data = text ? JSON.parse(text) : null; } catch {}

    if (!res.ok){
      const msg = (data && (data.message || data.error)) ? (data.message || data.error) : `Login failed (${res.status})`;
      throw new Error(msg);
    }

    if (!data || !data.token || !data.entity_id){
      throw new Error("Login failed (bad response).");
    }

    this.setSession(data);
  }
};

const ServiceApi = {
  _headers(){
    const sess = ServiceAuth.getSession();
    if (!sess || !sess.token) throw new Error("Not signed in.");
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sess.token}`
    };
  },

  async listMyItems(){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/api/service-items`, {
      method: "GET",
      headers: this._headers(),
      mode: "cors"
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || `Error ${res.status}`);
    return data.items || [];
  },

  async getItem(id){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/api/service-items/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: this._headers(),
      mode: "cors"
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || `Error ${res.status}`);
    return data.item;
  },

  async createItem(payload){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/api/service-items`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify(payload),
      mode: "cors"
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || `Error ${res.status}`);
    return data.item;
  },

  async updateItem(id, payload){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/api/service-items/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: this._headers(),
      body: JSON.stringify(payload),
      mode: "cors"
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || `Error ${res.status}`);
    return data.item;
  },

  async deleteItem(id){
    const res = await fetch(`${ServiceConfig.BACKEND_URL}/api/service-items/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: this._headers(),
      mode: "cors"
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || `Error ${res.status}`);
    return true;
  }
};
