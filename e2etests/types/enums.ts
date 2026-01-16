export enum EStorageStatePath {
  defaultUser = ".cache/userStoredSession-default-user.json",
  liveDemoUser = ".cache/userStoredSession-live-demo-user.json",
  tempUser = ".cache/userStoredSession-temp-user.json"
}

export enum EUserRole {
  defaultUser = "default-user",
  demoUser = "demo-user",
  tempUser = "temp-user"
}

export enum EAWSAccountType {
  management,
  member,
  standalone
}

export enum EEnvironment {
  TEST = "TEST",
  STAGING = "STAGING",
  DEV = "DEV"
}

export enum EOpsDefaultAccountID {
  TEST = "FACC-9699-3729",
  STAGING = "FACC-6926-3193",
  DEV = "FACC-8847-9550"}

export enum EOpsDefaultOrgId {
  TEST = "FORG-1317-5652-8045",
  STAGING = "FORG-8871-8197-8043",
  DEV = "FORG-4801-6958-2949"
}

export enum EParentPoolId {
  DEV = "ccaceadf-6878-4ab4-9fd8-3f6177d0b9d3",
  STAGING = "624abd3c-0d70-4859-964a-e14aafb96c7b",
  TEST = "f648bd92-b53e-4fa7-aebb-cb02bcbf160d"
}