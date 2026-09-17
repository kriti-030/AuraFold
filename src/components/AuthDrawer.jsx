import { useEffect, useId, useState } from "react";
import {
  isValidEmail,
  loginWithEmail,
  requestPasswordReset,
  signupWithEmail,
} from "../services/authService";

const MIN_PASSWORD = 8;
const LOGO_SRC = "/aurafold-logo.png";

function PasswordInput({ id, label, value, onChange, error, autoComplete }) {
  const [visible, setVisible] = useState(false);
  const errorId = useId();

  return (
    <div className={`auth-drawer__field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="auth-drawer__password">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button
          type="button"
          className="auth-drawer__eye"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? (
        <p className="auth-drawer__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextField({ id, label, type = "text", value, onChange, error, autoComplete, optional }) {
  const errorId = useId();
  return (
    <div className={`auth-drawer__field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional ? <span className="auth-drawer__optional"> (optional)</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p className="auth-drawer__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthDrawer({ open, mode, onModeChange, onClose }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contentKey, setContentKey] = useState(mode);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("auth-drawer-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("auth-drawer-open");
    };
  }, [open, onClose]);

  useEffect(() => {
    setErrors({});
    setFormMessage("");
    setContentKey(mode);
  }, [mode, open]);

  const switchMode = (next) => {
    setErrors({});
    setFormMessage("");
    onModeChange(next);
  };

  const validateLogin = () => {
    const next = {};
    if (!email.trim()) next.email = "Please complete this field.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!password) next.password = "Please complete this field.";
    else if (password.length < MIN_PASSWORD) {
      next.password = `Password must be at least ${MIN_PASSWORD} characters.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateSignup = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = "Please complete this field.";
    if (!email.trim()) next.email = "Please complete this field.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!password) next.password = "Please complete this field.";
    else if (password.length < MIN_PASSWORD) {
      next.password = `Password must be at least ${MIN_PASSWORD} characters.`;
    }
    if (!confirm) next.confirm = "Please complete this field.";
    else if (password !== confirm) next.confirm = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateForgot = () => {
    const next = {};
    if (!email.trim()) next.email = "Please complete this field.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    setFormMessage("");
    if (!validateLogin()) return;
    setSubmitting(true);
    try {
      const result = await loginWithEmail({ email: email.trim(), password });
      setFormMessage(result.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitSignup = async (event) => {
    event.preventDefault();
    setFormMessage("");
    if (!validateSignup()) return;
    setSubmitting(true);
    try {
      const result = await signupWithEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
      setFormMessage(result.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitForgot = async (event) => {
    event.preventDefault();
    setFormMessage("");
    if (!validateForgot()) return;
    setSubmitting(true);
    try {
      const result = await requestPasswordReset({ email: email.trim() });
      setFormMessage(result.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`auth-drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        className="auth-drawer__overlay"
        aria-label="Close authentication"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        className="auth-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="AURAFOLD authentication"
      >
        <button
          type="button"
          className="auth-drawer__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="auth-drawer__scroll">
          <div className="auth-drawer__brand">
            <img
              src={LOGO_SRC}
              alt="AURAFOLD — Fashion In Freedom"
              width="160"
              height="160"
              decoding="async"
            />
          </div>

          <div className="auth-drawer__content" key={contentKey}>
            {mode !== "forgot" ? (
              <div className="auth-drawer__tabs" role="tablist" aria-label="Authentication mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  className={`auth-drawer__tab${mode === "login" ? " is-active" : ""}`}
                  onClick={() => switchMode("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signup"}
                  className={`auth-drawer__tab${mode === "signup" ? " is-active" : ""}`}
                  onClick={() => switchMode("signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : null}

            {mode === "login" ? (
              <>
                <h2 className="auth-drawer__title">Welcome to AURAFOLD</h2>
                <p className="auth-drawer__lead">Sign in to continue to your account.</p>

                <form className="auth-drawer__form" onSubmit={onSubmitLogin} noValidate>
                  <TextField
                    id="drawer-login-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <PasswordInput
                    id="drawer-login-password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    autoComplete="current-password"
                  />
                  <div className="auth-drawer__row">
                    <button
                      type="button"
                      className="auth-drawer__text-btn"
                      onClick={() => switchMode("forgot")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button className="auth-drawer__submit" type="submit" disabled={submitting}>
                    {submitting ? "Please wait…" : "Login"}
                  </button>
                  {formMessage ? (
                    <p className="auth-drawer__message" role="status">
                      {formMessage}
                    </p>
                  ) : null}
                </form>

                <p className="auth-drawer__switch">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => switchMode("signup")}>
                    Sign Up
                  </button>
                </p>
              </>
            ) : null}

            {mode === "signup" ? (
              <>
                <h2 className="auth-drawer__title">Welcome to AURAFOLD</h2>
                <p className="auth-drawer__lead">Create your account and join us.</p>

                <form className="auth-drawer__form" onSubmit={onSubmitSignup} noValidate>
                  <TextField
                    id="drawer-signup-name"
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    autoComplete="name"
                  />
                  <TextField
                    id="drawer-signup-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <TextField
                    id="drawer-signup-phone"
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    optional
                  />
                  <PasswordInput
                    id="drawer-signup-password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    autoComplete="new-password"
                  />
                  <PasswordInput
                    id="drawer-signup-confirm"
                    label="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    error={errors.confirm}
                    autoComplete="new-password"
                  />
                  <button className="auth-drawer__submit" type="submit" disabled={submitting}>
                    {submitting ? "Please wait…" : "Create Account"}
                  </button>
                  {formMessage ? (
                    <p className="auth-drawer__message" role="status">
                      {formMessage}
                    </p>
                  ) : null}
                </form>

                <p className="auth-drawer__switch">
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")}>
                    Login
                  </button>
                </p>
              </>
            ) : null}

            {mode === "forgot" ? (
              <>
                <h2 className="auth-drawer__title">Forgot Password?</h2>
                <p className="auth-drawer__lead">
                  Enter your email address and we&apos;ll help you recover your account.
                </p>

                <form className="auth-drawer__form" onSubmit={onSubmitForgot} noValidate>
                  <TextField
                    id="drawer-forgot-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <button className="auth-drawer__submit" type="submit" disabled={submitting}>
                    {submitting ? "Please wait…" : "Send Reset Link"}
                  </button>
                  {formMessage ? (
                    <p className="auth-drawer__message" role="status">
                      {formMessage}
                    </p>
                  ) : null}
                </form>

                <p className="auth-drawer__switch">
                  <button type="button" onClick={() => switchMode("login")}>
                    Back to Login
                  </button>
                </p>
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
