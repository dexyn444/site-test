const slides = document.querySelectorAll('.slide');
const agendarButton = document.getElementById('agendar');
let selectedTime = null;

// Adiciona o evento de clique em cada horário
slides.forEach(slide => {
    slide.addEventListener('click', function() {
        // Remove a seleção de qualquer outro horário
        slides.forEach(s => s.classList.remove('selected'));

        // Marca o horário selecionado
        this.classList.add('selected');
        selectedTime = this.getAttribute('data-time');
        
        // Habilita o botão "Agendar" se um horário for selecionado
        agendarButton.disabled = false;
    });
});

// Evento do botão "Agendar"
agendarButton.addEventListener('click', function() {
    if (selectedTime) {
        // Redireciona para a tela de confirmação passando o horário agendado na URL
        window.location.href = `confirmação.html?time=${selectedTime}`;
    }
});
