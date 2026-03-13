import { RowDataPacket } from "mysql2";
export interface IProduto extends RowDataPacket {
  id?: number;
  idCategoria?: number;
  nomeProduto?: string;
  valor?: number;
  dataCad?: Date;
}

export class Produto {
  private _id?: number;
  private _idCategoria: number = 0;
  private _nomeProduto: string = "";
  private _valor: number = 0;
  private _dataCad?: Date;

  constructor(nome: string, valor: number, idCategoria: number, id?: number) {
    this.NomeProduto = nome;
    this.ValorProduto = valor;
    this.IdCategoria = idCategoria;
    this._id = id;
  }

  //GETTERS

  public get Id(): number | undefined {
    return this._id;
  }

  public get IdCategoria(): number{
    return this._idCategoria;
  }

  public get NomeProduto(): string {
    return this._nomeProduto;
  }

  public get ValorProduto(): number {
    return this._valor;
  }

  public get DataCad(): Date | undefined {
    return this._dataCad;
  }

  //SETTERS

  public set NomeProduto(value: string){
    this._validarNome(value);
    this._nomeProduto = value;
  }

  public set ValorProduto(value: number) {
    this._validarValor(value);
    this._valor = value
  }

  public set IdCategoria(value: number) {
    this._validarId(value);
    this._idCategoria = value;
  }

  public set Id(value: number) {
    this._id = value;
  }

  //DP => Factory
  public static criar(nome:string, valor:number, idCategoria: number): Produto {
    return new Produto(nome, valor, idCategoria);
  }

  public static editar(nome: string, valor:number, idCategoria: number, id:number ) {
    return new Produto(nome, valor, idCategoria, id);
  }

  private _validarNome(value: string): void {
    if(!value || value.trim().length < 3) {
        throw new Error('Nome do produto deve ter ao menos 3 caracteres');
    }

    if(value.trim().length > 100) {
        throw new Error('Nome do produto deve ter no máximo 100 caracteres.')
    }
  }

  private _validarValor(value:number): void {
    if(!value || isNaN(value)) {
        throw new Error('O valor do produto deve ser um número.');
    }

    if(value <= 0) {
        throw new Error('O valor do produto deve ser um número positivo e/ou maior que 0.');
    }
  }

  private _validarId(value:number): void {
    if(!value) {
       throw new Error('O ID não pode ser vazio');
    }
    if(isNaN(value)) {
        throw new Error('O ID deve ser um número.');
    }
  }


}

