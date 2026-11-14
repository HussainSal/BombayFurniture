import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const brass = "#d7b57a";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#142520",
          color: "#f5efe3",
          fontFamily: "serif",
          border: `2px solid ${brass}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 10, color: brass }}>HANDCRAFTED SOFA CUM BEDS</div>
        <div style={{ display: "flex", fontSize: 120, letterSpacing: 18, marginTop: 24 }}>BOMBAY</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, letterSpacing: 16, color: brass }}>
          <div style={{ width: 60, height: 2, background: brass }} />
          FURNITURE
          <div style={{ width: 60, height: 2, background: brass }} />
        </div>
        <div style={{ display: "flex", fontSize: 44, fontStyle: "italic", marginTop: 48 }}>Sofa by day, bed by night.</div>
      </div>
    ),
    size,
  );
}
