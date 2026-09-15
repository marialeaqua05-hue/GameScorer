//FUNCIÓN PARA CONVERTIR EL TEXTO DE LAS CONFIGURACIONES A NÚMEROS ENTEROS.
function obtenerValorEntero(inputTexto) {
    return parseInt(inputTexto);
}

function generarTablaMatriz(num_alternativas) {

    cuerpoMatriz.innerHTML = "";

    for (let i = 1; i <= num_alternativas ; i++) {

        const fila = document.createElement("tr");

        // COLUMNA ("JUEGOS")
        const celdaNombre = document.createElement("td");
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = "Juego" + i;
        celdaNombre.appendChild(inputNombre);
        fila.appendChild(celdaNombre);

        //COLUMNA ("COSTO")
        const celdaNombre2 = document.createElement("td");
        const inputNombre2 = document.createElement("input");
        inputNombre2.type = "number";
        inputNombre2.placeholder = "Ejem. 1000";
        celdaNombre2.appendChild(inputNombre2);
        fila.appendChild(celdaNombre2);

        //COLUMNA ("PLATAFORMA")
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


        //COLUMNA ("GÉNERO")
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

        // RESTO DE COLUMNAS ("ARTE", "MÚSICA", "DURACIÓN", "RESEÑAS")
        for (let j = 1 ; j <= 4 ; j++) {
            const celdaValor = document.createElement("td");
            const selectValor = document.createElement("select");
            
            const opcionDefecto3 = document.createElement("option");
            opcionDefecto3.value = "";
            opcionDefecto3.textContent = "Seleccionar...";
            selectValor.appendChild(opcionDefecto3);

            for (let k = 1; k <= 10; k++) {
                const opcionNumero = document.createElement("option");
                opcionNumero.value = k;
                opcionNumero.textContent = k;
                selectValor.appendChild(opcionNumero);
            }
            celdaValor.appendChild(selectValor);
            fila.appendChild(celdaValor);
        }

        //COLUMNA ("SUMA PUNTUAJE")
        const celdaNombre5 = document.createElement("td");
        const inputNombre5 = document.createElement("input");
        inputNombre5.type = "text";
        inputNombre5.readOnly = true
        inputNombre5.placeholder = "...";
        celdaNombre5.appendChild(inputNombre5);
        fila.appendChild(celdaNombre5);
        
        cuerpoMatriz.appendChild(fila)
    }
}

function agregarGeneros() {
    const inputNombre = document.getElementById("input-nombre-genero");
    const selectValor = document.getElementById("input-valor-genero");
    const cuerpoGenero = document.getElementById("cuerpo-genero");
    
    const nombre = inputNombre.value;
    const valor = parseInt(selectValor.value);

    //VALIDACIÓN SIMPLIFICADA PORQUE AHORA ES UN SELECT
    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para el género y selecciona un valor.");
        return;
    }

    listaGeneros.push({ nombre: nombre, valor: valor});
    
    const fila = document.createElement("tr");

    const celdaGenero = document.createElement("td")
    celdaGenero.textContent = nombre;
    fila.appendChild(celdaGenero);
    
    const celdaValor = document.createElement("td")
    celdaValor.textContent = valor;
    fila.appendChild(celdaValor);

    cuerpoGenero.appendChild(fila);

    inputNombre.value = ""
    selectValor.value = ""

    existeFilaGenero = true
}

