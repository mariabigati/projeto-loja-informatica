import { PedidoRepository } from "../repository/pedido.repository";
import { Pedido } from "../models/pedido.model";

export class PedidoService {
  constructor(private _repository = new PedidoRepository()) {}

  async selecionarTodos() {
    return await this._repository.findAll();
  }

  async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.select(id);
  }


  async criar(idCliente: number, idVendedor: number) {
    const pedido = Pedido.inserir(idCliente, idVendedor);
    return await this._repository.create(pedido);
  }

  async editar(id: number, idCliente: number, idVendedor: number) {
    const pedido = Pedido.alterar(idCliente, idVendedor, id);
    return await this._repository.update(id, pedido);
  }

  async deletar(id:number) {
    return await this._repository.delete(id);
  }

}
