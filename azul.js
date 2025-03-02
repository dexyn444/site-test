function toggleMenu() {
    let menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function mostrarCadastro() {
    esconderTodos();
    document.getElementById('cadastro').classList.remove('hidden');
}

function mostrarLogin() {
    esconderTodos();
    document.getElementById('login').classList.remove('hidden');
}

function mostrarPrecos() {
    esconderTodos();
    document.getElementById('precos').classList.remove('hidden');
}

function mostrarAgenda() {
    esconderTodos();
    document.getElementById('agenda').classList.remove('hidden');
}

function esconderTodos() {
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('precos').classList.add('hidden');
    document.getElementById('agenda').classList.add('hidden');
}

function cadastrar() {
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    if (nome === "" || email === "" || senha === "") {
        alert("Por favor, preencha todos os campos antes de cadastrar.");
        return;
    }

    // Salva os dados no localStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("Cadastro realizado com sucesso! Faça o login agora.");
    mostrarLogin();
}

function login() {
    let emailDigitado = document.getElementById("loginEmail").value.trim();
    let senhaDigitada = document.getElementById("loginSenha").value.trim();

    // Recupera os dados cadastrados
    let emailCadastrado = localStorage.getItem("email");
    let senhaCadastrada = localStorage.getItem("senha");

    if (emailDigitado === "" || senhaDigitada === "") {
        alert("Por favor, preencha todos os campos para fazer login.");
        return;
    }

    if (emailDigitado === emailCadastrado && senhaDigitada === senhaCadastrada) {
        alert("Login realizado com sucesso! Redirecionando para agendamento.");
        mostrarAgenda();
    } else {
        alert("Email ou senha incorretos! Tente novamente.");
    }
}
function agendarHorario() {
    let telefone = document.getElementById("telefone").value.trim();
    let data = document.getElementById("dataAgendamento").value;
    let hora = document.getElementById("horaAgendamento").value;

    if (!telefone || !data || !hora) {
        alert("Preencha todos os campos!");
        return;
    }

    // Recupera o e-mail cadastrado no localStorage
    let emailCliente = localStorage.getItem("email");

    if (!emailCliente) {
        alert("Erro: Nenhum e-mail encontrado. Faça login novamente.");
        return;
    }

    // Enviar e-mail pelo EmailJS
    let templateParams = {
        to_email: emailCliente,
        message: `Olá! Seu horário foi agendado na Barbearia. 📅 Data: ${data} ⏰ Hora: ${hora}. Obrigado! ✂️💈`
    };

    emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", templateParams)
        .then(function(response) {
            alert("Horário agendado com sucesso! Você receberá um e-mail de confirmação.");
        }, function(error) {
            alert("Erro ao enviar e-mail: " + JSON.stringify(error));
        });

    // Gerar mensagem para o WhatsApp
    let mensagemWhatsApp = `Olá! Seu horário foi agendado na Barbearia. 📅 Data: ${data} ⏰ Hora: ${hora}. Obrigado! ✂️💈`;
    let linkWhatsApp = `https://wa.me/5516974077006?text=${encodeURIComponent(mensagemWhatsApp)}`;

    window.open(linkWhatsApp, "_blank");
}