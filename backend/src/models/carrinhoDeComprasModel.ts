import mongoose, { Schema, Document } from 'mongoose';

interface carrinhoDeComprasModel extends Document {
    quantidade: number;
    valorProduto: number;
    nomeProduto: string;
    imagemProduto: string;
  }
  
  const CarrinhoDeComprasSchema: Schema = new Schema({
    quantidadeProduto: { type: Number, required: true },
    valorProduto: { type: Number, required: true },
    nomeProduto: { type: String, required: true },
    imagemProduto: { type: String, required: false },
  });
  
  // Crie o modelo usando o esquema e exporte-o
  const CarrinhoDeCompras = mongoose.model<carrinhoDeComprasModel>('CarrinhoDeCompras', CarrinhoDeComprasSchema);
  
  export default CarrinhoDeCompras;