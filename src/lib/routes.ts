// Single source of truth for in-app paths.
export const ROUTES = {
  home: "/",
  comingSoon: "/?tab=soon",
  signIn: "/auth/sign-in",
  verify: "/auth/verify",
  guest: "/auth/guest",
  forgotPassword: "/auth/forgot-password",
  welcome: "/auth/welcome",
} as const;
