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
    //   private baseURL = "http://127.0.0.1:8000/api"; // para usar no emulador Android
    private baseURL = "http://192.168.18.55:8000/api"; // para usar no dispositivo físico (substitua SEU_IP pelo IP da sua máquina na rede local)
    private token: string | null = null;
    private tokenKey = "patient:bearer_token";

    private initPromise: Promise<void>;

    constructor() {
        this.initPromise = this.loadToken();
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

    private async loadToken() {
        const saved = await AsyncStorage.getItem(this.tokenKey);
        if (saved) this.token = saved;
    }

    private async saveToken(token: string) {
        this.token = token;
        await AsyncStorage.setItem(this.tokenKey, token);
    }

    private async clearToken() {
        this.token = null;
        await AsyncStorage.removeItem(this.tokenKey);
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

    private async request<T = any>(
        path: string,
        method: HttpMethod = "GET",
        opts?: {
            body?: any;
            params?: QueryParams;
            headers?: Record<string, string>;
            isFormData?: boolean;
        }
    ): Promise<T> {
        await this.ready();

        const url = this.buildURL(path, opts?.params);

        const init: RequestInit = {
            method,
            headers: this.buildHeaders(opts?.headers),
        };

        if (opts?.body !== undefined) {
            if (opts.isFormData || opts.body instanceof FormData) {
                init.body = opts.body; // não setar Content-Type para FormData
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

    raw<T = any>(
        path: string,
        method: HttpMethod = "GET",
        opts?: {
            body?: any;
            params?: QueryParams;
            headers?: Record<string, string>;
            isFormData?: boolean;
        }
    ) {
        return this.request<T>(path, method, opts);
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

        await this.saveToken(resp.token);
        return resp; // { status, token, patient }
    }

    async logoutPatient() {
        try {
            await this.request("/patients/logout", "POST");
        } finally {
            await this.clearToken();
        }
    }
}

const http = new HttpService();
export default http;
export { http };
