import { Pessoa } from "./pessoa.model";

export class Cliente extends Pessoa {
  private _id?: number;

  constructor(
    nome: string,
    cpf: string,
    email: string,
    dataNasc: Date,
    id?: number,
  ) {
    super(nome, cpf, email, dataNasc);
    this._id = id;
  }

  public get Id(): number | undefined {
    return this._id;
  }

  public set Id(value: number) {
    this._id = value;
  }

   public static inserir(
    nome: string,
    cpf: string,
    email: string,
    dataNasc: Date,
  ): Cliente {
    return new Cliente(nome, cpf, email, dataNasc);
  }

  public static alterar(
    nome: string,
    cpf: string,
    email: string,
    dataNasc: Date,
    id: number,
  ): Cliente {
    return new Cliente(nome, cpf, email, dataNasc, id);
  }

  public mostrarDados(): string {
     return `Nome: ${this._nome}, CPF: ${this._cpf} E-mail: ${this._email}, Data de Nascimento: ${this._dataNasc}`;;
  }

}