import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  color?: string; // Nova propriedade para definir a cor
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  color,
}) => {
  // Mapeia a cor escolhida para as classes CSS
  const getColorClasses = () => {
    switch (color) {
      case 'seguindo':
        return {
          background: outline ? 'bg-white' : 'bg-white',
          border: outline ? 'border-black' : 'border-black',
          text: outline ? 'text-black' : 'text-black',
        };
      case 'seguir':
        return {
          background: outline ? 'bg-white' : 'bg-blue-600',
          border: outline ? 'border-black' : 'border-blue-600',
          text: outline ? 'text-black' : 'text-white',
        };
      case 'black':
        return {
          background: outline ? 'bg-black' : 'bg-blue-600',
          border: outline ? 'border-white' : 'border-blue-600',
          text: outline ? 'text-white' : 'text-black',
        };
      default:
        return {
          background: outline ? 'bg-blue-600' : 'bg-white',
          border: outline ? 'border-blue-600' : 'border-black',
          text: outline ? 'text-white' : 'text-black',
        };
    }
  };

  const { background, border, text } = getColorClasses();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${background}
        ${border}
        ${text}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-7
            top-3
          "
        />
      )}
      {label}
    </button>
  );
}

export default Button;
