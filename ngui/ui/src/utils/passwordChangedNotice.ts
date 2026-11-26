// Session storage, not the URL: the sign-out's redirect folds any extra query parameter into `next`.
const PASSWORD_CHANGED_STORAGE_KEY = "passwordChanged";

/** Asks the login page to say the password was changed, once. */
export const rememberPasswordChanged = () => sessionStorage.setItem(PASSWORD_CHANGED_STORAGE_KEY, "true");

export const isPasswordChangedNoticePending = () => sessionStorage.getItem(PASSWORD_CHANGED_STORAGE_KEY) === "true";

export const clearPasswordChangedNotice = () => sessionStorage.removeItem(PASSWORD_CHANGED_STORAGE_KEY);
