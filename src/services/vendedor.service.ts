import { VendedorRepository } from "../repository/vendedor.repository";
import { Vendedor } from "../models/vendedor.model";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) {}


async selecionarTodos() {
    return await this._repository.findAll();
}

async selecionarUm(id:number) {
    return await this._repository.findOne(id);
}

async inserir(nome: string, cpf: string, email: string, cargo: string, dataNasc: Date, dataAdmissao: Date) {
    const vendedor = Vendedor.inserir(nome, cpf, email, cargo, dataNasc, dataAdmissao);
    return await this._repository.create(vendedor);
}

async alterar(id: number, nome: string, cpf: string, email: string, cargo: string, dataNasc: Date, dataAdmissao: Date){
    const vendedor = Vendedor.alterar(nome, cpf, email, cargo, dataNasc, dataAdmissao, id);
    return await this._repository.update(id, vendedor);
}

async deletar(id: number) {
    return await this._repository.delete(id);
}
}