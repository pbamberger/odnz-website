import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#d97706",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: "white", marginBottom: 16, letterSpacing: "-2px" }}>
          ODNZ
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.95)", textAlign: "center", maxWidth: 800, lineHeight: 1.3 }}>
          Organ Donation New Zealand
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 28, textAlign: "center" }}>
          One donor has the potential to help up to 10 people
        </div>
      </div>
    ),
    { ...size }
  );
}
