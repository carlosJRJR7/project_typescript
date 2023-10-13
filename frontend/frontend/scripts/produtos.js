document.addEventListener('DOMContentLoaded', function () {
    const produtosList = document.getElementById('produtos-list');

    fetch('http://localhost:3000/api/listarProdutos')
      .then(response => response.json())
      .then(produtos => {
        produtos.forEach(produto => {
          const produtoItem = document.createElement('li');
          produtoItem.classList.add('produto');

          const imagemElement = document.createElement('img');
          imagemElement.src = `http://localhost:3000/imagens/${produto.imagemProduto}`;
          produtoItem.appendChild(imagemElement);

          const nomeElement = document.createElement('h1');
          nomeElement.textContent = produto.nomeProduto;
          produtoItem.appendChild(nomeElement);

          const valorElement = document.createElement('p');
          valorElement.textContent = `Valor: R$ ${produto.valorProduto.toFixed(2)}`;
          produtoItem.appendChild(valorElement);

          const quantidadeElement = document.createElement('p');
          quantidadeElement.textContent = `Quantidade: ${produto.quantidadeProduto}`;
          produtoItem.appendChild(quantidadeElement);

          // Adicione o botão "Adicionar ao Carrinho" para cada produto
          const adicionarAoCarrinhoButton = document.createElement('button');
          adicionarAoCarrinhoButton.textContent = 'Adicionar ao Carrinho';
          adicionarAoCarrinhoButton.classList.add('adicionar-ao-carrinho');
          adicionarAoCarrinhoButton.addEventListener('click', () => comprarProduto(produto.quantidadeProduto, produto.valorProduto, produto.nomeProduto));
          produtoItem.appendChild(adicionarAoCarrinhoButton);

          produtosList.appendChild(produtoItem);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os detalhes dos produtos:', error);
      });
});

function comprarProduto(quantidade, valor, nome) {
  if (quantidade > 0) {
    const produto = {
      quantidadeProduto: quantidade,
      valorProduto: valor,
      nomeProduto: nome,
    };

    fetch('http://localhost:3000/api/adicionarAoCarrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }
        return response.json();
      })
      .then(data => {
        alert(`Produto "${produto.nomeProduto}" adicionado ao carrinho.`);
      })
      .catch(error => {
        console.error(error);
        alert('Ocorreu um erro ao adicionar o produto ao carrinho.');
      });
  }
}