function Home() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
        }}
      >
        <div
          style={{
            width: "80%",
            maxWidth: "1000px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            gap: "24px",
          }}
        >
          {/* Texto */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
              Blog Pessoal
            </h1>

            <p style={{ fontSize: "18px", lineHeight: 1.6 }}>
              Um espaço para compartilhar ideias, aprender tecnologia e crescer
              como desenvolvedor.
            </p>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Ver Postagens
              </button>

              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cadastrar
              </button>
            </div>
          </div>

          {/* Imagem */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Blog"
              style={{ width: "100%", maxWidth: "420px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

