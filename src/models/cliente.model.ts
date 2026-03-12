import { Pessoa } from "./pessoa.model";

export class Cliente extends Pessoa {
  private _id?: number;

  constructor(
    nome: string,
    cpf: string,
    email: string,
    dataNasc: string,
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
    dataNasc: string,
  ): Cliente {
    return new Cliente(nome, cpf, email, dataNasc);
  }

  public static alterar(
    nome: string,
    cpf: string,
    email: string,
    dataNasc: string,
    id: number,
  ): Cliente {
    return new Cliente(nome, cpf, email, dataNasc, id);
  }

}