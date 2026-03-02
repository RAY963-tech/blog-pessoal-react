import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    tema: null
  } as Postagem);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;


  useEffect(() => {
    if (token === '') {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {

    async function carregarDados() {

      try {
        await buscar('/temas', setTemas, {
          headers: { Authorization: token }
        });

        if (id !== undefined) {
          await buscar(`/postagens/${id}`, setPostagem, {
            headers: { Authorization: token }
          });
        }

      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        }
      }
    }

    carregarDados();

  }, [id, token, handleLogout]);

 
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value
    });
  }


  function atualizarTema(e: ChangeEvent<HTMLSelectElement>) {

    const temaSelecionado = temas.find(
      (tema) => tema.id === Number(e.currentTarget.value)
    );

    setPostagem({
      ...postagem,
      tema: temaSelecionado!
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {

      if (id !== undefined) {

        await atualizar('/postagens', postagem, setPostagem, {
          headers: { Authorization: token }
        });

        ToastAlerta("Postagem atualizada com sucesso!", "sucesso");

      } else {

        await cadastrar('/postagens', postagem, setPostagem, {
          headers: { Authorization: token }
        });

        ToastAlerta("Postagem cadastrada com sucesso!", "sucesso");
      }

      retornar();

    } catch (error: any) {

      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao salvar a postagem.", "erro");
      }

    }

    setIsLoading(false);
  }

  return (
    <div className="container flex flex-col mx-auto items-center justify-center">

      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>

          <select
            name="tema"
            className="border p-2 border-slate-800 rounded"
            value={postagem.tema?.id || ''}
            onChange={atualizarTema}
          >
            <option value="" disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}

          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
          text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>
              {id !== undefined ? 'Atualizar Postagem' : 'Cadastrar Postagem'}
            </span>
          )}
        </button>

      </form>
    </div>
  );
}

export default FormPostagem;