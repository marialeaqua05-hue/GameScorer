//FUNCIÓN PARA CONVERTIR EL TEXTO DE LAS CONFIGURACIONES A NÚMEROS ENTEROS.
function obtenerValorEntero(inputTexto) {
    return parseInt(inputTexto.value);
}

function generarTablaMatriz(num_alternativas) {

    cuerpoMatriz.innerHTML = "";

    for (let i = 1; i <= num_alternativas ; i++) {

        const fila = document.createElement("tr");

        // COLUMNA ("JUEGOS"): CELDA CON UN INPUT DE TEXTO PARA EL NOMBRE DEL JUEGO.
        const celdaNombre = document.createElement("td");
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = "Juego" + i;
        celdaNombre.appendChild(inputNombre);
        fila.appendChild(celdaNombre);

        //COLUMNA ("COSTO"): CELDA CON UN INPUT DE NUMBER PARA EL VALOR DE COSTO.
        const celdaNombre2 = document.createElement("td");
        const inputNombre2 = document.createElement("input");
        inputNombre2.type = "number";
        inputNombre2.placeholder = "Ejem. 1000";
        celdaNombre2.appendChild(inputNombre2);
        fila.appendChild(celdaNombre2);

        //COLUMNA ("PLATAFORMA"): CELDA CON UN SELECT PARA ELEGIR LA PLATAFORMA
        const celdaPlataformaMatriz = document.createElement("td");
        const selectPlataforma = document.createElement("select");
    
        const opcionDefecto = document.createElement("option");
        opcionDefecto.value = "";
        opcionDefecto.textContent = "Seleccionar...";
        selectPlataforma.appendChild(opcionDefecto);

        listaPlataformas.forEach(g => {
            const opcion = document.createElement("option")
            opcion.value = g.valor;
            opcion.textContent = `${g.nombre} (${g.valor})`;
            selectPlataforma.appendChild(opcion);

        })

        celdaPlataformaMatriz.appendChild(selectPlataforma)
        fila.appendChild(celdaPlataformaMatriz)


        //COLUMNA ("GÉNERO"): CELDA CON UN SELECT PARA ELEGIR EL GÉNERO
        const celdaGeneroMatriz = document.createElement("td");
        const selectGenero = document.createElement("select");
        
        const opcionDefecto2 = document.createElement("option");
        opcionDefecto2.value = "";
        opcionDefecto2.textContent = "Seleccionar...";
        selectGenero.appendChild(opcionDefecto2);

        listaGeneros.forEach(g => {
            const opcion = document.createElement("option")
            opcion.value = g.valor;
            opcion.textContent = `${g.nombre} (${g.valor})`;
            selectGenero.appendChild(opcion);

        })

        celdaGeneroMatriz.appendChild(selectGenero)
        fila.appendChild(celdaGeneroMatriz)

        // RESTO DE COLUMNAS ("ARTE", "MÚSICA", "DURACIÓN", "RESEÑAS"): CELDA CON UN INPUT PARA EL VALOR DEL CRITERIO.
        for (let j = 1 ; j <= 4 ; j++) {
        const celdaValor = document.createElement("td");
        const inputValor = document.createElement("input");
        inputValor.type = "number";
        inputValor.placeholder = "Ej. 8, 95";
        celdaValor.appendChild(inputValor);
        fila.appendChild(celdaValor);
        }

        //COLUMNA ("SUMA PUNTUAJE"): CELDA QUE MOSTRARÁ LA SUMA TOTAL DE LA OPERACIÓN SAW INDIVIDUAL DE CADA ALTERNATIVA.
        const celdaNombre5 = document.createElement("td");
        const inputNombre5 = document.createElement("input");
        inputNombre5.type = "text";
        inputNombre5.readOnly = true
        inputNombre5.placeholder = "...";
        celdaNombre5.appendChild(inputNombre5);
        fila.appendChild(celdaNombre5);
        
        //SE AGREGA LA FILA DE LA TABLA PARA QUE EL USUARIO AGREGE O ELIJA SUS VALORES.
        cuerpoMatriz.appendChild(fila)

        
    }
}

