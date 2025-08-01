let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let dificultad = '';

// Asigna el texto al titulo y al párrafo
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Verifica si el numero ingresado es el correcto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto || intentos-1 == 0) {
        asignarTextoElemento('p',`${numeroDeUsuario!=numeroSecreto ? '¡Has perdido! ' : '¡Has acertado! '}El número secreto era ${numeroSecreto}`);
        asignarTextoElemento('#textoComparacion',`Presiona <b>Nuevo número</b> o <b>Reiniciar</b> para cambiar de dificultad`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('#textoComparacion','El número secreto es menor ⬇️⬇️⬇️');
            asignarTextoElemento('p','Adivina el número!!<br>Ingresa un número entre 1 y ' + numeroMaximo);
        } else {
            asignarTextoElemento('#textoComparacion','El número secreto es mayor ⬆️⬆️⬆️');
            asignarTextoElemento('p','Adivina el número!!<br>Ingresa un número entre 1 y ' + numeroMaximo);
        }
        limpiarCaja();
    }
    intentos--;
    asignarTextoElemento('#parrafoIntentos',`Intentos restantes: ${intentos}`);
    mostrarBotonAyuda();
    console.log("intentos=", intentos);
    console.log("var numeroGenerado: ",numeroSecreto,"var numeroSecreto: ",numeroSecreto);
    return;
}

// cambiar atributos de boton ayuda
function cambiarAtributosBotonAyuda() {
    document.getElementById('botonAyuda').style.display = 'inline-block';
    document.getElementById('botonAyuda').style.background = '#1875E8';
}

// Ayudas
function mostrarBotonAyuda() {
    switch (dificultad) {
        case '2':
            if (intentos == 7) {
                cambiarAtributosBotonAyuda();
            }
            break;
        case '3':
            if (intentos == 10) {
                cambiarAtributosBotonAyuda();
            }
            if (intentos==5) {
                document.getElementById('botonAyuda').style.background = '#1875E8';
            }
        default:
            break;
    }
}

function mostrarAyuda() {
    switch (dificultad) {
        case '2':
                if(numeroSecreto>=10){
                    asignarTextoElemento('#textoAyuda',`DOS CIFRAS!!! Y el primer dígito es ${Math.floor(numeroSecreto/10)}`);
                    
                }else{ 
                    asignarTextoElemento('#textoAyuda',`UNA CIFRA!!!`);
                }
                document.getElementById('botonAyuda').style.background = 'gray';
            break;
        case '3':
                if(numeroSecreto<10){
                    asignarTextoElemento('#textoAyuda',`UNA CIFRA!!!`);
                    document.getElementById('botonAyuda').style.background = 'gray';
                }else { 
                    if(numeroSecreto<100){
                        asignarTextoElemento('#textoAyuda',`DOS CIFRAS!!! Y el primer dígito es ${Math.floor(numeroSecreto/10)}`);
                        document.getElementById('botonAyuda').style.background = 'gray';
                    }else{
                        if(numeroSecreto<1000){
                            asignarTextoElemento('#textoAyuda',`TRES CIFRAS!!! Y el primer dígito es ${Math.floor(numeroSecreto/100)}`);
                        }
                    }
                }
                document.getElementById('botonAyuda').style.background = 'gray';
                if(intentos<=5){
                    asignarTextoElemento('#textoAyuda',`Pista: El primer dígito es ${Math.floor(numeroSecreto/100)} y el segundo dígito es ${Math.floor((numeroSecreto%100)/10)}`);
                }
            break;
        default:
            break;
    }
}

// Limpia la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Asigna un valor random a la variable numerogenerado
function generarNumeroSecreto() {
    numeroSecreto =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log("var numeroGenerado: ",numeroSecreto,"var numeroSecreto: ",numeroSecreto);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        pantallaFin();
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroSecreto)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroSecreto);
            return numeroSecreto;
        }
    }
}

// Reiniciar
function reiniciar() {
    mensajeBienvenida();
    estadosIniciales();
    asignarTextoElemento('#textoComparacion','');
    asignarTextoElemento('#parrafoIntentos','');
    listaNumerosSorteados = [];
    document.getElementById('selectDificultad').style.display = 'block';
    asignarTextoElemento('#textoAyuda','');
    document.getElementById('botonAyuda').style.display = 'none';
    limpiarCaja();
}

// Pantalla de fin
function pantallaFin() {
    asignarTextoElemento('p','Se han sorteado todos los números posibles<br>Presiona <b>Reiniciar</b> para comenzar de nuevo');
    document.getElementById('intentar').setAttribute('disabled', 'true');
}

// Pantalla de inicio
function mensajeBienvenida() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Selecciona una dificultad y preciona <b>Iniciar</b> para comenzar el juego`);
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
    generarNumeroSecreto();
    asignarTextoElemento('#parrafoIntentos',`Intentos: ${intentos}`);
}

// Reinicia el juego
function nuevoNumero() {
    
    asignarTextoElemento('p','Adivina el número!!<br>Ingresa un número entre 1 y ' + numeroMaximo);
    asignarTextoElemento('#textoComparacion','');
    //limpiar caja
    limpiarCaja();
    //Reiniciar intentos
    condicionesSegunDificultad(dificultad);
    document.getElementById('intentar').removeAttribute('disabled');
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    generarJuego();
    document.getElementById('botonAyuda').style.display = 'none';
    asignarTextoElemento('#textoAyuda','');
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');  

}

function iniciarJuego() {
    //Obtener el valor del select
    dificultad = document.querySelector('#selectDificultad').value;
    document.getElementById('valorUsuario').removeAttribute('disabled');
    document.getElementById('intentar').removeAttribute('disabled');
    document.getElementById('iniciar').setAttribute('disabled', 'true');
    document.getElementById('reset').removeAttribute('disabled');
    condicionesSegunDificultad(dificultad);
    asignarTextoElemento('p','Comienza el juego!<br>Ingresa un número entre 1 y ' + numeroMaximo);
    generarJuego();
    document.getElementById('selectDificultad').style.display = 'none';
}

function condicionesSegunDificultad(dificultad) {
    switch (dificultad) {
        case '1':
            numeroMaximo = 10;
            intentos=4;
            break;
        case '2':
            numeroMaximo = 100;
            intentos=10;
            break;
        case '3':
            numeroMaximo = 1000;
            intentos=15;
            break;
        default:
            asignarTextoElemento('p','Selecciona una dificultad válida');
            return;
    }
}
mensajeBienvenida();
estadosIniciales();