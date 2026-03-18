import { RowDataPacket } from "mysql2";
export interface IPedido extends RowDataPacket {
  id?: number;
  idCliente?: number;
  idVendedor?: number;
  valorTotal?: number;
  dataPedido?: Date;
}

export class Pedido {
  private _id?: number;
  private _idCliente!: number;
  private _idVendedor!: number;
  private _valorTotal?: number;

  constructor(idCliente: number, idVendedor: number, valorTotal: number, id?: number) {
    this.IdCliente = idCliente;
    this.IdVendedor = idVendedor;
    this.ValorTotal = valorTotal;
    this._id = id;
  }

  public get Id(): number | undefined {
    return this._id;
  }

  public get IdCliente(): number | undefined {
    return this._idCliente;
  }

  public get IdVendedor(): number | undefined {
    return this._idVendedor;
  }

  public get ValorTotal(): number | undefined {
    return this._valorTotal;
  }

  public set IdCliente(value: number) {
    this._validarId(value);
    this._idCliente = value;
  }

   public set IdVendedor(value: number) {
    this._validarId(value);
    this._idVendedor = value;
  }

  public set Id(value: number) {
    this._id = value;
  }

   public set ValorTotal(value: number) {
    this._valorTotal = value;
  }

  public static inserir(idCliente: number, idVendedor: number, valorTotal: number): Pedido {
    return new Pedido(idCliente, idVendedor, valorTotal);
  }

  public static alterar(idCliente: number, idVendedor: number, valorTotal: number, id: number) {
    return new Pedido(idCliente, idVendedor, valorTotal, id);
  }

  private _validarId(value: number): void {
    if (!value || isNaN(value)) {
      throw new Error("ID deve ser um valor numérico!");
    }
  }
}
