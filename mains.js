document.addEventListener('DOMContentLoaded', function () {
  //inputs
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  //errores
  const errorEmail = document.getElementById("errorEmail");
  const errorPassword = document.getElementById("errorPassword");
  const errorConfirmPassword = document.getElementById("errorConfirmPassword");

  //show-hide
  const showHideButton = document.getElementById("show-hide");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInput.addEventListener("blur", function () {
    validateEmail();
  });

  emailInput.addEventListener("change", function () {
    clearError(errorEmail);
  });

  passwordInput.addEventListener("change", function () {
    clearError(errorPassword);
  });

  confirmPasswordInput.addEventListener("change", function () {
    clearError(errorConfirmPassword);
  });

  //SHOW - HIDE password
  showHideButton.addEventListener("click", function () {
    if (passwordInput.type == "password") {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  });

  //validar todo el formulario
  function validateForm() {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const passwordMatch = validatePasswordMatch();

    if (isValidEmail && isValidPassword && passwordMatch) {
      saveToLocalStorage();
      alert("Has ingresado con éxito!");
    }
  }

  //validar email
  function validateEmail() {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailValue)) {
      showError(errorEmail, "Ingresa un email valido!");
      return false;
    }
    return true;
  }

  //Validar password
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 6) {
      showError(
        errorPassword,
        "Ingresa una contraseña de al menos 6 caracteres"
      );
      return false;
    }
    return true;
  }
  //validar si son iguales
  function validatePasswordMatch() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (passwordValue !== confirmPasswordValue) {
      showError(errorConfirmPassword, "Las contraseñas no coinciden");
      return false;
    }
    return true;
  }

  //function para mostrar o ocultar errores

  function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  }

  function clearError(errorElement) {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  }

  //funcion para guardar email en local storage
  function saveToLocalStorage() {
    const emailValue = emailInput.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      email: emailInput.value,
      password: passwordInput.value,
    };
  }

});
