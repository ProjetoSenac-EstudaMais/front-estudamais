import { useNavigate } from "react-router-dom";
import imageDefault from "../assets/default/imageDefault";
import AvatarUsuario from "../components/Avatar";
import Button from "../components/Button";

interface CustomProps {
  nome: string,
  about: string,
  members: number,
  quiz: number,
  posts: number,
  id: number,
}

export default function CommunitiesCard({nome, about, members, quiz, posts, id}: CustomProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate(`/communities/${id}`)
  }
  
  return (
    <div className="w-full bg-white p-4 min-h-[150px] mb-4">
      <div className="flex items-center h-full">
        <AvatarUsuario size='115px' avatar={imageDefault} />
        <div className="flex flex-col w-full justify-start px-5 gap-2">
          <h1 className="font-medium text-xl">{nome}</h1>
          <div className="flex gap-4 flex-col">
            <p className="text-start">{about}</p>
            <div className="flex gap-5">
              <p>Membros: {members}</p>
              <p>Quiz: {quiz}</p>
              <p>Postagens: {posts}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-1/3">
          <Button
            onClick={handleNavigate}
            label="Ver comunidade"
          />
        </div>
      </div>
    </div>
  )
}
