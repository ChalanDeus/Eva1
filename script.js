let intervalo;
const tituloOriginal = document.title

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        let mensaje = [
            "❤️ Aún sigo aquí...",
            "😈 No te olvides de mí!",
            "🔥 ¿Te vas a perder la oferta?"
        ];
        let posicion = 0;
        intervalo = setInterval(function() {
            document.title = mensaje[posicion];
            posicion++;
            if (posicion >= mensaje.length) {
                posicion = 0;
            }
        }, 2000);
    } else {
        clearInterval(intervalo);
        document.title = tituloOriginal;
    }
});

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {

    formRegistro.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const password = document.getElementById("password");
        const confirmarPassword = document.getElementById("confirmarPassword");

        const errorNombre = document.getElementById("errorNombre");
        const errorCorreo = document.getElementById("errorCorreo");
        const errorPassword = document.getElementById("errorPassword");
        const errorConfirmarPassword = document.getElementById("errorConfirmarPassword");

        let formularioValido = true;

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorPassword.textContent = "";
        errorConfirmarPassword.textContent = "";

        if (nombre.value.trim() === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            formularioValido = false;
        }

        if (correo.value.trim() === "") {
            errorCorreo.textContent = "El correo es obligatorio.";
            formularioValido = false;

        } else if (!correo.value.includes("@")) {
            errorCorreo.textContent = "Ingrese un correo válido.";
            formularioValido = false;
        }

        if (password.value.length < 6) {
            errorPassword.textContent =
                "La contraseña debe tener al menos 6 caracteres.";
            formularioValido = false;
        }

        if (confirmarPassword.value !== password.value) {
            errorConfirmarPassword.textContent =
                "Las contraseñas no coinciden.";
            formularioValido = false;
        }

        if (formularioValido) {
            mostrarMensajeCarrito("Inicio de sesión correcto");;
            formRegistro.reset();
        }
    });
}

const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const correoLogin = document.getElementById("correoLogin");

        const passwordLogin =
            document.getElementById("passwordLogin");

        const errorCorreoLogin =
            document.getElementById("errorCorreoLogin");

        const errorPasswordLogin =
            document.getElementById("errorPasswordLogin");

        let loginValido = true;

        errorCorreoLogin.textContent = "";
        errorPasswordLogin.textContent = "";

        if (correoLogin.value.trim() === "") {
            errorCorreoLogin.textContent =
                "El correo es obligatorio.";
            loginValido = false;

        } else if (!correoLogin.value.includes("@")) {
            errorCorreoLogin.textContent =
                "Ingrese un correo válido.";
            loginValido = false;
        }

        if (passwordLogin.value.trim() === "") {
            errorPasswordLogin.textContent =
                "La contraseña es obligatoria.";
            loginValido = false;
        }

        if (loginValido) {
            mostrarMensajeCarrito("Inicio de sesión correcto");
            formLogin.reset();
        }
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botonesCarrito =
    document.querySelectorAll(".agregarCarrito");

botonesCarrito.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const producto = {
            nombre: nombre,
            precio: precio
        };

        carrito.push(producto);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        mostrarMensajeCarrito(nombre + " fue agregado al carrito");
    });
});

const listaCarrito =
    document.getElementById("listaCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

if (listaCarrito) {
    mostrarCarrito();
}

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;


    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

    }

    carrito.forEach(function(producto, posicion) {

        const productoCarrito =
            document.createElement("article");

        const nombre =
            document.createElement("h3");

        nombre.textContent =
            producto.nombre;

        const precio =
            document.createElement("p");

        precio.textContent =
            "$" + producto.precio.toLocaleString("es-CL");

        const botonEliminar =
            document.createElement("button");

        botonEliminar.textContent =
            "Eliminar";

        botonEliminar.addEventListener(
            "click",
            function() {
                eliminarProducto(posicion);
            }
        );

        productoCarrito.appendChild(nombre);
        productoCarrito.appendChild(precio);
        productoCarrito.appendChild(botonEliminar);
        listaCarrito.appendChild(productoCarrito);

        total = total + producto.precio;

    });

    totalCarrito.textContent =
        "Total: $" + total.toLocaleString("es-CL");
}

function eliminarProducto(posicion) {
    carrito.splice(posicion, 1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

const vaciarCarrito =
    document.getElementById("vaciarCarrito");


if (vaciarCarrito) {
    vaciarCarrito.addEventListener(
        "click",
        function() {
            carrito = [];
            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );
            mostrarCarrito();
        }
    );
}

function mostrarMensajeCarrito(mensaje) {
    const mensajeCarrito = document.createElement("div");
    mensajeCarrito.classList.add("mensaje-carrito");
    mensajeCarrito.textContent = mensaje;
    document.body.appendChild(mensajeCarrito);
    setTimeout(function() {
        mensajeCarrito.remove();
    }, 2000);
}


const pagarCarrito =
    document.getElementById("pagarCarrito");

if (pagarCarrito) {
    pagarCarrito.addEventListener("click", function() {
        if (carrito.length === 0) {
            mostrarMensajeCarrito("Tu carrito está vacío");
        } else {
            mostrarMensajeCarrito("Compra realizada correctamente");
            carrito = [];
            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );
            mostrarCarrito();
        }
    });
}