function agregarGeneros() {
    //SE EXTRAEN LOS VALORES ESCRITOS POR EL USUARIO EN EL CAMPO DE GENERO Y VALOR
    const inputNombre = document.getElementById("input-nombre-genero");
    const inputValor = document.getElementById("input-valor-genero");
    //SE DA LA REFERENCIA DEL TBODY CON EL QUE SE TRABAJARÁ EN LA FUNCIÓN
    const cuerpoGenero = document.getElementById("cuerpo-genero");
    //SE GUARDAN LOS VALORES GENERO Y SU VALOR RESPECTIVO
    const nombre = inputNombre.value;
    const valor = parseInt(inputValor.value);

    //VALIDACIÓN PARA VER QUE EL GENERO NO ESTÉ VACIO Y VALOR TENGA UN NÚMERO
    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para el género y un valor");
        return;
    }

    //LOS GENEROS Y VALORES VALIDOS SE ALMACENAN EN UN ARREGLO
    listaGeneros.push({ nombre: nombre, valor: valor});
    
    //SE CREA UNA FILA EN LA TABLA DE GÉNEROS
    const fila = document.createElement("tr");

    //SE CREA UN TABLE DATA ADENTRO DE LA FILA QUE SE CREO ANTERIORMENTE Y SE INGRESA EL NOMBRE DEL GÉNERO.
    const celdaGenero = document.createElement("td")
    celdaGenero.textContent = nombre;
    fila.appendChild(celdaGenero);
    
    //SE CREA UN TABLE DATA ADENTRO DE LA FILA DESPUÉS DEL ANTERIOR TABLE DATA Y SE INGRESA EL VALOR DEL GÉNERO.
    const celdaValor = document.createElement("td")
    celdaValor.textContent = valor;
    fila.appendChild(celdaValor);

    //SE AGREGA LA FILA AL CUERPO DE LA TABLA DE GÉNEROS
    cuerpoGenero.appendChild(fila);

    //SE LIMPIAN LO ESPACIOS PARA RECIBIR MÁS GÉNEROS Y SUS RESPECTIVAS VALORACIONES
    inputNombre.value = ""
    inputValor.value = ""
    

}

function agregarPlataformas() {
    //SE EXTRAEN LOS VALORES ESCRITOS POR EL USUARIO EN EL CAMPO DE PLATAFORMA Y VALOR
    const inputNombre = document.getElementById("input-nombre-plataforma");
    const inputValor = document.getElementById("input-valor-plataforma");
    //SE DA LA REFERENCIA DEL TBODY CON EL QUE SE TRABAJARÁ EN LA FUNCIÓN
    const cuerpoPlataforma = document.getElementById("cuerpo-plataforma");
    //SE GUARDAN LOS VALORES PLATAFORMA Y SU VALOR RESPECTIVO
    const nombre = inputNombre.value;
    const valor = parseInt(inputValor.value);

    //VALIDACIÓN PARA VER QUE LA PLATAFORMA NO ESTÉ VACIO Y VALOR TENGA UN NÚMERO
    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para la plataforma y un valor");
        return;
    }

    //LAS PLATAFORMAS Y VALORES VALIDOS SE ALMACENAN EN UN ARREGLO
    listaPlataformas.push({ nombre: nombre, valor: valor});
    
    //SE CREA UNA FILA EN LA TABLA DE PLATAFORMAS
    const fila = document.createElement("tr")

    //SE CREA UN TABLE DATA ADENTRO DE LA FILA QUE SE CREO ANTERIORMENTE Y SE INGRESA EL NOMBRE DE LA PLATAFORMA.
    const celdaPlataforma = document.createElement("td")
    celdaPlataforma.textContent = nombre
    fila.appendChild(celdaPlataforma)
    
    //SE CREA UN TABLE DATA ADENTRO DE LA FILA DESPUÉS DEL ANTERIOR TABLE DATA Y SE INGRESA EL VALOR DE LA PLATAFORMA.
    const celdaValor = document.createElement("td")
    celdaValor.textContent = valor
    fila.appendChild(celdaValor)

    //SE AGREGA LA FILA AL CUERPO DE LA TABLA DE PLATAFORMAS
    cuerpoPlataforma.appendChild(fila)

    //SE LIMPIAN LO ESPACIOS PARA RECIBIR MÁS PLATAFORMAS Y SUS RESPECTIVAS VALORACIONES
    inputNombre.value = ""
    inputValor.value = ""
    

}

