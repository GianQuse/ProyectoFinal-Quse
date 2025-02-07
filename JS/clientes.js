//CLASS CREAR CLIENTE---------------------------------------------------------------------
const eventosContratados = [];

class DatosCliente {
    nombre = "";
    apellido = "";
    dni = "";
    telefono = "";
    correo = "";
    evento = [];
    servicio = [];
    costoTotal = [];

    constructor(nombre, apellido, dni, telefono, correo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.correo = correo;
        this.evento = [];
        this.servicio = [];
        this.costoTotal = [];
    }

    agregarCliente() {
        eventosContratados.push(this)
    }
}

//CLASS CREAR SERVICIOS CONTRATADOS Y SE GUARDAN EN SERVICIO DE "DATOS CLIENTE"---------------
class EventoContratado {
    tipoEvento = "";
    servicio = "";
    total = 0;

    constructor(tipoEvento, servicio, total) {
        this.tipoEvento = tipoEvento;
        this.servicio = servicio;
        this.total = total;
    }

    agregarTipoEvento() {
        eventosContratados[0].evento.push(this.tipoEvento);
    }

    agregarEvento() {
        eventosContratados[0].servicio.push(this.servicio);
    }

    agregarCosto() {
        eventosContratados[0].costoTotal.push(this.total);
    }
}

//FUNCION CREAR CHECKBOXES CON LOS SERVICIOS---------------------------------------------------------

function crearCheckboxes(dataServicios) {
    const container = document.getElementById('checkboxesContainer');
    const costoTotal = document.getElementById("costoTotal");

    dataServicios.forEach((evento) => {
        const div = document.createElement('div');
        div.classList.add('form-check');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.name = evento.servicio;
        checkbox.value = evento.precio;
        checkbox.id = `checkbox-${evento.Id}`;

        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = checkbox.id;
        label.innerText = `${evento.servicio} $${evento.precio}`;

        div.appendChild(checkbox);
        div.appendChild(label);

        container.insertBefore(div, costoTotal);
    });
}

const paginaPrincipal = (param) => {
    document.getElementById(param).addEventListener("click", () => {
        window.location.href = "../index.html";
    })
}

//FUNCION RECARGAR PAGINA----------------------------------------------
function recargarPagina() {
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 3000);
}
//---------------------------------------------------------------------

//FUNCION CLASS MOSTRAR/OCULTAR---------------------------
const ocultarMostrar = (param) => {
    document.getElementById(param).classList.toggle("display")
}
//----------------------------------------------------

//FUNCION RECUPERAR CLIENTES localSorage----------------------------------------------
const recuperarLocalStorage = () => {
    return contratosExistentes = JSON.parse(localStorage.getItem("contratosCerrados")) || [];
}
//-------------------------------------------------------------------------------------

//FUNCION INICIAR COMO CLIENTE-----------------------------------------------------------------

