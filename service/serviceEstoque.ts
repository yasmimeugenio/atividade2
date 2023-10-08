import readCSV from '../model/readCSV'
import { Data } from '../model/data.interface'
import writeCSV from '../model/writeCSV'
import fs from 'fs'

const filePath = './model/estoque.csv'

class estoqueService {

    async criar(data: Data) {
        if (!data || data.id == null || data.value == null) {
            throw new Error("Os dados são inválidos");
        }
        if (isNaN(data.id) || data.id < 0) {
            throw new Error("O ID não é um número válido ou é negativo");
        }
    
        // Verificar se já existe um produto com o mesmo ID
        const produtos = await readCSV(filePath);
        const verify = produtos.find(p => p.id == data.id);
        if (verify) {
            throw new Error("Já existe um produto com este ID");
        }

        for (const item of produtos) {
            if (item.id == data.id) {
                throw new Error("Já existe um produto com este ID");
            }
        }

        await writeCSV(filePath, [data]);
    }

    async removerProduto(id: number) {
        const produtos = await readCSV(filePath);
        const produtoIndex = produtos.findIndex((produto) => produto.id == id);

        if (produtoIndex === -1) {
            throw new Error(`Não foi encontrado um produto com o ID ${id}`);
        }

        // Remover o produto do array
        produtos.splice(produtoIndex, 1);

        fs.writeFileSync(filePath, '');
        fs.appendFileSync(filePath, 'id,title,value\n');

        // Reescrever o arquivo CSV com os produtos atualizados
        await writeCSV(filePath, produtos);
    }

    async listarItens() {
        return await readCSV(filePath);
    }

    async calcularValorTotal() {
        const data = await this.listarItens();
        if (data.length === 0) {
            return 0;
        }
        let total = 0;
    
        for (const item of data) {
            console.log(item.value);
            if (!isNaN(item.value)) {
                total += +item.value;
            }
        }
        return total;
    }
    
    async calcularMediaDeValor() {
        const data = await this.listarItens();
        if (data.length === 0) {
            return 0;
        }
        const total = await this.calcularValorTotal();
        return (total / data.length);
    }

    async calcularQuantidadeTotal() {
        const data = await this.listarItens();
        return data.length;
    }
}

export default new estoqueService()