function calcularResultadoFila(fila){
    // 1. OBTENER TODAS LAS CELDAS DE LA FILA
    const inputCosto = fila.cells[1].querySelector("input");
    const selectPlataforma = fila.cells[2].querySelector("select");
    const selectGenero = fila.cells[3].querySelector("select");
    const inputArte = fila.cells[4].querySelector("input");
    const inputMusica = fila.cells[5].querySelector("input");
    const inputDuracion = fila.cells[6].querySelector("input");
    const inputResena = fila.cells[7].querySelector("input");
    const inputResultado = fila.cells[8].querySelector("input");

    // 2. EXTRAER VALORES DE LAS CELDAS DE LA TABLA MATRIZ
    const costo = parseFloat(inputCosto.value);
    const valPlataforma = parseFloat(selectPlataforma.value);
    const valGenero = parseFloat(selectGenero.value);
    const valArte = parseFloat(inputArte.value);
    const valMusica = parseFloat(inputMusica.value);
    const valDuracion = parseFloat(inputDuracion.value);
    const valResena = parseFloat(inputResena.value);   


    const valCosto = conversionCostoValor(costo, costoMinimo, costoMaximo)

    // 3. VALIDACIÓN SI ALGÚN CAMPO ESTÁ VACIO O NO VALIDO, NO SE HACE LA SUMA DE LA FILA
    if (isNaN(valCosto) || isNaN(valPlataforma) || isNaN(valGenero) || 
        isNaN(valArte) || isNaN(valMusica) || isNaN(valDuracion) || isNaN(valResena)) {
        inputResultado.value = "..."; // MUESTRA "..." SI NO SE PUEDE MOSTRAR UN RESULTADO VALIDO EN LA SUMA DE LA FILA.
        return;
    }

    // 4. OBTENER LOS PESOS ASIGNADOS EN LAS PONDERACIONES
    const pCosto = parseFloat(document.getElementById("matriz-costo").value) || 0;
    const pPlat = parseFloat(document.getElementById("matriz-plataforma").value) || 0;
    const pGen = parseFloat(document.getElementById("matriz-genero").value) || 0;
    const pArte = parseFloat(document.getElementById("matriz-arte").value) || 0;
    const pMus = parseFloat(document.getElementById("matriz-musica").value) || 0;
    const pDur = parseFloat(document.getElementById("matriz-duracion").value) || 0;
    const pRes = parseFloat(document.getElementById("matriz-resena").value) || 0;

    // 5. OPERACIÓN SAW 
    let puntajeTotal = (valCosto * pCosto) + 
                       (valPlataforma * pPlat) + 
                       (valGenero * pGen) + 
                       (valArte * pArte) + 
                       (valMusica * pMus) + 
                       (valDuracion * pDur) + 
                       (valResena * pRes);
    
    
    // 6. SE ASIGNA UN RESULTADO Y SE REDONDEA A DOS DECIMALES.
    inputResultado.value = puntajeTotal.toFixed(2);

}

function conversionCostoValor(costo, costoMinimo, costoMaximo){
    //PREVENIR RESULTADOS NO NUMÉRICOS
    if (isNaN(costo)) return NaN;

    //PREVENIR DIVISIÓN POR CERO
    if (costoMaximo === costoMinimo || isNaN(costoMaximo || isNaN(costoMinimo))) {
        return 10;
    }
    
    //NORMALIZACIÓN (0-1)
    const normalizacion = (costo - costoMinimo) / (costoMaximo - costoMinimo);

    //INVERSIÓN Y REESCALADO
    //SI NORMALIZACIÓN ES MÁS CERCANO A 0 ENTONCES ES MÁS BARATO Y MEJOR.
    //SI NORMALIZACIÓN ES MÁS CERCANO A 1 ENTONCES ES MAS CARO Y POR ENDE PEOR.
    //PARA INVERTIR ESTO SOLAMENTE SE CAMBIA EL '-' A '+' EN LA OPERACIÓN QUE LE ASGINA VALOR A "valor1y10".
    const valor1y10 = 10 - (normalizacion * 9);

    return valor1y10;
}

function actualizarIndicadorPesos() {
    const idsPesos = [
        "config-costo", "config-plataforma", "config-genero",
        "config-arte", "config-musica", "config-duracion", "config-resena"
    ];

    let sumaTotal = 0;
    idsPesos.forEach(id => {
        const val = parseFloat(document.getElementById(id).value) || 0;
        sumaTotal += val;
    });

    const elementoTotal = document.getElementById("total-ponderacion");
    const elementoMensaje = document.getElementById("mensaje-ponderacion");

    elementoTotal.textContent = sumaTotal.toFixed(2);

    // Validación visual según la suma acumulada
    if (Math.abs(sumaTotal - 1.0) < 0.01) {
        elementoTotal.style.color = "#2e7d32"; // Verde
        elementoMensaje.textContent = "¡Distribución exacta!";
        elementoMensaje.style.color = "#2e7d32";
    } else if (sumaTotal > 1.0) {
        elementoTotal.style.color = "#c62828"; // Rojo
        elementoMensaje.textContent = "Supera el 1.00 (100%)";
        elementoMensaje.style.color = "#c62828";
    } else {
        elementoTotal.style.color = "#f57c00"; // Naranja
        elementoMensaje.textContent = "Incompleto (menor a 1.00)";
        elementoMensaje.style.color = "#f57c00";
    }
}

