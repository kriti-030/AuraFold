/**
 * Auth service stub for future backend integration.
 * Does NOT perform real authentication and MUST NOT store passwords.
 */
export const AUTH_STATUS = {
  NOT_CONFIGURED: "NOT_CONFIGURED",
};

export async function loginWithEmail(/* { email, password } */) {
  return {
    ok: false,
    status: AUTH_STATUS.NOT_CONFIGURED,
    message:
      "Sign-in is not connected to a server yet. Connect this form to your authentication API when ready.",
  };
}

export async function signupWithEmail(/* payload */) {
  return {
    ok: false,
    status: AUTH_STATUS.NOT_CONFIGURED,
    message:
      "Account creation is not connected to a server yet. Connect this form to your authentication API when ready.",
  };
}

export async function requestPasswordReset(/* { email } */) {
  return {
    ok: false,
    status: AUTH_STATUS.NOT_CONFIGURED,
    message:
      "Password reset is not connected to a server yet. Connect this form to your email/reset API when ready.",
  };
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}
