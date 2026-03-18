import { RowDataPacket } from "mysql2";
export interface IItensPedido extends RowDataPacket {
  id?: number;
  idPedido?: number;
  idProduto?: number;
  quantidade?: number;
  valorUnitario?: number;
  subtotalItem?: number;
}

export class ItensPedido {
  private _id?: number;
  private _idPedido!: number;
  private _idProduto!: number;
  private _quantidade!: number;
  private _valorUnitario?: number;
  private _subtotalItem?: number;

  constructor(idPedido: number, idProduto: number, quantidade: number, valorUnitario?: number, subtotalItem?: number, id?: number) {
    this.IdPedido = idPedido;
    this.IdProduto = idProduto;
    this.Quantidade = quantidade;
    this._valorUnitario = valorUnitario;
    this._subtotalItem = subtotalItem;
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

  public get ValorUnitario(): number | undefined {
    return this._valorUnitario;
  }

  public get SubtotalItem(): number | undefined {
    return this._subtotalItem;
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

   public set ValorUnitario(value: number) {
    this._valorUnitario = value;
  }

  public set SubtotalItem(value: number) {
    this._subtotalItem = value;
  }


  public static inserir(idPedido: number, idProduto: number, quantidade: number, valorUnitario: number, subtotalItem: number): ItensPedido {
    return new ItensPedido(idPedido, idProduto, quantidade, valorUnitario, subtotalItem);
  }

  public static alterar(idPedido: number, idProduto: number, quantidade: number, valorUnitario: number, subtotalItem: number, id: number) {
    return new ItensPedido(idPedido, idProduto, quantidade, valorUnitario, subtotalItem, id);
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
