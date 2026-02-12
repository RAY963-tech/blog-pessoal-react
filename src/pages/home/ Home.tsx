function Home() {
  return (
    <>
      <div
        className="bg-indigo-900 flex justify-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="container grid grid-cols-2 text-white"
          style={{ maxWidth: "1280px" }}
        >
          
          <div className="flex flex-col gap-4 items-center justify-center py-4 text-center">
            
            <h2
              className="text-5xl font-bold"
              style={{ fontSize: "3rem" }}
            >
              Sejam Bem Vindos!
            </h2>

            <p
              className="text-xl"
              style={{ fontSize: "1.25rem" }}
            >
              Expresse aqui seus pensamentos e opiniões
            </p>

            <div className="flex justify-around gap-4">
              <div
                className="rounded text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-indigo-900 transition duration-300 cursor-pointer"
                style={{ borderRadius: "0.5rem" }}
              >
                Nova Postagem
              </div>
            </div>

          </div>

          <div className="flex justify-center items-center">
            <img
              src="src/assets/ImagemPáginaHome.svg"
              alt="Imagem Página Home"
              className="w-2/3"
              style={{ maxWidth: "66%" }}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
