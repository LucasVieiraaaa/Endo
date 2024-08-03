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