import type { ThemeConfig } from "antd";

// Modernist tokens for the antd components wrapped in components/ui.
// Keep in sync with the @theme block in app/globals.css.
const SURFACE = "#eae9e9";
const DIVIDER = "rgba(32, 30, 29, 0.4)";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#ec3013",
    colorText: "#201e1d",
    colorBorder: DIVIDER,
    colorBgContainer: SURFACE,
    colorBgMask: "rgba(45, 43, 43, 0.5)",
    borderRadius: 0,
    borderRadiusLG: 0,
    borderRadiusSM: 0,
    borderRadiusXS: 0,
    fontFamily: "var(--font-archivo), system-ui, sans-serif",
    fontSize: 14,
    fontWeightStrong: 800,
    controlHeight: 36,
  },
  components: {
    Button: { primaryShadow: "none", defaultShadow: "none", dangerShadow: "none" },
    Input: { activeShadow: "none" },
    Modal: {
      contentBg: SURFACE,
      headerBg: SURFACE,
      titleFontSize: 20,
    },
  },
};
