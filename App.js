import React from "https://esm.sh/react@18.2.0";

export default function App() {
  const [insumos, setInsumos] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: "", medida: "", preco: "" });

  const [receita, setReceita] = React.useState([]);
  const [itemReceita, setItemReceita] = React.useState({ insumo: "", qtd: 0 });

  const [financeiro, setFinanceiro] = React.useState({
    margem: 50,
    custoFixoPorProduto: 0,
    embalagem: 0
  });

  function adicionarInsumo() {
    if (!novo.nome || !novo.medida || !novo.preco) return alert("Preencha tudo");
    setInsumos([...insumos, { ...novo, preco: Number(novo.preco) }]);
    setNovo({ nome: "", medida: "", preco: "" });
  }

  function adicionarItemReceita() {
    const ins = insumos.find(i => i.nome === itemReceita.insumo);
    if (!ins) return alert("Escolha um insumo válido.");
    setReceita([...receita, { ...itemReceita, qtd: Number(itemReceita.qtd), preco: ins.preco }]);
  }

  function calcularCustos() {
    let custoCru = receita.reduce((acc, item) => {
      const custo = (item.preco / 1000) * item.qtd;
      return acc + custo;
    }, 0);

    const custoFinal =
      custoCru +
      Number(financeiro.custoFixoPorProduto) +
      Number(financeiro.embalagem);

    const precoSugerido =
      custoFinal / (1 - Number(financeiro.margem) / 100);

    return { custoCru, custoFinal, precoSugerido };
  }

  const resultados = calcularCustos();

  return React.createElement(
    "div",
    { style: { padding: 20, fontFamily: "Arial" } },

    React.createElement("h1", null, "Sistema Completo de Gestão de Insumos e Precificação"),

    // Cadastro de insumos
    React.createElement("section", null,
      React.createElement("h2", null, "Cadastro de Insumos"),

      React.createElement("input", {
        placeholder: "Nome",
        value: novo.nome,
        onChange: (e) => setNovo({ ...novo, nome: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Medida (kg/g/ml/un)",
        value: novo.medida,
        onChange: (e) => setNovo({ ...novo, medida: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Preço de compra",
        value: novo.preco,
        onChange: (e) => setNovo({ ...novo, preco: e.target.value })
      }),

      React.createElement("button", { onClick: adicionarInsumo }, "Adicionar")
    ),

    // Lista
    React.createElement("section", null,
      React.createElement("h2", null, "Insumos cadastrados"),
      React.createElement("ul", null,
        insumos.map((i, idx) =>
          React.createElement("li", { key: idx },
            `${i.nome} — R$${i.preco.toFixed(2)} / ${i.medida}`
          )
        )
      )
    ),

    // Ficha técnica
    React.createElement("section", null,
      React.createElement("h2", null, "Ficha Técnica de Produção"),

      React.createElement("select", {
        value: itemReceita.insumo,
        onChange: (e) => setItemReceita({ ...itemReceita, insumo: e.target.value })
      },
        React.createElement("option", null, "Selecione"),
        insumos.map((i) =>
          React.createElement("option", { key: i.nome, value: i.nome }, i.nome)
        )
      ),

      React.createElement("input", {
        type: "number",
        placeholder: "Quantidade usada (g/ml/un)",
        value: itemReceita.qtd,
        onChange: (e) => setItemReceita({ ...itemReceita, qtd: e.target.value })
      }),

      React.createElement("button", { onClick: adicionarItemReceita }, "Adicionar à receita"),

      React.createElement("ul", null,
        receita.map((i, idx) =>
          React.createElement("li", { key: idx },
            `${i.insumo} — ${i.qtd}${insumos.find(x => x.nome === i.insumo)?.medida}`
          )
        )
      )
    ),

    // Cálculos finais
    React.createElement("section", null,
      React.createElement("h2", null, "Financeiro e Precificação"),

      React.createElement("input", {
        type: "number",
        placeholder: "Margem (%)",
        value: financeiro.margem,
        onChange: (e) => setFinanceiro({ ...financeiro, margem: e.target.value })
      }),

      React.createElement("input", {
        type: "number",
        placeholder: "Custo fixo por produto",
        value: financeiro.custoFixoPorProduto,
        onChange: (e) => setFinanceiro({ ...financeiro, custoFixoPorProduto: e.target.value })
      }),

      React.createElement("input", {
        type: "number",
        placeholder: "Embalagem (R$)",
        value: financeiro.embalagem,
        onChange: (e) => setFinanceiro({ ...financeiro, embalagem: e.target.value })
      }),

      React.createElement("h3", null, `Custo cru: R$ ${resultados.custoCru.toFixed(2)}`),
      React.createElement("h3", null, `Custo final: R$ ${resultados.custoFinal.toFixed(2)}`),
      React.createElement("h2", null, `Preço sugerido: R$ ${resultados.precoSugerido.toFixed(2)}`)
    )
  );
}
