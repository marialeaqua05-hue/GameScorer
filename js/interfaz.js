// 1. DECLARACIÓN DE VARIABLES Y SELECTORES
const btnAgregarGenero = document.getElementById("btn-agregar-genero");
const btnAgregarPlataforma = document.getElementById("btn-agregar-plataforma");
const btnGenerar = document.getElementById("btn-generar");
const vistaConfig = document.getElementById("vista-configuracion");
const vistaMatriz = document.getElementById("vista-matriz");
const cuerpoMatriz = document.getElementById("cuerpo-matriz");
const btnOrdenarRanking = document.getElementById("btn-ordenar-ranking");
const btnCargarEjemplo = document.getElementById("btn-cargar-ejemplo");

let listaGeneros = [];
let listaPlataformas = [];
let costoMinimo;
let costoMaximo;
let existeFilaGenero = false;
let existeFilaPlataforma = false;
let ordenDescendente = true;

// 2. FUNCIONES DE CONFIGURACIÓN Y TABLAS
function obtenerValorEntero(inputTexto) {
    return parseInt(inputTexto);
}

function generarTablaMatriz(num_alternativas, datosPersonalizados = null) {
    const conImagen = datosPersonalizados !== null;
    const theadMatriz = document.querySelector("#vista-matriz thead");
    
    let htmlCabecera = `
        <tr>
            <th>Juegos</th>
            ${conImagen ? '<th>Imagen</th>' : ''}
            <th>Costo</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Arte</th>
            <th>Música</th>
            <th>Duración del juego</th>
            <th>Reseñas</th>
            <th>Suma de puntaje</th>
        </tr>
        <tr>
            <th>Pesos asignados</th>
            ${conImagen ? '<th></th>' : ''}
            <th><input type="number" id="matriz-costo" class="input-ponderacion" value="${document.getElementById("config-costo").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-plataforma" class="input-ponderacion" value="${document.getElementById("config-plataforma").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-genero" class="input-ponderacion" value="${document.getElementById("config-genero").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-arte" class="input-ponderacion" value="${document.getElementById("config-arte").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-musica" class="input-ponderacion" value="${document.getElementById("config-musica").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-duracion" class="input-ponderacion" value="${document.getElementById("config-duracion").value}" step="0.01" min="0" max="1"></th>
            <th><input type="number" id="matriz-resena" class="input-ponderacion" value="${document.getElementById("config-resena").value}" step="0.01" min="0" max="1"></th>
            <th></th>
        </tr>
    `;
    theadMatriz.innerHTML = htmlCabecera;
    cuerpoMatriz.innerHTML = "";

    for (let i = 1; i <= num_alternativas; i++) {
        const fila = document.createElement("tr");
        const dato = conImagen ? datosPersonalizados[i - 1] : null;

        const celdaNombre = document.createElement("td");
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = "Juego " + i;
        if (dato) inputNombre.value = dato.nombre;
        celdaNombre.appendChild(inputNombre);
        fila.appendChild(celdaNombre);

        if (conImagen) {
            const celdaImagen = document.createElement("td");
            const imgFija = document.createElement("img");
            imgFija.src = dato.img;
            imgFija.style.width = "60px";
            imgFija.style.height = "auto";
            celdaImagen.appendChild(imgFija);
            fila.appendChild(celdaImagen);
        }

        const celdaCosto = document.createElement("td");
        const inputCosto = document.createElement("input");
        inputCosto.type = "number";
        inputCosto.placeholder = "Ejem. 1000";
        if (dato) inputCosto.value = dato.costo;
        celdaCosto.appendChild(inputCosto);
        fila.appendChild(celdaCosto);

        const celdaPlataformaMatriz = document.createElement("td");
        const selectPlataforma = document.createElement("select");
        const opcionDefecto = document.createElement("option");
        opcionDefecto.value = "";
        opcionDefecto.textContent = "Seleccionar...";
        selectPlataforma.appendChild(opcionDefecto);
        listaPlataformas.forEach(g => {
            const opcion = document.createElement("option");
            opcion.value = g.valor;
            opcion.textContent = `${g.nombre} (${g.valor})`;
            selectPlataforma.appendChild(opcion);
        });
        if (dato) selectPlataforma.value = dato.plat;
        celdaPlataformaMatriz.appendChild(selectPlataforma);
        fila.appendChild(celdaPlataformaMatriz);

        const celdaGeneroMatriz = document.createElement("td");
        const selectGenero = document.createElement("select");
        const opcionDefecto2 = document.createElement("option");
        opcionDefecto2.value = "";
        opcionDefecto2.textContent = "Seleccionar...";
        selectGenero.appendChild(opcionDefecto2);
        listaGeneros.forEach(g => {
            const opcion = document.createElement("option");
            opcion.value = g.valor;
            opcion.textContent = `${g.nombre} (${g.valor})`;
            selectGenero.appendChild(opcion);
        });
        if (dato) selectGenero.value = dato.gen;
        celdaGeneroMatriz.appendChild(selectGenero);
        fila.appendChild(celdaGeneroMatriz);

        const valoresCriterios = dato ? [dato.arte, dato.mus, dato.dur, dato.res] : [null, null, null, null];
        for (let j = 1; j <= 4; j++) {
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
            if (dato) selectValor.value = valoresCriterios[j - 1];
            celdaValor.appendChild(selectValor);
            fila.appendChild(celdaValor);
        }

        const celdaPuntaje = document.createElement("td");
        const inputPuntaje = document.createElement("input");
        inputPuntaje.type = "text";
        inputPuntaje.readOnly = true;
        inputPuntaje.placeholder = "...";
        celdaPuntaje.appendChild(inputPuntaje);
        fila.appendChild(celdaPuntaje);

        cuerpoMatriz.appendChild(fila);
    }
}