// Escuchar cambios en todos los inputs de configuración
document.querySelectorAll(".input-ponderacion").forEach(input => {
    input.addEventListener("input", actualizarIndicadorPesos);
});

function validacionMinMaX(){
    //VALIDACIÓN PARA EL RANGO MIN-MAX DEL COSTO

    const inputMinText = document.getElementById("input-costo-min").value
    const inputMaxText = document.getElementById("input-costo-max").value

    if (inputMinText === "" || inputMaxText === "") {
        alert("No dejes vacios los campos de costo mínimo y máximo.");
        return false;
    }

    /*if (isNaN(inputMaxText) || isNaN(inputMinText)) {
        alert("Los apartados minímo y máximo solamente pueden ser números");
        return false;
    } */

    const costoMin = parseFloat(inputMinText)
    const costoMax = parseFloat(inputMaxText)


    if (costoMin < 0 || costoMax < 0) {
        alert("Los apartados minímo y máximo solamente pueden ser números positivos");
        return false;
    }

    if (costoMin >= costoMax) {
        alert("El costo minímo debe de ser más bajo que el costo máximo.");
        return false;
    };

    costoMaximo = costoMax;
    costoMinimo = costoMin;

    return true;

}

const btnAgregarGenero = document.getElementById("btn-agregar-genero");
const btnAgregarPlataforma = document.getElementById("btn-agregar-plataforma")
const btnGenerar = document.getElementById("btn-generar");
const vistaConfig = document.getElementById("vista-configuracion");
const vistaMatriz = document.getElementById("vista-matriz");
const cuerpoMatriz = document.getElementById("cuerpo-matriz");
const inputAlternativas = document.getElementById("num_alter");

let listaGeneros = [];
let listaPlataformas = [];
let costoMinimo
let costoMaximo 

//LÓGICA DEL BOTÓN QUE GENERA LA TABLA MATRIZ PARA AGREGAR VALORES
btnGenerar.addEventListener("click", function() {

    //SE LLAMA A LA FUNCIÓN QUE VALIDA EL COSTO MIN Y MAX
    if (validacionMinMaX() === false) {
        return;
    };

    //SE PASAN LOS PESOS DE LAS PONDERACIONES ASIGNADAS POR EL USUARIO A LA NUEVA TABLA
    document.getElementById("matriz-costo").value = document.getElementById("config-costo").value
    document.getElementById("matriz-plataforma").value = document.getElementById("config-plataforma").value
    document.getElementById("matriz-genero").value = document.getElementById("config-genero").value
    document.getElementById("matriz-arte").value = document.getElementById("config-arte").value
    document.getElementById("matriz-musica").value = document.getElementById("config-musica").value
    document.getElementById("matriz-duracion").value = document.getElementById("config-duracion").value
    document.getElementById("matriz-resena").value = document.getElementById("config-resena").value
    //***************/


    let numAlternativas = obtenerValorEntero(inputAlternativas);

    generarTablaMatriz(numAlternativas);

    //OCULTA LAS CONFIGURACIONES Y MUESTRA LAS TABLAS GENERADAS
    vistaConfig.classList.add("oculto");
    //OCULTA LAS TABLAS GENERADAS Y VUELVE A MOSTRAR LAS CONFIGURACIONES
    vistaMatriz.classList.remove("oculto");


});

//LÓGICA DEL BOTÓN QUE AGREGA GENEROS Y SU RESPECTIVO VALOR A LA TABLA MATRIZ
btnAgregarGenero.addEventListener("click", agregarGeneros);

//LÓGICA DEL BOTÓN QUE AGREGA PLATAFORMAS Y SU RESPECTIVO VALOR A LA TABLA MATRIZ
btnAgregarPlataforma.addEventListener("click", agregarPlataformas);

//CÓDIGO QUE PERMITE QUE EL CUERPO DE LA TABLA PUEDA CALCULAR SUS VALORES EN SUS CELDAS DE MANERA AUTOMÁTICA
//PARA GENERAR LA SUMA DEL TOTAL DE LOS VALORES AL FINAL DE LA FILA ASIGNADA
cuerpoMatriz.addEventListener("input", function(e) {
    const filaModificada = e.target.closest("tr");
    if (filaModificada) {
        calcularResultadoFila(filaModificada);
    }
});

document.querySelectorAll(".input-ponderacion").forEach(inputPeso =>{
    inputPeso.addEventListener("input", function() {
        const filas = cuerpoMatriz.querySelectorAll("tr");
        filas.forEach(fila => calcularResultadoFila(fila));
        actualizarIndicadorPesos();
    });
});

actualizarIndicadorPesos();