function agregarPlataformas() {
    const inputNombre = document.getElementById("input-nombre-plataforma");
    const selectValor = document.getElementById("input-valor-plataforma");
    const cuerpoPlataforma = document.getElementById("cuerpo-plataforma");
    
    const nombre = inputNombre.value;
    const valor = parseInt(selectValor.value);

    //VALIDACIÓN SIMPLIFICADA PORQUE AHORA ES UN SELECT
    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para la plataforma y selecciona un valor.");
        return;
    }

    listaPlataformas.push({ nombre: nombre, valor: valor });
    
    const fila = document.createElement("tr")

    const celdaPlataforma = document.createElement("td")
    celdaPlataforma.textContent = nombre
    fila.appendChild(celdaPlataforma)
    
    const celdaValor = document.createElement("td")
    celdaValor.textContent = valor
    fila.appendChild(celdaValor)

    cuerpoPlataforma.appendChild(fila)

    inputNombre.value = ""
    selectValor.value = ""
    
    existeFilaPlataforma = true
}

function calcularResultadoFila(fila){
    const inputCosto = fila.cells[1].querySelector("input");
    const selectPlataforma = fila.cells[2].querySelector("select");
    const selectGenero = fila.cells[3].querySelector("select");
    const selectArte = fila.cells[4].querySelector("select");
    const selectMusica = fila.cells[5].querySelector("select");
    const selectDuracion = fila.cells[6].querySelector("select");
    const selectResena = fila.cells[7].querySelector("select");
    const inputResultado = fila.cells[8].querySelector("input");

    const costo = parseFloat(inputCosto.value);
    const valPlataforma = parseFloat(selectPlataforma.value);
    const valGenero = parseFloat(selectGenero.value);
    const valArte = parseFloat(selectArte.value);
    const valMusica = parseFloat(selectMusica.value);
    const valDuracion = parseFloat(selectDuracion.value);
    const valResena = parseFloat(selectResena.value);   

    const valCosto = conversionCostoValor(costo, costoMinimo, costoMaximo)

    if (isNaN(valCosto) || isNaN(valPlataforma) || isNaN(valGenero) || 
        isNaN(valArte) || isNaN(valMusica) || isNaN(valDuracion) || isNaN(valResena)) {
        inputResultado.value = "..."; 
        return;
    }

    const pCosto = parseFloat(document.getElementById("matriz-costo").value) || 0;
    const pPlat = parseFloat(document.getElementById("matriz-plataforma").value) || 0;
    const pGen = parseFloat(document.getElementById("matriz-genero").value) || 0;
    const pArte = parseFloat(document.getElementById("matriz-arte").value) || 0;
    const pMus = parseFloat(document.getElementById("matriz-musica").value) || 0;
    const pDur = parseFloat(document.getElementById("matriz-duracion").value) || 0;
    const pRes = parseFloat(document.getElementById("matriz-resena").value) || 0;

    let puntajeTotal = (valCosto * pCosto) + 
                       (valPlataforma * pPlat) + 
                       (valGenero * pGen) + 
                       (valArte * pArte) + 
                       (valMusica * pMus) + 
                       (valDuracion * pDur) + 
                       (valResena * pRes);
    
    inputResultado.value = puntajeTotal.toFixed(2);
}

function actualizarRanking() {
    const cuerpoRanking = document.getElementById("cuerpo-ranking");
    cuerpoRanking.innerHTML = ""; 

    const filasMatriz = cuerpoMatriz.querySelectorAll("tr");
    let listaResultados = [];

    filasMatriz.forEach(fila => {
        const inputNombre = fila.cells[0].querySelector("input");
        const inputPuntaje = fila.cells[8].querySelector("input");

        if (inputNombre && inputPuntaje) {
            const nombreJuego = inputNombre.value || "Sin nombre";
            const puntajeFinal = inputPuntaje.value;

            if (puntajeFinal !== "..." && puntajeFinal !== "") {
                listaResultados.push({
                    nombre: nombreJuego,
                    puntaje: parseFloat(puntajeFinal)
                });
            }
        }
    });
    
    //HACE QUE LA TABLA DE RANKING PUEDA PASAR DE MAYOR A MENOR Y VICEVERSA
    if (ordenDescendente) {
        listaResultados.sort((a, b) => b.puntaje - a.puntaje); // Mayor a menor
    } else {
        listaResultados.sort((a, b) => a.puntaje - b.puntaje); // Menor a mayor
    }

    let posicion = 1;
    listaResultados.forEach(juego => {
        const filaRanking = document.createElement("tr");

        const celdaPosicion = document.createElement("td");
        celdaPosicion.textContent = posicion;
        filaRanking.appendChild(celdaPosicion);

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = juego.nombre;
        filaRanking.appendChild(celdaNombre);

        const celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = juego.puntaje.toFixed(2);
        filaRanking.appendChild(celdaPuntaje);

        cuerpoRanking.appendChild(filaRanking);
        posicion++;
    });
}

