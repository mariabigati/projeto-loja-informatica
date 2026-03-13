import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
  constructor(private _repository = new ProdutoRepository()) {}

  async selecionarTodos() {
    return await this._repository.findAll();
  }

  async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.select(id);
  }

  async selecionarNome(nome: string) {
    console.log(nome)
    return await this._repository.selectName(nome);
  }


  async inserir(nome: string, valor: number, vinculoImagem: string, idCategoria: number) {
    const produto = Produto.inserir(nome, valor, vinculoImagem, idCategoria);
    return await this._repository.create(produto);
  }

  async alterar(id: number, nome: string, valor: number, vinculoImagem: string, idCategoria: number) {
    const produto = Produto.alterar(nome, valor,vinculoImagem, idCategoria, id);
    return await this._repository.update(id, produto);
  }

  async deletar(id:number) {
    return await this._repository.delete(id);
  }

}