function agregarGeneros() {
    const inputNombre = document.getElementById("input-nombre-genero");
    const selectValor = document.getElementById("input-valor-genero");
    const cuerpoGenero = document.getElementById("cuerpo-genero");
    const nombre = inputNombre.value;
    const valor = parseInt(selectValor.value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para el género y selecciona un valor.");
        return;
    }
    listaGeneros.push({ nombre: nombre, valor: valor});
    const fila = document.createElement("tr");
    const celdaGenero = document.createElement("td");
    celdaGenero.textContent = nombre;
    fila.appendChild(celdaGenero);
    const celdaValor = document.createElement("td");
    celdaValor.textContent = valor;
    fila.appendChild(celdaValor);
    cuerpoGenero.appendChild(fila);
    inputNombre.value = "";
    selectValor.value = "";
    existeFilaGenero = true;
}

function agregarPlataformas() {
    const inputNombre = document.getElementById("input-nombre-plataforma");
    const selectValor = document.getElementById("input-valor-plataforma");
    const cuerpoPlataforma = document.getElementById("cuerpo-plataforma");
    const nombre = inputNombre.value;
    const valor = parseInt(selectValor.value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor ingresa un nombre para la plataforma y selecciona un valor.");
        return;
    }
    listaPlataformas.push({ nombre: nombre, valor: valor });
    const fila = document.createElement("tr");
    const celdaPlataforma = document.createElement("td");
    celdaPlataforma.textContent = nombre;
    fila.appendChild(celdaPlataforma);
    const celdaValor = document.createElement("td");
    celdaValor.textContent = valor;
    fila.appendChild(celdaValor);
    cuerpoPlataforma.appendChild(fila);
    inputNombre.value = "";
    selectValor.value = "";
    existeFilaPlataforma = true;
}

// function validacionMinMaX(){
//     const inputMinText = document.getElementById("input-costo-min").value;
//     const inputMaxText = document.getElementById("input-costo-max").value;

//     if (inputMinText === "" || inputMaxText === "") {
//         alert("No dejes vacios los campos de costo mínimo y máximo.");
//         return false;
//     }
//     const costoMin = parseFloat(inputMinText);
//     const costoMax = parseFloat(inputMaxText);

//     if (costoMin < 0 || costoMax < 0) {
//         alert("Los apartados minímo y máximo solamente pueden ser números positivos");
//         return false;
//     }
//     if (costoMin >= costoMax) {
//         alert("El costo minímo debe de ser más bajo que el costo máximo.");
//         return false;
//     }
//     costoMaximo = costoMax;
//     costoMinimo = costoMin;
//     return true;
// }

