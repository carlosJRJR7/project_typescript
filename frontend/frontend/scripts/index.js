const produtosDiv = document.querySelector('.cols-4');

fetch('http://localhost:3000/api/listarProdutosSelecionados')
  .then(response => response.json())
  .then(produtos => {
    produtos.forEach(produto => {
      const produtoDiv = document.createElement('div');
      produtoDiv.classList.add('product');

      const imagem = document.createElement('img');
      imagem.src = `http://localhost:3000/imagens/${produto.imagemProduto}`;
      produtoDiv.appendChild(imagem);

      const nome = document.createElement('p');
      nome.classList.add('product-name');
      nome.textContent = produto.nomeProduto;
      produtoDiv.appendChild(nome);

      const preco = document.createElement('p');
      preco.classList.add('product-price');
      preco.textContent = `R$ ${produto.valorProduto} Reais`;
      produtoDiv.appendChild(preco);

      produtosDiv.appendChild(produtoDiv);
    });
  })
  .catch(error => {
    console.error(error);
    alert('Ocorreu um erro ao carregar os produtos.');
  });

  
  const ultimosProdutosDiv = document.querySelector('.cols-8');

  fetch('http://localhost:3000/api/listarUltimosProdutos')
    .then(response => response.json())
    .then(produtos => {
      produtos.forEach(produto => {
        const ultimosProdDiv = document.createElement('div');
        ultimosProdDiv.classList.add('product');
  
        const imagem = document.createElement('img');
        imagem.src = `http://localhost:3000/imagens/${produto.imagemProduto}`;
        ultimosProdDiv.appendChild(imagem);
  
        const nome = document.createElement('p');
        nome.classList.add('product-name');
        nome.textContent = produto.nomeProduto;
        ultimosProdDiv.appendChild(nome);
  
        const preco = document.createElement('p');
        preco.classList.add('product-price');
        preco.textContent = `R$ ${produto.valorProduto} Reais`;
        ultimosProdDiv.appendChild(preco);
  
        ultimosProdutosDiv.appendChild(ultimosProdDiv);
      });
    })
    .catch(error => {
      console.error(error);
      alert('Ocorreu um erro ao carregar os produtos.');
    });