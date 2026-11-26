type HttpMethod = "GET" | "PUT" | "DELETE" | "POST";

export type RequestOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: HttpMethod;
  signal?: AbortSignal;
  query?: Record<string, string | number>;
};

export class HttpError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`Erro na API ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<T>(path: string, options?: Omit<RequestOptions, "body" | "method">) {
    return this.makeRequest<T>(path, {
      method: "GET",
      headers: options?.headers,
      signal: options?.signal,
      query: options?.query,
    });
  }

  private async makeRequest<T>(
    path: string,
    options?: RequestOptions,
  ): Promise<T> {
    const headers = new Headers({});

    if (options?.body) {
      headers.append("Content-type", "application/json");
    }

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const url = new URL(path, this.baseUrl);

    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    const response = await fetch(url, {
      method: options?.method ?? "GET",
      body: JSON.stringify(options?.body),
      headers,
      signal: options?.signal,
    });

    const contentType = response.headers.get("content-type");
    let responseBody: unknown = null;

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody as T;
    }

    throw new HttpError(response.status, responseBody);
  }
}

export default HttpClient;