function conversionCostoValor(costo, costoMinimo, costoMaximo){
    if (isNaN(costo)) return NaN;
    if (costoMaximo === costoMinimo || isNaN(costoMaximo || isNaN(costoMinimo))) {
        return 10;
    }
    const normalizacion = (costo - costoMinimo) / (costoMaximo - costoMinimo);
    const valor1y10 = 10 - (normalizacion * 9);
    return valor1y10;
}

// NUEVA LÓGICA PARA ACTUALIZAR EL INDICADOR Y PONER LÍMITE DE 1.00
function actualizarIndicadorPesos(prefijo = null) {
    // SABER SI ESTAMOS LEYENDO LA CONFIGURACIÓN O LA MATRIZ
    if (!prefijo) {
        prefijo = vistaMatriz.classList.contains("oculto") ? "config-" : "matriz-";
    }

    const idsPesos = [
        prefijo+"costo", prefijo+"plataforma", prefijo+"genero",
        prefijo+"arte", prefijo+"musica", prefijo+"duracion", prefijo+"resena"
    ];

    let sumaTotal = 0;
    idsPesos.forEach(id => {
        const val = parseFloat(document.getElementById(id).value) || 0;
        sumaTotal += val;
    });

    const elementoTotal = document.getElementById("total-ponderacion");
    const elementoMensaje = document.getElementById("mensaje-ponderacion");

    elementoTotal.textContent = sumaTotal.toFixed(2);

    // Validación visual según la suma acumulada (ya no permite superar 1.00)
    if (Math.abs(sumaTotal - 1.0) < 0.001) {
        elementoTotal.style.color = "#2e7d32"; // Verde
        elementoMensaje.textContent = "¡Distribución exacta!";
        elementoMensaje.style.color = "#2e7d32";
    } else {
        elementoTotal.style.color = "#f57c00"; // Naranja
        elementoMensaje.textContent = "Incompleto (menor a 1.00)";
        elementoMensaje.style.color = "#f57c00";
    }
}

// LIMITADOR EN TIEMPO REAL: NO PERMITE QUE LA SUMA SUPERE 1.00
document.querySelectorAll(".input-ponderacion").forEach(input => {
    input.addEventListener("input", function() {
        // DETECTAR EN QUÉ TABLA ESTAMOS ESCRIBIENDO
        let prefijo = this.id.startsWith("config-") ? "config-" : "matriz-";
        
        const idsPesos = [
            prefijo+"costo", prefijo+"plataforma", prefijo+"genero",
            prefijo+"arte", prefijo+"musica", prefijo+"duracion", prefijo+"resena"
        ];

        let sumaOtros = 0;
        idsPesos.forEach(id => {
            if (id !== this.id) {
                sumaOtros += parseFloat(document.getElementById(id).value) || 0;
            }
        });

        let nuevoValor = parseFloat(this.value);
        
        if (!isNaN(nuevoValor)) {
            // SI SUPERAMOS 1.00, FORZAMOS EL INPUT AL MÁXIMO RESTANTE PERMITIDO
            if (sumaOtros + nuevoValor > 1.0) {
                let valorPermitido = 1.0 - sumaOtros;
                valorPermitido = Math.max(0, valorPermitido);
                // REDONDEAR A 2 DECIMALES PARA PREVENIR ERRORES MATEMÁTICOS DE JS
                valorPermitido = Math.round(valorPermitido * 100) / 100;
                this.value = valorPermitido;
            }
        }

        actualizarIndicadorPesos(prefijo);

        // SI ESTAMOS EN LA MATRIZ, ACTUALIZAR LAS SUMAS DE LAS ALTERNATIVAS AL INSTANTE
        if (prefijo === "matriz-") {
            const filas = cuerpoMatriz.querySelectorAll("tr");
            filas.forEach(fila => calcularResultadoFila(fila));
            actualizarRanking();
        }
    });
});

