export interface IPessoa {
  mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
  protected _nome: string = "";
  protected _cpf: string = "";
  protected _email: string = "";
  protected _dataNasc: string = "";

  constructor(nome: string, cpf: string, email: string, dataNasc: string) {
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

  public set DataNasc(value: string) {
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
        throw new Error ("CPF contém caractéres inválidos.")
    }

    if(value.length < 11 || value.length > 11) {
        throw new Error("CPF não pode ter menos de 11 dígitos!")
    }
  }

  private _validarDataNasc(value: string | any): void {
    const regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

    //verificar esse regex, errorMessage: value.toLowerCase is not a function no insomnia

     if(!value || !regex.test(value.toLowerCase().trim())) {
        throw new Error("Por favor, envie uma data de nascimento válida!");
     }

     const dataAtualAno = new Date().getFullYear();
     const dataNascAno = new Date(value).getFullYear();

     if (dataAtualAno - dataNascAno < 18) {
        throw new Error ("Pessoas com menos de 18 anos não podem ser cadastradas!")
     }
  }
  
   public mostrarDados(): string {
     console.log(`nome mostrar dados pessoa model: ${this._nome}`);
    return `nome: ${this._nome}, cpf: ${this._cpf} email: ${this._email}`;
  }
}
