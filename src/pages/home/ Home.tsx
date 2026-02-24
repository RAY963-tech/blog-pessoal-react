/* eslint-disable @typescript-eslint/no-unused-vars */
import ImagemHomme from '../../assets/ImagemPáginaHome.svg';
import ModalPostagem from '../../components/postagem/modelpostagem/ModelPostagem';

function Home() {
  return (
    <>
      <div className="bg-indigo-900 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4 text-center">
            <h2 className="text-5xl font-bold">
              Sejam Bem Vindos!
            </h2>
            <p className="text-xl">
              Expresse aqui seus pensamentos e opiniões
            </p>

            <div className="flex justify-around gap-4">
            <div className='rounded text-white 
             border-white border-solid border-2 py-2 px-4'        >
               <ModalPostagem />
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <img
              src="src/assets/ImagemPáginaHome.svg"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
