import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

interface lprodutoModel extends Document {
  nomeProduto: string;
  tipoProduto: 'V' | 'U' | 'N'; 
  valorProduto: number;
  quantidadeProduto: number;
  imagemProduto: string;
}

const ProdutoSchema: Schema = new Schema({
  nomeProduto: { type: String, required: true },
  tipoProduto: { type: String, enum: ['V', 'U', 'N'], required: true },
  valorProduto: { type: Number, required: true },
  quantidadeProduto: { type: Number, required: true },
  imagemProduto: { type: String, required: false },
});

// Crie o modelo usando o esquema e exporte-o
const Produto = mongoose.model<lprodutoModel>('Produto', ProdutoSchema);

export default Produto;