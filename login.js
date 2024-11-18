// Função para mostrar ou esconder páginas
function showPage(pageId) {
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

// Validação de e-mail (exemplo)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validação de senha
function validatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  document.getElementById('lengthCheck').classList.toggle('valid', hasLength);
  document.getElementById('upperCheck').classList.toggle('valid', hasUpper);
  document.getElementById('numberCheck').classList.toggle('valid', hasNumber);
  document.getElementById('specialCheck').classList.toggle('valid', hasSpecial);

  return hasLength && hasUpper && hasNumber && hasSpecial;
}

// Evento para login (com validação)
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio do formulário padrão

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Validação do formulário
  if (email && password) {
    if (validateEmail(email)) {
      // Se a validação for bem-sucedida, redireciona para home.html
      window.location.href = 'home.html';
    } else {
      alert('Email inválido');
    }
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

// Evento para recuperação de senha
document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('recoveryEmail').value;
  const errorElement = document.getElementById('recoveryEmailError');
  const successElement = document.getElementById('recoverySuccess');

  if (!validateEmail(email)) {
    errorElement.style.display = 'block';
    successElement.style.display = 'none';
    return;
  }

  errorElement.style.display = 'none';
  successElement.style.display = 'block';

  setTimeout(() => {
    showPage('loginPage');
  }, 2000);
});

// Evento para cadastro de usuário
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const emailErrorElement = document.getElementById('emailError');
  const successElement = document.getElementById('registerSuccess');
  const password = document.getElementById('password').value;
  const passwordErrorElement = document.getElementById('passwordError');
  const confirmPassword = document.getElementById('confirmPassword').value;

  let hasError = false;

  // Verificando se o nome tem pelo menos 3 caracteres
  if (name.length < 3) {
    document.getElementById('nameError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('nameError').style.display = 'none';
  }

  // Verificando e-mail
  if (!validateEmail(email)) {
    emailErrorElement.style.display = 'block';
    successElement.style.display = 'none';
    hasError = true;
  } else {
    emailErrorElement.style.display = 'none';
  }

  // Verificando se as senhas coincidem
  if (confirmPassword !== password) {
    passwordErrorElement.style.display = 'block';
    successElement.style.display = 'none';
    hasError = true;
  } else {
    passwordErrorElement.style.display = 'none';
  }

  // Validando a senha
  if (!validatePassword(password)) {
    hasError = true;
  }

  // Se não houver erro, mostrar sucesso e redirecionar
  if (!hasError) {
    successElement.style.display = 'block';
    
    // Espera 2 segundos antes de redirecionar para home.html
    setTimeout(() => {
        window.location.href = 'home.html'; // Redireciona para a página home.html
    }, 2000);
}

});