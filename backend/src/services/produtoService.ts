import Produto from '../models/produtoModel';

class ProdutoService {
  async cadastrarProduto(produtoData) {
    try {
      const novoProduto = new Produto(produtoData);
      await novoProduto.save();
      return { mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      throw new Error('Ocorreu um erro ao cadastrar o produto');
    }
  }

  async listarProdutos() {
    try {
      const produtos = await Produto.find();
      return produtos;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new Error('Ocorreu um erro ao listar os produtos');
    }
  }

  async listarProdutosSelecionados() {
    try {
      const produtos = await Produto.find({ tipoProduto: 'S' });
      return produtos;
    } catch (error) {
      console.error('Erro ao listar produtos selecionados:', error);
      throw new Error('Ocorreu um erro ao listar os produtos selecionados');
    }
  }

  async listarUltimosProdutos() {
    try {
      const produtos = await Produto.find({ tipoProduto: 'U' });
      return produtos;
    } catch (error) {
      console.error('Erro ao listar produtos selecionados:', error);
      throw new Error('Ocorreu um erro ao listar os produtos selecionados');
    }
  }
  
}


export default new ProdutoService();