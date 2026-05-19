import { PropertiesQueryParams, PropertiesRestResponse } from "@/types/property";

const BASE_URL = 'https://api.staging.mo-estate.com/api'

class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(`API Error: ${statusText}`);
    this.name = 'ApiError';
  }
}

async function apiFetch<T> (path: string, init: RequestInit = {}): Promise<T> {
  const _path = path.startsWith('/') ? path : `/${path}`;
  const response = await fetch(`${BASE_URL}${_path}`, {
    headers: { 'Content-Type': 'application/json', ...init.headers },
    ...init,
  })
  if (!response.ok) throw new ApiError(response.status, response.statusText)
  
  return response.json() as Promise<T>
}

function fetchProperties (params: PropertiesQueryParams = {}) {
  // const query = new URLSearchParams()
  // if (params.page) query.append('page', params.page.toString())
  // if (params.pageSize) query.append('pageSize', params.pageSize.toString())
  return apiFetch<PropertiesRestResponse>(`/properties`)
}

export {
  fetchProperties,
  ApiError
}