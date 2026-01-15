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