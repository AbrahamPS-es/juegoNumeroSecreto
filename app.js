let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Asigna el texto al titulo y al párrafo
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Verifica si el numero ingresado es el correcto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('#textoComparacion','El número secreto es menor ⬇️⬇️⬇️');
            asignarTextoElemento('p','Comienza el juego!<br>Ingresa un número entre 1 y ' + numeroMaximo);
        } else {
            asignarTextoElemento('#textoComparacion','El número secreto es mayor ⬆️⬆️⬆️');
            asignarTextoElemento('p','Comienza el juego!<br>Ingresa un número entre 1 y ' + numeroMaximo);
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

// Limpia la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Asigna un valor random a la variable numerogenerado
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        pantallaFin();
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Reiniciar
function reiniciar() {
    mensajeBienvenida();
    estadosIniciales();
    listaNumerosSorteados = [];
    document.getElementById('selectDificultad').style.display = 'block';
}

// Pantalla de fin
function pantallaFin() {
    asignarTextoElemento('p','Se han sorteado todos los números posibles<br>Presiona <b>Reiniciar</b> para comenzar de nuevo');
    document.getElementById('intentar').setAttribute('disabled', 'true');
}

// Pantalla de inicio
function mensajeBienvenida() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Selecciona una dificultad`);
}

function estadosIniciales() {
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
    document.getElementById('reset').setAttribute('disabled', 'true');
    document.getElementById('intentar').setAttribute('disabled', 'true');
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('iniciar').removeAttribute('disabled');
}

// Generar juego
function generarJuego() {
    numeroSecreto=generarNumeroSecreto();
    intentos = 1;
}

// Reinicia el juego
function nuevoNumero() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    generarJuego();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');    
}

function iniciarJuego() {
    //Obtener el valor del select
    let dificultad = document.querySelector('#selectDificultad').value;
    document.getElementById('valorUsuario').removeAttribute('disabled');
    document.getElementById('intentar').removeAttribute('disabled');
    document.getElementById('iniciar').setAttribute('disabled', 'true');
    document.getElementById('reset').removeAttribute('disabled');
    switch (dificultad) {
        case '1':
            numeroMaximo = 3;
            break;
        case '2':
            numeroMaximo = 100;
            break;
        case '3':
            numeroMaximo = 1000;
            break;
        default:
            asignarTextoElemento('p','Selecciona una dificultad válida');
            return;
    }
    generarJuego();
    asignarTextoElemento('p','Comienza el juego!<br>Ingresa un número entre 1 y ' + numeroMaximo);
    document.getElementById('selectDificultad').style.display = 'none';
}

mensajeBienvenida();
estadosIniciales();