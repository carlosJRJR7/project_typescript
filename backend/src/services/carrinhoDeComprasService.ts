import CarrinhoDeCompras from "../models/carrinhoDeComprasModel";

class CarrinhoDeComprasService{
    async adicionarProdutoAoCarrinho(CarrinhoDeComprasData){
        try{
            const carrinho = new CarrinhoDeCompras(CarrinhoDeComprasData);
            const resultado = await carrinho.save();
            return { mensagem: 'Produto cadastrado com sucesso' };
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            throw new Error('Ocorreu um erro ao cadastrar o produto');
        }
    }

    async listarCarrinhoDeCompras(){
        try{
            const carrinho = await CarrinhoDeCompras.find();
            return carrinho;
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw new Error('Ocorreu um erro ao listar os produtos');
        }
    }
}



export default new CarrinhoDeComprasService();