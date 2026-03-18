import { RowDataPacket } from "mysql2";
export interface IPedido extends RowDataPacket {
  id?: number;
  idCliente?: number;
  idVendedor?: number;
  dataPedido?: Date;
}

export class Pedido {
  private _id?: number;
  private _idCliente!: number;
  private _idVendedor!: number;

  constructor(idCliente: number, idVendedor: number, id?: number) {
    this.IdCliente = idCliente;
    this.IdVendedor = idVendedor;
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

  public static inserir(idCliente: number, idVendedor: number): Pedido {
    return new Pedido(idCliente, idVendedor);
  }

  public static alterar(idCliente: number, idVendedor: number, id: number) {
    return new Pedido(idCliente, idVendedor, id);
  }

  private _validarId(value: number): void {
    if (!value || isNaN(value)) {
      throw new Error("ID deve ser um valor numérico!");
    }
  }
}