//Funcion para encontrar el maximo y el minimo de cada criterio
function encontrarMinMax(listaJuegos) {
    if (listaJuegos.length === 0) return { min: null, max: null };

    let MinimosMaximos = {
        minCosto: Math.min(...listaJuegos.map(juego => juego.costo)),
        maxPlat: Math.max(...listaJuegos.map(juego => juego.plat)),
        maxGen: Math.max(...listaJuegos.map(juego => juego.gen)),
        maxArte: Math.max(...listaJuegos.map(juego => juego.arte)),
        maxMus: Math.max(...listaJuegos.map(juego => juego.mus)),
        maxDur: Math.max(...listaJuegos.map(juego => juego.dur)),
        maxRes: Math.max(...listaJuegos.map(juego => juego.res))
    };

    return MinimosMaximos;
};

// 3. FUNCIÓN RESTAURADA: INDICADOR DE PESOS
function actualizarIndicadorPesos(prefijo = null) {
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
    
    if(elementoTotal && elementoMensaje) {
        elementoTotal.textContent = sumaTotal.toFixed(2);
        if (Math.abs(sumaTotal - 1.0) < 0.001) {
            elementoTotal.style.color = "#2e7d32";
            elementoMensaje.textContent = "¡Distribución exacta!";
            elementoMensaje.style.color = "#2e7d32";
        } else {
            elementoTotal.style.color = "#f57c00";
            elementoMensaje.textContent = "Incompleto (menor a 1.00)";
            elementoMensaje.style.color = "#f57c00";
        }
    }
}

// 4. LÓGICA ORIGINAL DE CÁLCULO Y RANKING
function calcularTodaLaMatriz() {
    const filas = Array.from(cuerpoMatriz.querySelectorAll("tr"));
    if(filas.length === 0) return;

    // DETERMINAR LOS ÍNDICES DE LAS COLUMNAS
    const tieneImagen = filas[0].cells.length === 10; 
    const idxCosto = tieneImagen ? 2 : 1;
    const idxPlat = tieneImagen ? 3 : 2;
    const idxGen = tieneImagen ? 4 : 3;
    const idxArte = tieneImagen ? 5 : 4;
    const idxMus = tieneImagen ? 6 : 5;
    const idxDur = tieneImagen ? 7 : 6;
    const idxRes = tieneImagen ? 8 : 7;
    const idxPuntaje = tieneImagen ? 9 : 8;

    // 1. EMPAQUETAR LOS DATOS (INCLUYENDO NOMBRE E IMAGEN)
    let datosExtraidos = filas.map(fila => {
        return {
            nombre: fila.cells[0].querySelector("input").value || "Sin nombre",
            img: tieneImagen ? fila.querySelector("img").src : null,
            costo: parseFloat(fila.cells[idxCosto].querySelector("input").value) || 0,
            plat: parseFloat(fila.cells[idxPlat].querySelector("select").value) || 0,
            gen: parseFloat(fila.cells[idxGen].querySelector("select").value) || 0,
            arte: parseFloat(fila.cells[idxArte].querySelector("select").value) || 0,
            mus: parseFloat(fila.cells[idxMus].querySelector("select").value) || 0,
            dur: parseFloat(fila.cells[idxDur].querySelector("select").value) || 0,
            res: parseFloat(fila.cells[idxRes].querySelector("select").value) || 0
        };
    });

    // 2. EMPAQUETAR LOS PESOS
    let pesosExtraidos = {
        costo: parseFloat(document.getElementById("matriz-costo").value) || 0,
        plat: parseFloat(document.getElementById("matriz-plataforma").value) || 0,
        gen: parseFloat(document.getElementById("matriz-genero").value) || 0,
        arte: parseFloat(document.getElementById("matriz-arte").value) || 0,
        mus: parseFloat(document.getElementById("matriz-musica").value) || 0,
        dur: parseFloat(document.getElementById("matriz-duracion").value) || 0,
        res: parseFloat(document.getElementById("matriz-resena").value) || 0
    };

    //ENCONTRAMOS LOS VALORES MAXIMOS Y MINIMOS PARA LA NORMALIZACION (SAW)
    let listaMinMax = encontrarMinMax(datosExtraidos);

    // 3. SELECCIONAR MÉTODO Y CALCULAR
    const selectorMetodo = document.getElementById("selector-metodo");
    const metodoElegido = selectorMetodo ? selectorMetodo.value : "saw";
    
    let resultadosFinales = [];

    // Llamadas a las funciones de tus otros archivos
    if(metodoElegido === "saw") {
        resultadosFinales = ejecutarSAW(datosExtraidos, pesosExtraidos, listaMinMax);
    } else if(metodoElegido === "topsis") {
        resultadosFinales = ejecutarTOPSIS(datosExtraidos, pesosExtraidos);
    } else if(metodoElegido === "ambos") {
        resultadosFinales = ejecutarSAW(datosExtraidos, pesosExtraidos, listaMinMax);
    }

    // 4. IMPRIMIR RESULTADOS EN LA COLUMNA DE PUNTAJE
    filas.forEach((fila, i) => {
        if(resultadosFinales[i] && resultadosFinales[i].puntaje !== undefined && !isNaN(resultadosFinales[i].puntaje)) {
            fila.cells[idxPuntaje].querySelector("input").value = resultadosFinales[i].puntaje.toFixed(4);
        }
    });
}

