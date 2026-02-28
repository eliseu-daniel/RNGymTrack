import AsyncStorage from "@react-native-async-storage/async-storage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type QueryParams = Record<string, string | number | boolean | undefined | null>;

export type Patient = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  birth_date?: string | null;
  gender?: string | null;
  allergies?: string | null;
  is_active?: number | boolean;
};

export type LoginPatientResponse = {
  status: boolean;
  token: string;
  patient: Patient;
};

class HttpService {
  private baseURL = "http://192.168.15.2:8000/api";
  private token: string | null = null;

  private tokenKey = "patient:bearer_token";

  private patientKey = "patient:data";
  private patient: Patient | null = null;

  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.loadSession();
  }

  async ready() {
    await this.initPromise;
  }

  setBaseURL(url: string) {
    this.baseURL = url.replace(/\/+$/g, "");
  }

  getToken() {
    return this.token;
  }

  getPatient() {
    return this.patient;
  }

  private async loadSession() {
    const [savedToken, savedPatient] = await Promise.all([
      AsyncStorage.getItem(this.tokenKey),
      AsyncStorage.getItem(this.patientKey),
    ]);

    if (savedToken) this.token = savedToken;
    if (savedPatient) {
      try {
        this.patient = JSON.parse(savedPatient) as Patient;
      } catch {
        this.patient = null;
      }
    }
  }

  private async saveSession(token: string, patient: Patient) {
    this.token = token;
    this.patient = patient;

    await Promise.all([
      AsyncStorage.setItem(this.tokenKey, token),
      AsyncStorage.setItem(this.patientKey, JSON.stringify(patient)),
    ]);
  }

  private async clearSession() {
    this.token = null;
    this.patient = null;

    await Promise.all([
      AsyncStorage.removeItem(this.tokenKey),
      AsyncStorage.removeItem(this.patientKey),
    ]);
  }

  private buildURL(path: string, params?: QueryParams) {
    let url = this.baseURL + (path.startsWith("/") ? path : `/${path}`);

    if (params) {
      const filtered: Record<string, string> = {};
      for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null) continue;
        filtered[k] = String(v);
      }
      const q = new URLSearchParams(filtered).toString();
      if (q) url += (url.includes("?") ? "&" : "?") + q;
    }
    return url;
  }

  private buildHeaders(extra?: Record<string, string>) {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    return { ...headers, ...(extra || {}) };
  }

  async request<T = any>(
    path: string,
    method: HttpMethod = "GET",
    opts?: { body?: any; params?: QueryParams; headers?: Record<string, string>; isFormData?: boolean }
  ): Promise<T> {
    await this.ready();

    const url = this.buildURL(path, opts?.params);

    const init: RequestInit = {
      method,
      headers: this.buildHeaders(opts?.headers),
    };

    if (opts?.body !== undefined) {
      if (opts.isFormData || opts.body instanceof FormData) {
        init.body = opts.body;
      } else {
        (init.headers as Record<string, string>)["Content-Type"] = "application/json";
        init.body = JSON.stringify(opts.body);
      }
    }

    const res = await fetch(url, init);
    const contentType = res.headers.get("content-type") || "";

    const parse = async () => {
      if (contentType.includes("application/json")) return await res.json();
      return await res.text();
    };

    if (!res.ok) {
      const errorBody = await parse().catch(() => null);
      const err: any = new Error(`HTTP ${res.status}: ${res.statusText}`);
      err.status = res.status;
      err.body = errorBody;
      err.url = url;
      throw err;
    }

    return (await parse()) as T;
  }

  async loginPatient(email: string) {
    const resp = await this.request<LoginPatientResponse>("/loginPatient", "POST", {
      body: { email },
    });

    if (!resp.status || !resp.token) {
      const err: any = new Error("Falha no login do paciente");
      err.body = resp;
      throw err;
    }

    await this.saveSession(resp.token, resp.patient);

    return resp;
  }

  async logoutPatient() {
    try {
      await this.request("/patients/logout", "POST");
    } finally {
      await this.clearSession();
    }
  }
}

const http = new HttpService();
export default http;
export { http };