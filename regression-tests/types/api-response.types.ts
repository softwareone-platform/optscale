/** Demo-account credentials minted by `DemoAccountService` + the API URL they were minted against. */
export interface DemoAccountCredentials {
  organization_id: string;
  email: string;
  password: string;
  created_at: number;
  baseApiUrl: string;
}
