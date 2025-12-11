import React from "https://cdn.jsdelivr.net/npm/react@18.2.0/index.min.js";

export default function App() {
  const [insumos, setInsumos] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: "", preco: 0, medida: "" });

  function adicionar() {
    setInsumos([...insumos, novo]);
    setNovo({ nome: "", preco: 0, medida: "" });
  }

  return React.createElement(
    "div",
    { style: { padding: 20, fontFamily: "Arial" } },

    React.createElement("h1", null, "Sistema de Insumos"),

    React.createElement("h2", null, "Cadastro"),

    React.createElement("input", {
      placeholder: "Nome do insumo",
      value: novo.nome,
      onChange: (e) => setNovo({ ...novo, nome: e.target.value }),
    }),

    React.createElement("input", {
      placeholder: "Preço de compra",
      type: "number",
      value: novo.preco,
      onChange: (e) => setNovo({ ...novo, preco: Number(e.target.value) }),
    }),

    React.createElement("input", {
      placeholder: "Unidade (ex: kg, g, ml)",
      value: novo.medida,
      onChange: (e) => setNovo({ ...novo, medida: e.target.value }),
    }),

    React.createElement(
      "button",
      { onClick: adicionar },
      "Adicionar"
    ),

    React.createElement("h2", null, "Insumos cadastrados"),

    React.createElement(
      "ul",
      null,
      insumos.map((i, idx) =>
        React.createElement(
          "li",
          { key: idx },
          `${i.nome} — R$ ${i.preco} / ${i.medida}`
        )
      )
    )
  );
}
