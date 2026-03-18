import { Pessoa } from "./pessoa.model";

export class Vendedor extends Pessoa {
  private _id?: number;
  private _dataAdmissao!: Date;
  private _cargo: string = "";

  constructor(
    nome: string,
    cpf: string,
    email: string,
    cargo: string,
    dataNasc: Date,
    dataAdmissao: Date,
    id?: number,
  ) {
    super(nome, cpf, email, dataNasc);
    this.DataAdmissao = dataAdmissao;
    this.Cargo = cargo;
    this._id = id;
  }

  public get Id(): number | undefined {
    return this._id;
  }

  public get DataAdmissao(): Date {
    return this._dataAdmissao;
  }

  public get Cargo(): string {
    return this._cargo;
  }

  public set Id(value: number) {
    this._id = value;
  }

  public set DataAdmissao(value: Date) {
    this._validarDataAdm(value);
    this._dataAdmissao = value;
  }

  public set Cargo(value: string) {
    this._validarCargo(value);
    this._cargo = value;
  }

  public static inserir(
    nome: string,
    cpf: string,
    email: string,
    cargo: string,
    dataNasc: Date,
    dataAdmissao: Date,
  ): Vendedor {
    return new Vendedor(nome, cpf, email, cargo, dataNasc, dataAdmissao);
  }

  public static alterar(
    nome: string,
    cpf: string,
    email: string,
    cargo: string,
    dataNasc: Date,
    dataAdmissao: Date,
    id: number,
  ): Vendedor {
    return new Vendedor(nome, cpf, email, cargo, dataNasc, dataAdmissao, id);
  }

  public mostrarDados(): string {
    return `ID: ${this._id} Nome: ${this._nome}, CPF: ${this._cpf} E-mail: ${this._email}, Cargo: ${this._cargo} Data de Nascimento: ${this._dataNasc}, Data de Admissão: ${this._dataAdmissao}`;
  }

  private _validarDataAdm(value: Date): void {
    if (!value) {
      throw new Error("Por favor, envie uma data de admissão válida!");
    }
    const dataAdmAno = new Date(value).getFullYear();

    if (dataAdmAno < 2017) {
      throw new Error(
        "Não se deve cadastrar um usuário antes da fundação da empresa! (2017)",
      );
    }
  }

  private _validarCargo(value: string): void {
    if (!value) {
      throw new Error("Por favor, envie um cargo.");
    }

    if (value.trim().length < 3) {
      throw new Error("O cargo deve ter ao menos 3 caractéres");
    }

    if (!value || value.trim().length > 100) {
      throw new Error("O cargo não deve exceder 100 caractéres");
    }
  }
}
