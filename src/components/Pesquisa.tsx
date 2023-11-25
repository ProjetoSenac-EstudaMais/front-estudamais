interface CustomPesquisaInput {
  texto: String,
  value: String,
  onchange: any,
}

export default function PesquisaInput({texto, value,onchange}:CustomPesquisaInput) {
return (
  <input
  type="text"
  placeholder={`${texto}`}
  value={`${value}`}
  onChange={onchange}
  className="w-full h-10 bg-[#F0F2F5] rounded-[25px] px-4"
  />
)
}
