import readline from 'readline';
import { adicionarProduto, listarItens, calcularValorTotal, calcularMediaDeValor, calcularQuantidadeTotal, removerProduto } from './controller/controleEstoque';
import { Data } from './model/readCSV';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("Escolha uma opção:");
    console.log("1. Adicionar Produto");
    console.log("2. Listar Itens");
    console.log("3. Calcular Valor Total");
    console.log("4. Calcular Média de Valor");
    console.log("5. Calcular Quantidade Total");
    console.log("6. Remover Produto");
    console.log("0. Sair");
}

async function main() {
    while (true) {
        menu();

        const option = await askQuestion("Opção: ");

        switch (option) {
            case '1':
                const data: Data = {
                    id: 0,
                    title: "",
                    value: 0
                };

                data.id = parseInt(await askQuestion("ID do produto: "));
                data.title = await askQuestion("Título do produto: ");
                data.value = parseFloat(await askQuestion("Valor do produto: "));

                await adicionarProduto(data);                
                break;
            case '2':
                await listarItens();
                break;
            case '3':
                await calcularValorTotal();
                break;
            case '4':
                await calcularMediaDeValor();
                break;
            case '5':
                await calcularQuantidadeTotal();
                break;
            case '6':
                const id = parseInt(await askQuestion("ID do produto: "));
                await removerProduto(id);
                break;
            case '0':
                rl.close();
                return;
            default:
                console.log("Opção inválida!");
        }
    }
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

main();