const iniciarCliente = () => {

    //CREAR NUEVO CLIENTE----------------------------------------------------------------------
    let nombreCliente = "";
    let apellidoCliente = "";
    let dniCliente = "";
    let telCliente = "";
    let correoCliente = "";

    recuperarLocalStorage()
    const dniInput = document.getElementById("dni");
    const buttonForm = document.getElementById("enviarForm");
    const mensajeDni = document.getElementById("mensajeDni");

    dniInput.addEventListener('input', () => {
        let compararDni = contratosExistentes.find(acumulador => acumulador.dni === dniInput.value);
        if (compararDni !== undefined) {
            mensajeDni.classList.remove("display")
            buttonForm.disabled = true;
        } else {
            mensajeDni.classList.add("display")
            buttonForm.disabled = false;
        }
    });

    document.getElementById("formularioCliente").addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        for (const [name, value] of formData.entries()) {
            if (name === "nombreCliente") {
                nombreCliente = value.toUpperCase();
            } else if (name === "apellidoCliente") {
                apellidoCliente = value.toUpperCase();
            } else if (name === "dniCliente") {
                dniCliente = value;
            } else if (name === "telCliente") {
                telCliente = value;
            } else if (name === "correoCliente") {
                correoCliente = value;
                correoCliente = correoCliente || "Sin correo";
            }
        }

        let nuevoCliente = new DatosCliente(nombreCliente, apellidoCliente, dniCliente, telCliente, correoCliente);
        nuevoCliente.agregarCliente();

        ocultarMostrar("formularioCliente")
        ocultarMostrar("contenedorEvento")
    });
    paginaPrincipal("principal1");
    //------------------------------------------------------------------------------------------

    //SELECCION DE EVENTO Y CREAR CHECKBOXES------------------------------------------------------
    let eventoSeleccionado = "";
    fetch('/servicios.json')
        .then(response => response.json())
        .then(data => {
            let pBoda = document.createElement('p');
            pBoda.textContent = `${data.eventoBoda[0].nombreEvento}`;
            pBoda.classList.add('pointer');
            pBoda.addEventListener("click", () => {
                eventoSeleccionado = data.eventoBoda[0].nombreEvento
                ocultarMostrar("contenedorEvento");
                crearCheckboxes(data.eventoBoda);
                ocultarMostrar("contenedorCheckbox");
            })
            document.getElementById('imgBoda').appendChild(pBoda);

            let pCumpleaños = document.createElement('p');
            pCumpleaños.textContent = `${data.eventoCumpleaños[0].nombreEvento}`;
            pCumpleaños.classList.add('pointer');
            pCumpleaños.addEventListener('click', () => {
                eventoSeleccionado = data.eventoCumpleaños[0].nombreEvento
                ocultarMostrar("contenedorEvento")
                crearCheckboxes(data.eventoCumpleaños);
                ocultarMostrar("contenedorCheckbox")
            });
            document.getElementById('imgCumple').appendChild(pCumpleaños);

            let pRecepcion = document.createElement('p');
            pRecepcion.textContent = `${data.eventoRecepcion[0].nombreEvento}`;
            pRecepcion.classList.add('pointer');
            pRecepcion.addEventListener('click', () => {
                eventoSeleccionado = data.eventoRecepcion[0].nombreEvento
                ocultarMostrar("contenedorEvento")
                crearCheckboxes(data.eventoRecepcion);
                ocultarMostrar("contenedorCheckbox")
            });
            document.getElementById('imgBautismo').appendChild(pRecepcion);
        });

    paginaPrincipal("principal2");

    //---------------------------------------------------------------------------------------

    //MOSTRAR COSTO TOTAL-------------------------------------------------------------------
    const costoTotal = document.getElementById("costoTotal");
    const checkboxContainer = document.getElementById("checkboxesContainer");
    const submitButton = document.getElementById("submitButton");
    let total;

    checkboxContainer.addEventListener('change', () => {
        total = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .reduce((acc, checkedCheckbox) => acc + parseFloat(checkedCheckbox.value), 0);

        costoTotal.innerHTML = `Total $${total}`;

        if (total === 0) {
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    });

    //---------------------------------------------------------------------------------------

    //ENVIAR FORMULARIO CON DATOS CHECKBOX AL LOCALSTORAGE-----------------------------------

    submitButton.addEventListener('click', () => {
        recuperarLocalStorage();

        let evento;

        const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                evento = new EventoContratado(eventoSeleccionado, checkbox.name, total);
                evento.agregarEvento();
            }
        });

        evento.agregarTipoEvento();
        evento.agregarCosto();

        localStorage.setItem("contratosCerrados", JSON.stringify(eventosContratados.concat(contratosExistentes)))

        ocultarMostrar("checkboxesContainer")
        Swal.fire({
            title: "Servicios contratados",
            html: "Gracias por elegirnos.",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
        });
        recargarPagina()
    });

    //---------------------------------------------------------------------------------------
}

iniciarCliente();