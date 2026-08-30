import { APP_NAME, BRAND_URL } from "../config";

type EmailTemplateOptions = {
  preheader?: string;
  greeting?: string;
  body: string;
  footerNote?: string;
};

/*
 * Brand palette. Change these five values to rebrand every email the app
 * sends — nothing below hard-codes a colour. Inline hex only: Gmail and
 * Outlook strip custom properties and most <style> rules.
 */
const ACCENT = "#2563eb";
const ACCENT_DEEP = "#1d4ed8";
const ACCENT_SOFT = "#dbeafe";
const INK = "#0f172a";
const ACCENT_GRADIENT = `linear-gradient(135deg, ${ACCENT_SOFT} 0%, ${ACCENT} 50%, ${ACCENT_DEEP} 100%)`;

/** Neutrals, kept together so the shell can be retoned in one place. */
const PAGE_BG = "#f1f5f9";
const PANEL_BG = "#f8fafc";
const BORDER = "#e2e8f0";
const TEXT = "#1e293b";
const TEXT_MUTED = "#64748b";
const TEXT_FAINT = "#94a3b8";

const otpBlock = (otp: string, label = "Your verification code") => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
    <tr>
      <td align="center">
        <p style="margin: 0 0 10px; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${TEXT_FAINT};">
          ${label}
        </p>
        <div style="display: inline-block; padding: 18px 28px; background: ${INK}; border: 1px solid ${ACCENT}; border-radius: 14px; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);">
          <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 0.35em; color: ${ACCENT_SOFT};">
            ${otp}
          </span>
        </div>
        <p style="margin: 14px 0 0; font-size: 13px; color: #dc2626; font-weight: 600;">
          This code expires shortly — use it right away.
        </p>
      </td>
    </tr>
  </table>
`;

const ctaButton = (label: string, href: string) => `
  <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px auto;">
    <tr>
      <td align="center" style="border-radius: 999px; background: ${ACCENT};">
        <a href="${href}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 12px; font-weight: 700; color: ${INK}; text-decoration: none; letter-spacing: 0.12em; text-transform: uppercase;">
          ${label}
        </a>
      </td>
    </tr>
  </table>
`;

/** Big highlighted number — balances, counts, amounts. */
const statBadge = (value: string | number, label = "") => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
    <tr>
      <td align="center">
        <div style="display: inline-block; padding: 22px 36px; background: ${INK}; border-radius: 16px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);">
          ${label ? `<p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255, 255, 255, 0.75);">${label}</p>` : ""}
          <p style="margin: 0; font-size: 44px; font-weight: 700; color: ${ACCENT}; line-height: 1;">${value}</p>
        </div>
      </td>
    </tr>
  </table>
`;

/** Callout box for a short note or reason. */
const noteBox = (note: string, label = "Note") => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
    <tr>
      <td style="padding: 18px 22px; background: ${PANEL_BG}; border-left: 3px solid ${ACCENT}; border-radius: 0 12px 12px 0;">
        <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${ACCENT_DEEP};">${label}</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.65; color: ${TEXT};">${note}</p>
      </td>
    </tr>
  </table>
`;

const statusBadge = (status: "approved" | "rejected") => {
  const isApproved = status === "approved";
  const background = isApproved
    ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
    : "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)";
  const label = isApproved ? "Request Approved" : "Request Rejected";
  const shadow = isApproved
    ? "rgba(5, 150, 105, 0.25)"
    : "rgba(220, 38, 38, 0.25)";

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
    <tr>
      <td align="center">
        <div style="display: inline-block; padding: 16px 28px; background: ${background}; border-radius: 14px; box-shadow: 0 10px 24px ${shadow};">
          <p style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff;">
            ${label}
          </p>
        </div>
      </td>
    </tr>
  </table>
`;
};

const infoCard = (rows: { label: string; value: string }[]) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0; background: ${PANEL_BG}; border: 1px solid ${BORDER}; border-radius: 12px; overflow: hidden;">
    ${rows
      .map(
        (row, index) => `
      <tr>
        <td style="padding: 13px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${TEXT_FAINT}; width: 40%; vertical-align: top;${index < rows.length - 1 ? " border-bottom: 1px solid ${BORDER};" : ""}">
          ${row.label}
        </td>
        <td style="padding: 13px 20px; font-size: 15px; color: ${TEXT}; font-weight: 500; word-break: break-word;${index < rows.length - 1 ? " border-bottom: 1px solid ${BORDER};" : ""}">
          ${row.value}
        </td>
      </tr>`,
      )
      .join("")}
  </table>
`;

/**
 * The preheader is the hidden preview line mail clients show next to the
 * subject. It is plain text by definition, and callers routinely build it from
 * client-supplied values — a customer name, an event type — so it is escaped
 * here rather than trusting every call site to remember.
 *
 * `body` and `greeting` are deliberately not escaped: those are composed from
 * the helpers below and are HTML by design.
 */
const escapePreheader = (value: string): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const buildEmailTemplate = ({
  preheader: rawPreheader = "",
  greeting = "Hello",
  body,
  footerNote = "If you did not request this email, you can safely ignore it.",
}: EmailTemplateOptions): string =>
  ((preheader: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAGE_BG}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${PAGE_BG}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);">
          <!-- Masthead. Swap the wordmark for an <img> logo if you have one. -->
          <tr>
            <td style="padding: 34px 32px 30px; background: ${INK}; text-align: center;">
              <p style="margin: 0; font-size: 21px; font-weight: 700; letter-spacing: 0.22em; color: #ffffff; text-transform: uppercase;">
                ${APP_NAME}
              </p>
            </td>
          </tr>
          <!-- Accent hairline under the masthead. -->
          <tr>
            <td style="height: 3px; background: ${ACCENT_GRADIENT}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding: 36px 32px 28px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; line-height: 1.3; color: ${TEXT}; font-weight: 700;">
                ${greeting}
              </h2>
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 32px; background-color: ${PANEL_BG}; border-top: 1px solid ${BORDER};">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: ${TEXT_MUTED}; text-align: center;">
                ${footerNote}
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: ${TEXT_FAINT}; text-align: center;">
                © ${new Date().getFullYear()} ${APP_NAME} ·
                <a href="${BRAND_URL}" style="color: ${ACCENT_DEEP}; text-decoration: none; font-weight: 600;">${BRAND_URL.replace(/^https?:\/\//, "")}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`)(escapePreheader(rawPreheader));

export const emailHelpers = {
  otpBlock,
  ctaButton,
  statBadge,
  noteBox,
  statusBadge,
  infoCard,
  paragraph: (text: string) =>
    `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: ${TEXT};">${text}</p>`,
  highlight: (text: string) =>
    `<strong style="color: ${ACCENT_DEEP};">${text}</strong>`,
};
