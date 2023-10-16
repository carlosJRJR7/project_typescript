let valorCompraTotal = 0;

const criarLinhaProduto = (item) => {
  const row = document.createElement('tr');
  const qtdTotalProd = item.quantidadeProduto;
  let qtdProd = 1;

  const productCell = document.createElement('td');
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  const productImg = document.createElement('img');
  productImg.src = item.imagemProduto;
  productImg.alt = '';
  const productInfoDiv = document.createElement('div');
  productInfoDiv.classList.add('info');
  const productNameDiv = document.createElement('div');
  productNameDiv.classList.add('name');
  const productName = document.createElement('b');
  productName.textContent = item.nomeProduto;
  const productCategory = document.createElement('div');
  productCategory.classList.add('category');
  productCategory.textContent = item.categoriaProduto;

  productNameDiv.appendChild(productName);
  productInfoDiv.appendChild(productNameDiv);
  productInfoDiv.appendChild(productCategory);
  productDiv.appendChild(productImg);
  productDiv.appendChild(productInfoDiv);
  productCell.appendChild(productDiv);
  row.appendChild(productCell);

  const priceCell = document.createElement('td');
  priceCell.textContent = `R$ ${item.valorProduto}`;
  row.appendChild(priceCell);

  const qtyCell = document.createElement('td');
  const qtyDiv = document.createElement('div');
  qtyDiv.classList.add('qty');
  const minusBtn = document.createElement('button');
  minusBtn.classList.add('minus-btn');
  const minusIcon = document.createElement('i');
  minusIcon.classList.add('bx', 'bx-minus');
  minusBtn.appendChild(minusIcon);
  const qtySpan = document.createElement('span');
  qtySpan.textContent = qtdProd;
  const plusBtn = document.createElement('button');
  plusBtn.classList.add('plus-btn');
  const plusIcon = document.createElement('i');
  plusIcon.classList.add('bx', 'bx-plus');
  plusBtn.appendChild(plusIcon);

  qtyDiv.appendChild(minusBtn);
  qtyDiv.appendChild(qtySpan);
  qtyDiv.appendChild(plusBtn);
  qtyCell.appendChild(qtyDiv);
  row.appendChild(qtyCell);

  const totalCell = document.createElement('td');
  totalCell.classList.add('total');
  totalCell.textContent = `R$ ${item.valorProduto * qtdProd}`;
  let valorTotalParcial = item.valorProduto * qtdProd;
  row.appendChild(totalCell);

  const removeCell = document.createElement('td');
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  const removeIcon = document.createElement('i');
  removeIcon.classList.add('bx', 'bx-x');
  removeBtn.appendChild(removeIcon);
  removeCell.appendChild(removeBtn);
  row.appendChild(removeCell);

  minusBtn.addEventListener('click', () => {
    qtdProd--;
    if (qtdProd < 1) {
      qtdProd = 1;
      alert('Quantidade mínima atingida, se deseja deletar o produto, clique no X ao lado.')
    }
    qtySpan.textContent = qtdProd;
    totalCell.textContent = `R$ ${item.valorProduto * qtdProd}`;
    valorCompraTotal -= item.valorProduto;
  });

  plusBtn.addEventListener('click', () => {
    qtdProd++;
    if (qtdProd > qtdTotalProd) {
      qtdProd = qtdTotalProd;
      alert('Quantidade máxima atingida, não é possível adicionar mais do mesmo produto.')
    }
    qtySpan.textContent = qtdProd;
    totalCell.textContent = `R$ ${item.valorProduto * qtdProd}`;
    valorCompraTotal += item.valorProduto;
  });

  return row;
};

const criarResumoCompra = () => {
  const div = document.createElement('div');
  div.classList.add('box');
  const header = document.createElement('header');
  header.textContent = 'Resumo da compra';
  const info = document.createElement('div');
  info.classList.add('info');
  const subTotalDiv = document.createElement('div');
  const subTotalSpan1 = document.createElement('span');
  subTotalSpan1.textContent = 'Sub-total';
  const subTotalSpan2 = document.createElement('span');
  subTotalSpan2.textContent = 'R$ 418';
  subTotalDiv.appendChild(subTotalSpan1);
  subTotalDiv.appendChild(subTotalSpan2);
  const freteDiv = document.createElement('div');
  const freteSpan1 = document.createElement('span');
  freteSpan1.textContent = 'Frete';
  const freteSpan2 = document.createElement('span');
  freteSpan2.textContent = 'Gratuito';
  freteDiv.appendChild(freteSpan1);
  freteDiv.appendChild(freteSpan2);
  const cupomDiv = document.createElement('div');
  const cupomBtn = document.createElement('button');
  cupomBtn.textContent = 'Adicionar cupom de desconto';
  const cupomIcon = document.createElement('i');
  cupomIcon.classList.add('bx', 'bx-right-arrow-alt');
  cupomBtn.appendChild(cupomIcon);
  cupomDiv.appendChild(cupomBtn);
  info.appendChild(subTotalDiv);
  info.appendChild(freteDiv);
  info.appendChild(cupomDiv);
  const footer = document.createElement('footer');
  const totalSpan1 = document.createElement('span');
  totalSpan1.textContent = 'Total';
  const totalSpan2 = document.createElement('span');
  totalSpan2.textContent = valorCompraTotal;
  footer.appendChild(totalSpan1);
  footer.appendChild(totalSpan2);

  div.appendChild(header);
  div.appendChild(info);
  div.appendChild(footer);

  const finalizarBtn = document.createElement('button');
  finalizarBtn.textContent = 'Finalizar Compra';
  div.appendChild(finalizarBtn);

  return div;
};


document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('tbody');
  try {
    const response = await fetch('http://localhost:3000/api/listarCarrinhoDeCompras');
    const data = await response.json();
    data.forEach(item => {
      const row = criarLinhaProduto(item);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
  const resumoCompra = document.querySelector('aside');
  try{
    const box = criarResumoCompra();
    document.body.appendChild(box); 
  } catch(error){
    console.log(error);
  }
});