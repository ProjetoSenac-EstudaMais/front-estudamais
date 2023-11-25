import defaultUser from '../assets/default_user.jpg'

interface CustomProps {
    size: string; 
  }

export default function AvatarUsuarioDefault({ size }: CustomProps) {

    return (
        <img
            className="rounded-full"
            src={defaultUser}
            alt="AvatarUser"
            style={{ width: 65, height: 'auto' }}
        />
    );
}