function validacionMinMaX(){
    const inputMinText = document.getElementById("input-costo-min").value
    const inputMaxText = document.getElementById("input-costo-max").value

    if (inputMinText === "" || inputMaxText === "") {
        alert("No dejes vacios los campos de costo mínimo y máximo.");
        return false;
    }
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
const btnOrdenarRanking = document.getElementById("btn-ordenar-ranking");

let listaGeneros = [];
let listaPlataformas = [];
let costoMinimo
let costoMaximo
let existeFilaGenero = false
let existeFilaPlataforma = false
let ordenDescendente = true;

btnGenerar.addEventListener("click", function() {

    if (validacionMinMaX() === false) {
        return;
    };

    const listaCriterios = ["costo", "plataforma", "genero", "arte", "musica", "duracion", "resena"];

    listaCriterios.forEach(criterio => {
        let valorUsuario = document.getElementById("config-" + criterio).value;
        let inputDestino = document.getElementById("matriz-" + criterio);

        if (valorUsuario === "") {
            inputDestino.value = 0.14;
        } else {
            inputDestino.value = parseFloat(valorUsuario);
        }
    });

    const selectAlternativas = document.getElementById("num_alter");
    const numAlternativas = parseInt(selectAlternativas.value);

    // VALIDACIONES SIMPLIFICADAS PORQUE EL SELECT SOLO DA DE 2 A 10
    if (isNaN(numAlternativas)) {
        alert("Por favor selecciona el número de alternativas en el menú desplegable.");
        return;
    } 

    if (existeFilaGenero && existeFilaPlataforma) {
        generarTablaMatriz(numAlternativas);
    } else {
        alert("Debe de haber por lo menos una plataforma y un género asignados.")
        return;
    }
    
    vistaConfig.classList.add("oculto");
    vistaMatriz.classList.remove("oculto");

    // SE ACTUALIZA EL INDICADOR DEL HEADER CON LOS INPUTS DE LA MATRIZ Y EL RANKING
    actualizarIndicadorPesos("matriz-");
    actualizarRanking();
});

btnAgregarGenero.addEventListener("click", agregarGeneros);
btnAgregarPlataforma.addEventListener("click", agregarPlataformas);

cuerpoMatriz.addEventListener("input", function(e) {
    const filaModificada = e.target.closest("tr");
    if (filaModificada) {
        calcularResultadoFila(filaModificada);
        actualizarRanking();
    }
});

// Llamada inicial para establecer los colores y texto por defecto al abrir
actualizarIndicadorPesos("config-");

// EL BOTÓN DE ORDENAMIENTO DE LA TABLA DE RANKING
if(btnOrdenarRanking) {
    btnOrdenarRanking.addEventListener("click", function() {
        // Invertir el estado (si era true pasa a false y viceversa)
        ordenDescendente = !ordenDescendente;
        
        // Cambiar el texto del botón para que el usuario sepa qué está viendo
        if (ordenDescendente) {
            btnOrdenarRanking.textContent = "Orden actual: Mayor a Menor (Invertir)";
        } else {
            btnOrdenarRanking.textContent = "Orden actual: Menor a Mayor (Invertir)";
        }
        
        // Volver a calcular y dibujar la tabla de ranking con el nuevo orden
        actualizarRanking();
    });
}
