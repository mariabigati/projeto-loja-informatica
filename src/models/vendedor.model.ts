import { Pessoa } from "./pessoa.model";

export class Vendedor extends Pessoa {
  private _id?: number;
  private _dataAdmissao: string = "";
  private _cargo: string = "";

  constructor(
    nome: string,
    cpf: string,
    email: string,
    cargo: string,
    dataNasc: string,
    dataAdmissao: string,
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

  public get DataAdmissao(): string {
    return this._dataAdmissao;
  }

  public get Cargo(): string {
    return this._cargo;
  }

  public set Id(value: number) {
    this._id = value;
  }

  public set DataAdmissao(value: string) {
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
    dataNasc: string,
    dataAdmissao: string
  ): Vendedor {
    return new Vendedor(nome, cpf, email, cargo, dataNasc, dataAdmissao);
  }

  public static alterar(
    nome: string,
    cpf: string,
    email: string,
    cargo: string, 
    dataNasc: string,
    dataAdmissao: string,
    id: number,
  ): Vendedor {
    return new Vendedor(nome, cpf, email, cargo, dataNasc, dataAdmissao, id);
  }

  private _validarDataAdm(value: string): void {
    const regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

    if (!value || !regex.test(value.toLowerCase().trim())) {
      throw new Error("Por favor, envie uma data de admissão válida!");
    }
    const dataAdmAno = new Date(value).getFullYear();

    if (dataAdmAno < 2017) {
      throw new Error(
        "Não se deve cadastrar um usuário antes da fundação da empresa!",
      );
    }
  }

  private _validarCargo(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error("O cargo deve ter ao menos 3 caractéres");
    }

    if (!value || value.trim().length > 100) {
      throw new Error("O cargo não deve exceder 100 caractéres");
    }
  }
}
