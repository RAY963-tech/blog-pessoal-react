import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Camera } from "@phosphor-icons/react"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
	const navigate = useNavigate()
	
	const { usuario } = useContext(AuthContext)

	const [fotoPreview, setFotoPreview] = useState<string | null>(null)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", "info")
			navigate("/")
		}
	}, [navigate, usuario.token])

	const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const imagemURL = URL.createObjectURL(e.target.files[0])
			setFotoPreview(imagemURL)
		}
	}

	return (
		<div className="flex justify-center px-4">
			<div className="w-full max-w-5xl my-8 rounded-2xl overflow-hidden shadow-lg">


				<img
					className="w-full h-72 object-cover"
					src="https://i.imgur.com/ZZFAmzo.jpg"
					alt="Capa do Perfil"
				/>

				<div className="relative flex justify-center -mt-16 z-10">

					<label className="relative cursor-pointer group">

						<img
							className="w-40 h-40 rounded-full object-cover border-2 border-white shadow-md transition"
							src={
								fotoPreview
									? fotoPreview
									: "https://i.imgur.com/ZZFAmzo.jpg"
							}
							alt={`Foto de perfil de ${usuario.nome}`}
						/>

						<div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
							<Camera size={32} className="text-white" />
						</div>

						<input
							type="file"
							accept="image/*"
							onChange={handleFotoChange}
							className="hidden"
						/>
					</label>

				</div>

		
				<div className="bg-sky-500 text-white text-center pt-10 pb-10 -mt-12 rounded-b-2xl">
					<p className="text-lg font-semibold">
						Nome: {usuario.nome}
					</p>
					<p className="text-sm opacity-90">
						Email: {usuario.usuario}
					</p>
				</div>

			</div>
		</div>
	)
}

export default Perfil
