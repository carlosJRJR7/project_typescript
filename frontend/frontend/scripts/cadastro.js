document.getElementById('cadastroProdutoForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const form = event.target;
  const formData = new FormData(form); // Cria um objeto FormData para os dados do formulário

  // Faz a solicitação POST para o endpoint do seu backend
  fetch('http://localhost:3000/api/cadastrarProduto', {
    method: 'POST',
    body: formData, // Envie os dados como FormData, não precisa especificar o cabeçalho 'Content-Type'
  })
    .then((response) => response.json())
    .then((data) => {
      // Lida com a resposta do backend (por exemplo, exibe uma mensagem de sucesso)
      console.log('Resposta do servidor:', data);
    })
    .catch((error) => {
      console.error('Erro ao enviar dados para o servidor:', error);
    });
});