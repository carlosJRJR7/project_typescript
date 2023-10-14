import { Router } from 'express'
import produtoService from './../../services/produtoService';
import carrinhoDeComprasService from '../../services/carrinhoDeComprasService';
import multer from 'multer';
import path from 'path';

const routes = Router()

// Configuração do armazenamento de arquivos com multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imagens'); // Onde os arquivos serão salvos no servidor
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo no servidor
  },
});

const upload = multer({ storage });

routes.post('/api/cadastrarProduto', upload.single('imagemProduto'),async (req, res) => {
  console.log(req.body);
  try {
    const resultado = await produtoService.cadastrarProduto({
      nomeProduto: req.body.nomeProduto,
      tipoProduto: req.body.tipoProduto,
      valorProduto: req.body.valorProduto,
      quantidadeProduto: req.body.quantidadeProduto,
      imagemProduto: req.file.filename,
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro ao cadastrar o produto' });
  }
});

routes.get('/api/listarProdutos', async (req, res) => {
  try {
    const resultado = await produtoService.listarProdutos();
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro ao listar os produtos' });
  }
});

routes.get('/api/listarProdutosSelecionados', async (req, res) => {
  try {
    const resultado = await produtoService.listarProdutosSelecionados(); // Filter by tipoProduto = 'S'
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao listar produtos selecionados:', error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro ao listar os produtos selecionados' });
  }
});

routes.get('/api/listarUltimosProdutos', async (req, res) => {
  try {
    const resultado = await produtoService.listarUltimosProdutos(); // Filter by tipoProduto = 'U'
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao listar produtos selecionados:', error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro ao listar os produtos selecionados' });
  }
});

routes.post('/api/adicionarAoCarrinho', async (req, res) => {
  try {
    const resultado = await carrinhoDeComprasService.adicionarProdutoAoCarrinho({
      quantidadeProduto: req.body.quantidadeProduto,
      valorProduto: req.body.valorProduto,
      nomeProduto: req.body.nomeProduto,
    });

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro ao adicionar o produto ao carrinho' });
  }
});



export default routes
