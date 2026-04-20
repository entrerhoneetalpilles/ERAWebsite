import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Entre Rhône et Alpilles — Conciergerie Provence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#F5F0E8",
          padding: "80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#9B8B6E",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              margin: 0,
            }}
          >
            Provence · Alpilles · Rhône
          </p>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 300,
              color: "#1A1614",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Entre Rhône
            <br />
            et Alpilles
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#5C7A4E",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Conciergerie de locations saisonnières haut de gamme
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <p style={{ fontSize: "20px", color: "#9B8B6E", margin: 0 }}>
            entre-rhone-alpilles.fr
          </p>
          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "18px",
              color: "#5C5047",
            }}
          >
            <span>4,9/5 · 208 avis</span>
            <span>20 communes</span>
            <span>30+ biens gérés</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