function actualizarRanking() {
    const cuerpoRanking = document.getElementById("cuerpo-ranking");
    cuerpoRanking.innerHTML = ""; 

    const filasMatriz = cuerpoMatriz.querySelectorAll("tr");
    let listaResultados = [];

    filasMatriz.forEach(fila => {
        const inputNombre = fila.cells[0].querySelector("input");
        const imgElement = fila.querySelector("img"); 
        const inputPuntaje = fila.querySelector("td:last-child input");

        if (inputNombre && inputPuntaje) {
            const nombreJuego = inputNombre.value || "Sin nombre";
            const puntajeFinal = inputPuntaje.value;
            const rutaImagen = imgElement ? imgElement.src : null;

            if (puntajeFinal !== "..." && puntajeFinal !== "") {
                listaResultados.push({
                    nombre: nombreJuego,
                    puntaje: parseFloat(puntajeFinal),
                    img: rutaImagen
                });
            }
        }
    });
    
    if (ordenDescendente) {
        listaResultados.sort((a, b) => b.puntaje - a.puntaje);
    } else {
        listaResultados.sort((a, b) => a.puntaje - b.puntaje);
    }

    let totalElementos = listaResultados.length;

    listaResultados.forEach((juego, index) => {
        const filaRanking = document.createElement("tr");

        const celdaPosicion = document.createElement("td");
        celdaPosicion.textContent = ordenDescendente ? (index + 1) : (totalElementos - index);
        filaRanking.appendChild(celdaPosicion);

        const celdaNombre = document.createElement("td");
        celdaNombre.style.display = "flex";
        celdaNombre.style.alignItems = "center";
        celdaNombre.style.gap = "10px";

        if (juego.img) {
            const imgRanking = document.createElement("img");
            imgRanking.src = juego.img;
            imgRanking.style.width = "40px";
            imgRanking.style.height = "auto";
            celdaNombre.appendChild(imgRanking);
        }

        const spanTexto = document.createElement("span");
        spanTexto.textContent = juego.nombre;
        celdaNombre.appendChild(spanTexto);
        
        filaRanking.appendChild(celdaNombre);

        const celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = juego.puntaje.toFixed(4);
        filaRanking.appendChild(celdaPuntaje);

        cuerpoRanking.appendChild(filaRanking);
    });
}

// 5. EVENT LISTENERS
document.querySelectorAll(".input-ponderacion").forEach(input => {
    input.addEventListener("input", function() {
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
            if (sumaOtros + nuevoValor > 1.0) {
                let valorPermitido = 1.0 - sumaOtros;
                valorPermitido = Math.max(0, valorPermitido);
                valorPermitido = Math.round(valorPermitido * 100) / 100;
                this.value = valorPermitido;
            }
        }

        actualizarIndicadorPesos(prefijo);

        if (prefijo === "matriz-") {
            calcularTodaLaMatriz();
            actualizarRanking();
        }
    });
});

cuerpoMatriz.addEventListener("input", function(e) {
    calcularTodaLaMatriz();
    actualizarRanking();
});

btnGenerar.addEventListener("click", function() {
    if (validacionMinMaX() === false) {
        return;
    }

    const selectAlternativas = document.getElementById("num_alter");
    const numAlternativas = parseInt(selectAlternativas.value);

    if (isNaN(numAlternativas)) {
        alert("Por favor selecciona el número de alternativas en el menú desplegable.");
        return;
    } 

    if (existeFilaGenero && existeFilaPlataforma) {
        generarTablaMatriz(numAlternativas, null);
    } else {
        alert("Debe de haber por lo menos una plataforma y un género asignados.");
        return;
    }
    
    vistaConfig.classList.add("oculto");
    vistaMatriz.classList.remove("oculto");

    actualizarIndicadorPesos("matriz-");
    calcularTodaLaMatriz();
    actualizarRanking();
});

