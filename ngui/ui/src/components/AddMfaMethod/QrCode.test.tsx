import { Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import QrCode from "./QrCode";

const OTPAUTH_URI =
  "otpauth://totp/FinOps%20for%20Cloud:reto.mayer%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=FinOps%20for%20Cloud&digits=6&period=30";

const renderQrCode = () =>
  renderWithProviders({
    initialEntry: "/",
    routes: <Route path="/" element={<QrCode value={OTPAUTH_URI} label="QR code" />} />
  });

describe("QrCode", () => {
  it("is an image named for screen readers", () => {
    const qrCode = renderQrCode();

    const svg = qrCode.find("img_mfa_qr_code");

    expect(svg?.getAttribute("role")).toBe("img");
    expect(svg?.getAttribute("aria-label")).toBe("QR code");

    qrCode.unmount();
  });

  it("leaves a four-module quiet zone and draws the top-left finder pattern just inside it", () => {
    const qrCode = renderQrCode();

    const svg = qrCode.find("img_mfa_qr_code");
    const path = svg?.querySelector("path")?.getAttribute("d") ?? "";
    const [, , viewBoxSize] = (svg?.getAttribute("viewBox") ?? "").split(" ").map(Number);

    // A QR code is 21 + 4n modules wide; the quiet zone adds four on each side.
    expect((viewBoxSize - 8 - 21) % 4).toBe(0);
    // Every finder pattern starts with a dark module in its corner.
    expect(path.startsWith("M4 4h1v1h-1z")).toBe(true);
    expect(path).not.toMatch(/M[0-3] /);

    qrCode.unmount();
  });
});
