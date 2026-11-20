import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import qrcode from "@theme/vendor/qrcode-generator/qrcode";

// The QR spec asks for four light modules around the code, or some scanners will not find it.
const QUIET_ZONE_MODULES = 4;

type QrCodeProps = {
  value: string;
  label: string;
  size?: number;
};

/** Draws the code as one SVG path from the encoder's matrix, so no HTML string from the library reaches the DOM. */
const QrCode = ({ value, label, size = 168 }: QrCodeProps) => {
  const { palette } = useTheme();

  const { path, viewBoxSize } = useMemo(() => {
    const code = qrcode(0, "M");
    code.addData(value);
    code.make();

    const moduleCount = code.getModuleCount();
    let darkModules = "";

    for (let row = 0; row < moduleCount; row += 1) {
      for (let column = 0; column < moduleCount; column += 1) {
        if (code.isDark(row, column)) {
          darkModules += `M${column + QUIET_ZONE_MODULES} ${row + QUIET_ZONE_MODULES}h1v1h-1z`;
        }
      }
    }

    return { path: darkModules, viewBoxSize: moduleCount + 2 * QUIET_ZONE_MODULES };
  }, [value]);

  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      shapeRendering="crispEdges"
      data-test-id="img_mfa_qr_code"
    >
      {/* Scanners need full contrast, whatever the theme's colours. */}
      <rect width={viewBoxSize} height={viewBoxSize} fill={palette.common.white} />
      <path d={path} fill={palette.common.black} />
    </svg>
  );
};

export default QrCode;
