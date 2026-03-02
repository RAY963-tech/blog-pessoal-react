import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletar, buscar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'
import type Postagem from '../../../models/Postagem'
import { ClipLoader } from 'react-spinners'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarPostagem() {

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
   if (!token) {
    ToastAlerta("Você precisa estar logado! info ", "info")

    setTimeout(() => {
      navigate('/')
    }, 2000)
  }
}, [token, navigate])

  useEffect(() => {

    async function buscarPostagem() {
      if (id !== undefined) {
        try {
          await buscar(`/postagens/${id}`, setPostagem, {
            headers: { Authorization: token }
          })
        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout()
          }
        }
      }
    }

    buscarPostagem()

  }, [id, token, handleLogout])

  async function deletarPostagem() {

    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, {
        headers: { Authorization: token }
      })

      ToastAlerta("Postagem apagada com sucesso!", "sucesso")

    } catch (error: any) {

      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro")
      }

    }

    setIsLoading(false)
    navigate("/postagens")
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>
        Deletar Postagem
      </h1>

      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>

        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          {postagem.titulo}
        </header>

        <div className='p-4'>
          <p className='text-xl'>{postagem.texto}</p>
        </div>

        <div className='flex'>
          <button
            onClick={() => navigate("/postagens")}
            className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'>
            Não
          </button>

          <button
            onClick={deletarPostagem}
            className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center'>

            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Sim"
            )}

          </button>
        </div>

      </div>
    </div>
  )
}

export default DeletarPostagem