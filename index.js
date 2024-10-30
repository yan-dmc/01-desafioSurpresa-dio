const dadosCadastrados = [];

function salvarDados(event) {
    event.preventDefault() 

    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const level = document.getElementById('level').value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value || "Não especificado";
    const shiny = document.getElementById('shiny').checked ? "Sim" : "Não";
    const HP = document.getElementById('HP').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !especie || !level || !sexo || !HP) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Impede o cadastro
    }

    // Cria um objeto com os dados
    const dados = { nome: nome, especie: especie, level: level, sexo: sexo, shiny: shiny, HP: HP };

    // Adiciona o objeto à lista
    dadosCadastrados.push(dados);

    // Exibe a lista no console (apenas para verificar)
    console.log(dadosCadastrados);

    // Limpa o formulário após o cadastro
    document.getElementById('meuFormulario').reset();
    let textoF = (nome + ' Cadastrado com sucesso!!');
    popUp(textoF);
    menu();
}

function popUp(nome) {
    const popUp = document.querySelector('.popUp');
    const popUpC = document.querySelector('.popUp-content');
    popUpC.innerText = nome;
    popUp.classList.add('popUp-animation');
    popUp.classList.remove('hidden');
    // Aguarda 3 segundos e esconde a pop-up
    setTimeout(() => {
        popUp.classList.remove('popUp-animation');
        popUp.classList.add('hidden');
    }, 3000); // Tempo em milissegundos
}

function menu() {
    const menu = document.querySelector(".menu");
    menu.classList.remove('hidden');

    const cadastro = document.querySelector(".cadastro");
    cadastro.classList.add('hidden');
    
}

function cadastrar() {
    const menu = document.querySelector(".menu");
    menu.classList.add('hidden');

    const cadastro = document.querySelector(".cadastro");
    cadastro.classList.remove('hidden');
    
}

function visualizar() {
    const menu = document.querySelector(".menu");
    menu.classList.add('hidden');

    const visualizo = document.querySelector(".visualizo");
    visualizo.classList.remove('hidden');

    listar();
}

function listar() {
    const listaPkm = document.querySelector(".listaPkm");
    listaPkm.innerHTML = ""; // Limpa a lista antes de preencher

    dadosCadastrados.forEach((pokemon, index) => {
        const listItem = document.createElement("ul");
        listItem.innerHTML = `
            <strong>Nome:</strong> ${pokemon.nome}<br>
            <strong>Espécie:</strong> ${pokemon.especie}<br>
            <strong>Level:</strong> ${pokemon.level}<br>
            <strong>Sexo:</strong> ${pokemon.sexo}<br>
            <strong>Shiny:</strong> ${pokemon.shiny}<br>
            <strong>HP:</strong> ${pokemon.HP}<br><br>
        `;
        listaPkm.appendChild(listItem);
    });
}

function deletar() {
    if (dadosCadastrados.length === 0) {
        popUp('Nenhum pokémon para ser deletado!!');
    } else {
        let pkmdeletado = dadosCadastrados.pop();
        popUp(pkmdeletado.nome + ' deletado com sucesso!!');
        visualizar();
    }
}

document.getElementById('nome').addEventListener('input', function (event) {
    // Permite apenas letras e espaços
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
});

document.getElementById('especie').addEventListener('input', function (event) {
    // Permite apenas letras e espaços
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
});

document.getElementById('level').addEventListener('input', function (event) {
    if (this.value > 100) {
        this.value = 100;} 
    // Permite apenas números
    this.value = this.value.replace(/[^0-9]/g, '');
});


document.getElementById('HP').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9\/]/g, '');
    const hpInput = this.value; // Captura o valor do campo
    let [x, y] = hpInput.split('/').map(Number); // Divide e converte x e y para números

    // Se x não for definido, define como padrão
    if (isNaN(x)) {
        x = 233; // Valor máximo padrão
    }

    // Limita x a no máximo 233
    if (x > 233) {
        x = 233; // Define o valor máximo permitido
    }

    // Valida se y não é maior que x
    if (y > x) {
        y = x; // Ajusta y para não ser maior que x
        this.value = `${x}/${y}`; // Atualiza o valor do campo
        document.getElementById('mensagemErro').innerText = "O HP atual (y) não pode ser maior que o HP máximo (x).";
        return; // Sai da função
    }

    // Atualiza o campo de entrada se não houver barra
    if (!hpInput.includes('/')) {
        this.value = `${x}/1`; // Adiciona o padrão caso não haja barra
    } else {
        // Atualiza o campo caso ambos x e y sejam válidos
        this.value = `${x}/${y}`;
    }

    // Limpa a mensagem de erro se tudo estiver correto
    document.getElementById('mensagemErro').innerText = "";
});
