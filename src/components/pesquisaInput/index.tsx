interface CustomPesquisaInput {
    texto: String,
}

export default function PesquisaInput({texto}:CustomPesquisaInput) {
  return (
    <input
    type="text"
    placeholder={`${texto}`}
    className="w-full h-10 bg-[#F0F2F5] rounded-[25px] px-4"
    />
  )
}
