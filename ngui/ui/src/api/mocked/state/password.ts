import { mockState } from "./mockState";

export const getMockPassword = () => mockState.password;

export const setMockPassword = (password: string) => {
  mockState.password = password;
};
