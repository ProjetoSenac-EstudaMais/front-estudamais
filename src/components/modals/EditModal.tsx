import { useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { useEditModal } from "../../hooks/useEditModal";
import Button from "../Button";
import uploadAvatar from "../../api/updateUser";
import { toast } from 'react-hot-toast';

interface CustomProps {
    loggedUserId: number | undefined,
}

const EditModal = ({loggedUserId}: CustomProps) => {
    const editModal = useEditModal();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nome = '';

    const [selectedFile, setSelectedFile] = useState<Blob | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUploadAvatar = async () => {
        if (selectedFile && loggedUserId) {
          try {
            const file = new File([selectedFile], 'avatar.jpg', { type: selectedFile.type });
            await uploadAvatar(loggedUserId, file);
            console.log('Avatar enviado com sucesso!');
            toast.success("Foto enviada com sucesso!")
          } catch (error) {
            console.log("ocorreu um erro", error);
            toast.error("Occoreu um erro ao enviar a foto!")
          }
        }
      };
    

    const previewImage = selectedFile ? URL.createObjectURL(selectedFile) : null;

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="">
                <h1 className="text-xl font-medium pb-4">Atualize sua foto de perfil</h1>
                <div className="flex flex-row justify-between">
                    <input type="file" name="" id="" onChange={handleFileChange} />
                    {previewImage && (
                        <img src={previewImage} alt="Preview" style={{ maxWidth: '200px' }} />
                    )}
                </div>
            </div>
            <div>
                <Button
                    onClick={handleUploadAvatar}
                    label="Enviar Foto de perfil"
                />
            </div>
        </div>
    )

    const footerContent = (
        <div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edite seu perfil"
            actionLabel="Salvar"
            onClose={editModal.onClose}
            onSubmit={() => { }}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default EditModal;