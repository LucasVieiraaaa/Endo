document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const choice = document.getElementById('choice').value;
    const terms = document.getElementById('terms').checked;
    const feedbackElement = document.getElementById('getMengasem');

    let isValid = true;

    function validateField(id, value, regex) {
        const field = document.getElementById(id);
        if (!regex.test(value.trim())) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            isValid = false;
            feedbackElement.textContent = 'Formulário inválido ❌';
            feedbackElement.classList.add('invalid');
            feedbackElement.classList.remove('valid');
        } else {
            field.classList.remove('invalid');
            field.classList.add('valid');
        }
    }

    // Regex para validação
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{1,100}$/; // Letras e espaços, até 100 caracteres
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // E-mail básico
    const phoneRegex = /^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/; // Formatos variados de telefone brasileiro

    // Valida todos os campos
    validateField('name', name, nameRegex);
    validateField('email', email, emailRegex);
    validateField('phone', phone, phoneRegex);

    // Valida o checkbox
    if (!terms) {
        isValid = false;
        feedbackElement.textContent = 'Você deve concordar com os termos da política de privacidade ❌';
        feedbackElement.style.color = 'red';
        feedbackElement.classList.add('invalid');
        feedbackElement.classList.remove('valid');
    }

    if (isValid) {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                feedbackElement.textContent = result.message || 'Formulário enviado com sucesso ✔️';
                feedbackElement.style.color = 'green';
            } else {
                feedbackElement.textContent = result.error || 'Erro ao enviar o formulário.';
                feedbackElement.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            feedbackElement.textContent = 'Erro ao enviar o formulário.';
            feedbackElement.style.color = 'red';
        }

        form.reset();
    } else {
        console.log('Por favor, preencha todos os campos e aceite os termos.');
    }
});
