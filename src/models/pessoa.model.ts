export interface IPessoa {
  mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
  protected _nome: string = "";
  protected _cpf: string = "";
  protected _email: string = "";
  protected _dataNasc!: Date;

  constructor(nome: string, cpf: string, email: string, dataNasc: Date) {
    this.Nome = nome;
    this.Cpf = cpf;
    this.Email = email;
    this.DataNasc = dataNasc;
  }

  //getters
  public get Nome(): string {
    return this._nome;
  }

  public get Cpf(): string {
    return this._cpf;
  }

  public get Email() {
    return this._email;
  }

  public get DataNasc() {
    return this._dataNasc;
  }

  //setters
  public set Nome(value: string) {
    this._validarNome(value);
    this._nome = value;
  }

  public set Cpf(value: string) {
    this._validarCpf(value);
    this._cpf = value;
  }

  public set Email(value: string) {
    this._validarEmail(value);
    this._email = value;
  }

  public set DataNasc(value: Date) {
    this._validarDataNasc(value);
    this._dataNasc = value;
  }

  private _validarNome(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error(`Nome deve ter ao menos 3 carácteres`);
    }

    if (!isNaN(Number(value))) {
      throw new Error("Nome só pode ter caractéres alfabéticos.");
    }

    if (value.trim().length > 100) {
      throw new Error("Nome deve ter no máximo 100 caracteres.");
    }
  }

  private _validarEmail(value: string): void {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || !regex.test(value.toLowerCase().trim())) {
      throw new Error("E-mail inválido.");
    }

    if (value.trim().length > 100) {
      throw new Error("E-mail deve ter no máximo 100 caracteres.");
    }
  }

  private _validarCpf(value: string): void {
    if (!value) {
      throw new Error("Por favor, envie um CPF!");
    }

    if (isNaN(Number(value))) {
      throw new Error("CPF contém caractéres inválidos.");
    }

    if (value.length < 11 || value.length > 11) {
      throw new Error("CPF não pode ter menos de 11 dígitos!");
    }
  }

  private _validarDataNasc(value: Date): void {
    if (!value) {
      throw new Error("Por favor, envie uma data de nascimento!");
     
    }
    const dataTratada = new Date(value);

    if (isNaN(dataTratada.getTime())) {
      throw new Error("A data de nascimento informada não é válida! Por favor, envie a data no formato YYYY-MM-DD");
    }

    const dataAtualAno = new Date().getFullYear();
    const dataNascAno = dataTratada.getFullYear();

    console.log(`data atual ano: ${dataAtualAno}, data nascimento ano: ${dataNascAno}`)
    if (dataAtualAno - dataNascAno < 18) {
      throw new Error(
        "Pessoas com menos de 18 anos não podem ser cadastradas!",
      );
    }
  }

  public mostrarDados(): string {
    return `Nome: ${this._nome}, CPF: ${this._cpf} E-mail: ${this._email}, Data de Nascimento: ${this._dataNasc}`;
  }
}
