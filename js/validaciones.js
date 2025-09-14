// validaciones.js

function validarCampoLongitud(input, min, max, mensaje) {
  const valor = input.value.trim();
  const feedback = input.nextElementSibling;

  if (valor.length < min || valor.length > max) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = mensaje;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    feedback.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");

  nombre.addEventListener("input", () => {
    validarCampoLongitud(
      nombre,
      2,
      40,
      "El nombre debe tener entre 2 y 40 caracteres."
    );
  });

  apellido.addEventListener("input", () => {
    validarCampoLongitud(
      apellido,
      2,
      40,
      "El apellido debe tener entre 2 y 40 caracteres."
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const rutInput = document.getElementById("rut");
  const rutError = document.getElementById("rutError");

  rutInput.addEventListener("input", () => {
    let valor = rutInput.value
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\s+/g, "")
      .toUpperCase();

    // Solo números y K
    valor = valor.replace(/[^0-9K]/g, "");

    // Formato con puntos y guion
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);

    if (cuerpo.length > 0) {
      let cuerpoFormateado = "";
      while (cuerpo.length > 3) {
        cuerpoFormateado = "." + cuerpo.slice(-3) + cuerpoFormateado;
        cuerpo = cuerpo.slice(0, -3);
      }
      cuerpoFormateado = cuerpo + cuerpoFormateado;
      rutInput.value = cuerpoFormateado + "-" + dv;
    } else {
      rutInput.value = dv;
    }

    // Validación del dígito verificador
    if (valor.length > 1) {
      if (validarRut(valor)) {
        rutInput.classList.remove("is-invalid");
        rutInput.classList.add("is-valid");
        rutError.textContent = "";
      } else {
        rutInput.classList.remove("is-valid");
        rutInput.classList.add("is-invalid");
        rutError.textContent = "RUT inválido";
      }
    } else {
      rutInput.classList.remove("is-valid", "is-invalid");
      rutError.textContent = "";
    }
  });
});

// Función para validar RUT chileno con módulo 11
function validarRut(rut) {
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvEsperado;
}

document.addEventListener("DOMContentLoaded", () => {
  const telefonoInput = document.getElementById("telefono");
  const telefonoError = document.getElementById("telefonoError");

  telefonoInput.addEventListener("input", () => {
    let valor = telefonoInput.value.replace(/\D/g, ""); // solo dígitos

    // Forzar prefijo +569
    if (!valor.startsWith("569")) {
      valor = "569" + valor;
    }

    // Limitar a 11 dígitos totales (+569 + 8 números)
    valor = valor.slice(0, 11);

    telefonoInput.value = "+" + valor;

    // Validación
    if (/^\+569\d{8}$/.test(telefonoInput.value)) {
      telefonoInput.classList.remove("is-invalid");
      telefonoInput.classList.add("is-valid");
      telefonoError.textContent = "";
    } else {
      telefonoInput.classList.remove("is-valid");
      telefonoInput.classList.add("is-invalid");
      telefonoError.textContent =
        "Ingresa un número válido con formato +569XXXXXXXX";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const correoInput = document.getElementById("correo");
  const correoError = document.getElementById("correoError");

  correoInput.addEventListener("input", () => {
    const valor = correoInput.value.trim();
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    // Verifica formato general de correo
    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

    // Verifica si termina con un dominio permitido
    const dominioValido = dominiosPermitidos.some((d) => valor.endsWith(d));

    if (formatoValido && dominioValido) {
      correoInput.classList.remove("is-invalid");
      correoInput.classList.add("is-valid");
      correoError.textContent = "";
    } else {
      correoInput.classList.remove("is-valid");
      correoInput.classList.add("is-invalid");
      correoError.textContent =
        "Ingresa un correo válido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");

  passwordInput.addEventListener("input", () => {
    const valor = passwordInput.value;

    const esValida = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(valor);

    if (esValida) {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
      passwordError.textContent = "";
    } else {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
      passwordError.textContent =
        "Debe tener al menos 8 caracteres, una mayúscula y un número.";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nacimientoInput = document.getElementById("nacimiento");
  const nacimientoError = document.getElementById("nacimientoError");

  nacimientoInput.addEventListener("input", () => {
    const fechaIngresada = new Date(nacimientoInput.value);
    const hoy = new Date();
    const edadMinima = 13;

    const fechaLimite = new Date(
      hoy.getFullYear() - edadMinima,
      hoy.getMonth(),
      hoy.getDate()
    );

    if (fechaIngresada <= fechaLimite) {
      nacimientoInput.classList.remove("is-invalid");
      nacimientoInput.classList.add("is-valid");
      nacimientoError.textContent = "";
    } else {
      nacimientoInput.classList.remove("is-valid");
      nacimientoInput.classList.add("is-invalid");
      nacimientoError.textContent =
        "Debes tener al menos 13 años para registrarte.";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("registroForm");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío automático

    // Verifica si todos los campos tienen la clase 'is-valid'
    const camposValidos = formulario.querySelectorAll(".form-control.is-valid");
    const totalCampos = formulario.querySelectorAll(".form-control").length;

    if (camposValidos.length === totalCampos) {
      const nuevoUsuario = {
        correo: document.getElementById("correo").value.trim(),
        password: document.getElementById("password").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        rut: document.getElementById("rut").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        nacimiento: document.getElementById("nacimiento").value.trim(),
      };

      // Guarda en localStorage como JSON
      localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

      alert("¡Registro exitoso!");
      window.location.href = "../index.html";
    } else {
      // Hay campos inválidos
      alert(
        "Por favor, completa correctamente todos los campos antes de continuar."
      );
    }
  });
});


loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const correoIngresado = loginCorreo.value.trim();
  const passwordIngresada = loginPassword.value.trim();

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (
    usuarioGuardado &&
    usuarioGuardado.correo === correoIngresado &&
    usuarioGuardado.password === passwordIngresada
  ) {
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "../index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});
