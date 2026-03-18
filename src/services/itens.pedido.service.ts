import { ItensPedidoRepository } from "../repository/itens.pedido.repository";
import { ItensPedido } from "../models/itens.pedido.model";

export class ItensPedidoService {
  constructor(private _repository = new ItensPedidoRepository()) {}

  async selecionarTodos() {
    return await this._repository.findAll();
  }

  async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.select(id);
  }

  async criar(idPedido: number, idProduto: number, quantidade: number, valorUnitario: number, subtotalItem: number) {

    const itensPedido = ItensPedido.inserir(idPedido, idProduto, quantidade, valorUnitario, subtotalItem);
    console.log(itensPedido)
    return await this._repository.create(itensPedido);
  }

  async editar(id: number, idPedido: number, idProduto: number, quantidade: number, valorUnitario: number, subtotalItem: number) {
    const itensPedido = ItensPedido.alterar(idPedido, idProduto, quantidade, valorUnitario, subtotalItem, id);
    return await this._repository.update(id, itensPedido);
  }


  async deletar(id:number) {
    return await this._repository.delete(id);
  }

}