btnAgregarGenero.addEventListener("click", agregarGeneros);
btnAgregarPlataforma.addEventListener("click", agregarPlataformas);

actualizarIndicadorPesos("config-");

if(btnOrdenarRanking) {
    btnOrdenarRanking.addEventListener("click", function() {
        ordenDescendente = !ordenDescendente;
        if (ordenDescendente) {
            btnOrdenarRanking.textContent = "Orden actual: Mayor a Menor (Invertir)";
        } else {
            btnOrdenarRanking.textContent = "Orden actual: Menor a Mayor (Invertir)";
        }
        actualizarRanking();
    });
}

if(btnCargarEjemplo) {
    btnCargarEjemplo.addEventListener("click", () => {
        document.getElementById("config-costo").value = 0.3;
        document.getElementById("config-plataforma").value = 0.1;
        document.getElementById("config-genero").value = 0.2;
        document.getElementById("config-arte").value = 0.05;
        document.getElementById("config-musica").value = 0.05;
        document.getElementById("config-duracion").value = 0.2;
        document.getElementById("config-resena").value = 0.1;
        
        costoMinimo = 120;
        costoMaximo = 1200;

        listaGeneros = [
            {nombre: "RPG", valor: 2}, {nombre: "Simulación y Gestión", valor: 2},
            {nombre: "Metroidvania", valor: 3}, {nombre: "Souls-like", valor: 4},
            {nombre: "Hack and slash", valor: 4}, {nombre: "Shooter", valor: 5}
        ];
        const cuerpoGen = document.getElementById("cuerpo-genero");
        cuerpoGen.innerHTML = "";
        listaGeneros.forEach(g => {
            cuerpoGen.innerHTML += `<tr><td>${g.nombre}</td><td>${g.valor}</td></tr>`;
        });
        existeFilaGenero = true;

        listaPlataformas = [
            {nombre: "PC", valor: 8}, {nombre: "Consola", valor: 7}, {nombre: "Todas las anteriores", valor: 10}
        ];
        const cuerpoPlat = document.getElementById("cuerpo-plataforma");
        cuerpoPlat.innerHTML = "";
        listaPlataformas.forEach(p => {
            cuerpoPlat.innerHTML += `<tr><td>${p.nombre}</td><td>${p.valor}</td></tr>`;
        });
        existeFilaPlataforma = true;

        const datosEjemplo = [
            { nombre: "Elden Ring", costo: 1200, plat: 8, gen: 4, arte: 9, mus: 10, dur: 9, res: 9, img: "imagenes/imagen1.avif" },
            { nombre: "Hollow Knight", costo: 350, plat: 10, gen: 3, arte: 10, mus: 9, dur: 9, res: 9, img: "imagenes/imagen2.jpg" },
            { nombre: "Devil May Cry 5", costo: 500, plat: 10, gen: 4, arte: 9, mus: 10, dur: 7, res: 9, img: "imagenes/imagen3.jpg" },
            { nombre: "Fallout: New Vegas", costo: 200, plat: 10, gen: 2, arte: 8, mus: 8, dur: 10, res: 9, img: "imagenes/imagen4.webp" },
            { nombre: "Stardew Valley", costo: 180, plat: 10, gen: 2, arte: 7, mus: 8, dur: 10, res: 9, img: "imagenes/imagen5.jpg" },
            { nombre: "Alice Madness Returns", costo: 300, plat: 10, gen: 4, arte: 8, mus: 9, dur: 7, res: 7, img: "imagenes/imagen6.jpg" }
        ];

        document.getElementById("num_alter").value = "6";

        generarTablaMatriz(6, datosEjemplo);

        const listaCriterios = ["costo", "plataforma", "genero", "arte", "musica", "duracion", "resena"];
        listaCriterios.forEach(criterio => {
            const inputMatriz = document.getElementById("matriz-" + criterio);
            const inputConfig = document.getElementById("config-" + criterio);
            if (inputMatriz && inputConfig) {
                inputMatriz.value = inputConfig.value;
            }
        });

        vistaConfig.classList.add("oculto");
        vistaMatriz.classList.remove("oculto");

        actualizarIndicadorPesos("matriz-");
        calcularTodaLaMatriz();
        actualizarRanking();
    });
}