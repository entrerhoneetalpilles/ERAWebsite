import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Entre Rhône et Alpilles — Conciergerie Provence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F0E8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* Bande verte gauche */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 10,
            height: "100%",
            background: "#8C9E6E",
          }}
        />
        {/* Bande sable droite */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 4,
            height: "100%",
            background: "#B89A70",
          }}
        />
        {/* Bande sable bas */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 5,
            background: "#B89A70",
          }}
        />

        {/* Contenu centré */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Ornement */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
            <div style={{ width: 90, height: 1, background: "#B89A70" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#B89A70" }} />
            <div style={{ width: 90, height: 1, background: "#B89A70" }} />
          </div>

          {/* Titre */}
          <div
            style={{
              fontSize: 92,
              fontWeight: 400,
              color: "#1A1A1A",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            Entre Rhône
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 300,
              color: "#6E8052",
              letterSpacing: 4,
              marginTop: 10,
            }}
          >
            et Alpilles
          </div>

          {/* Filet */}
          <div style={{ width: 50, height: 1, background: "#B89A70", margin: "36px 0" }} />

          {/* Baseline */}
          <div
            style={{
              fontSize: 22,
              color: "#9B8B6E",
              letterSpacing: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            Conciergerie · Provence
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 17,
              color: "#B89A70",
              letterSpacing: 2,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 300,
              marginTop: 22,
            }}
          >
            entre-rhone-alpilles.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
