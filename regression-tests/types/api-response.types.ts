export interface LiveDemoAuthResponse {
  organization_id: string;
  email: string;
  password: string;
  created_at: number;
}

export interface DemoAuthCredentials extends LiveDemoAuthResponse {
  baseApiUrl: string;
}
