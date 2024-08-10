function submitForm() {
    const form = document.getElementById('contactForm');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const choice = document.getElementById('choice').value;

    let isValid = true;

    function validateField(id, value) {
        const field = document.getElementById(id);
        if (value.trim().length === 0) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            isValid = false;
            document.getElementById('getMengasem').textContent = 'Formulário inválido ❌';
            document.getElementById('getMengasem').classList.add('invalid');
            document.getElementById('getMengasem').classList.remove('valid');
        } else {
            field.classList.remove('invalid');
            field.classList.add('valid');
        }
    }

    // Valida todos os campos
    validateField('name', name);
    validateField('email', email);
    validateField('phone', phone);
    validateField('choice', choice);

    const feedbackElement = document.getElementById('getMengasem');

    if (isValid) {
        const formData = {
            name: name,
            email: email,
            phone: phone,
            choice: choice
        };

        console.log('Formulário enviado:', formData);

        form.reset();
        feedbackElement.textContent = 'Formulário enviado com sucesso ✔️';
        feedbackElement.classList.add('valid');
        feedbackElement.classList.remove('invalid');
    } else {
        console.log('Por favor, preencha todos os campos.');
    }
}


//Function connected to MongoBD
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

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
            document.getElementById('getMengasem').textContent = result.message;
            document.getElementById('getMengasem').style.color = 'green';
        } else {
            document.getElementById('getMengasem').textContent = result.error;
            document.getElementById('getMengasem').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('getMengasem').textContent = 'Erro ao enviar o formulário.';
        document.getElementById('getMengasem').style.color = 'red';
    }
});