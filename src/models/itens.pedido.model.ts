import { RowDataPacket } from "mysql2";
export interface IItensPedido extends RowDataPacket {
  id?: number;
  idPedido?: number;
  quantidade?: number;
}

export class ItensPedido {
  private _id?: number;
  private _idPedido!: number;
  private _idProduto!: number;
  private _quantidade!: number;

  constructor(idPedido: number, idProduto: number, quantidade: number, id?: number) {
    this.IdPedido = idPedido;
    this.IdProduto = idProduto;
    this.Quantidade = quantidade;
    this._id = id;
  }

  public get Id(): number | undefined {
    return this._id;
  }

  public get IdPedido(): number | undefined {
    return this._idPedido;
  }

  public get IdProduto(): number | undefined {
    return this._idProduto;
  }

  public get Quantidade(): number | undefined {
    return this._quantidade;
  }


  public set IdPedido(value: number) {
    this._validarId(value);
    this._idPedido = value;
  }

  public set IdProduto(value: number) {
    this._validarId(value);
    this._idProduto = value;
  }

   public set Quantidade(value: number) {
    this._validarQuantidade(value);
    this._quantidade = value;
  }

  public set Id(value: number) {
    this._id = value;
  }

  public static inserir(idPedido: number, idProduto: number, quantidade: number): ItensPedido {
    return new ItensPedido(idPedido, idProduto, quantidade);
  }

  public static alterar(idPedido: number, idProduto: number, quantidade: number, id: number) {
    return new ItensPedido(idPedido, idProduto, quantidade, id);
  }

  private _validarId(value: number): void {
    if (!value || isNaN(value)) {
      throw new Error("ID deve ser um valor numérico!");
    }
  }

  private _validarQuantidade(value: number): void {
    if (!value || isNaN(value)) {
        throw new Error("ID deve ser um valor numérico!");
    }

    if(value < 1) {
        throw new Error("Quantidade deve ser igual ou superior à um!");
    }
  }
}
