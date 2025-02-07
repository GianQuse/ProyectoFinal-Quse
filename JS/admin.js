const iniciarAdmin = () => {

    const buscadorName = document.getElementById("filtroName")
    const buscadorLastName = document.getElementById("filtroLastName")
    const buscadorDni = document.getElementById("filtroDni")
    const buscadorEvento = document.getElementById("evento")
    const contenedor = document.getElementById("resultado");

    function filtrar(parametro) {

        contenedor.innerHTML = ""; // Limpiar contenedor para que no queden datos viejos.-

        if (parametro.length === 0) {
            const noDate = document.createElement("h3")
            noDate.textContent = `NO SE ENCONTRO NINGUN DATO`;
            contenedor.appendChild(noDate);
        } else {
            for (let index = 0; index < parametro.length; index++) {
                const h4 = document.createElement("h4");
                const h4dni = document.createElement("h4");
                const h4tel = document.createElement("h4");
                const h4correo = document.createElement("h4");
                const h3total = document.createElement("h3");
                h4.textContent = `Nombre y Apellido: ${parametro[index].nombre} ${parametro[index].apellido}`;
                h4dni.textContent = `DNI: ${parametro[index].dni}`
                h4tel.textContent = `Telefono: ${parametro[index].telefono}`
                h4correo.textContent = `Correo: ${parametro[index].correo}`
                h3total.textContent = `Total: $${parametro[index].costoTotal[0]}`;
                contenedor.appendChild(h4);
                contenedor.appendChild(h4dni);
                contenedor.appendChild(h4tel);
                contenedor.appendChild(h4correo);
                contenedor.appendChild(h3total);

                for (let e = 0; e < parametro[index].servicio.length; e++) {
                    const p = document.createElement("p");
                    p.textContent = `- ${parametro[index].servicio[e]}`;
                    contenedor.appendChild(p);
                }
            }
        }
    }

    function circuloCarga() {
        const circuloCarga = document.createElement('div');
        circuloCarga.className = 'spinner';
        contenedor.innerHTML = "";
        contenedor.appendChild(circuloCarga);
    }

    document.getElementById("buscarNombre").addEventListener("click", () => {
        document.getElementById("formularioName").classList.remove("display")
        document.getElementById("formularioLastName").classList.add("display")
        document.getElementById("formularioDni").classList.add("display")
        buscadorEvento.selectedIndex = 0;

        buscadorName.addEventListener("keydown", async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                circuloCarga();

                try {
                    let contratosCerrados = await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(JSON.parse(localStorage.getItem("contratosCerrados")));
                        }, 2000);
                    });

                    contratosCerrados === null ? contratosCerrados = [] : contratosCerrados;
                    const filtro = contratosCerrados.filter(acumulador => acumulador.nombre === buscadorName.value.toUpperCase());
                    filtrar(filtro);

                } catch (error) {
                    console.error("Error al obtener los contratos cerrados:", error);
                }

                buscadorName.value = ""; // Deja el input vacío para ingresar otro dato
            }
        });
    })

    document.getElementById("buscarApellido").addEventListener("click", () => {
        document.getElementById("formularioName").classList.add("display")
        document.getElementById("formularioLastName").classList.remove("display")
        document.getElementById("formularioDni").classList.add("display")
        buscadorEvento.selectedIndex = 0;

        buscadorLastName.addEventListener("keydown", async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                circuloCarga();

                try {
                    let contratosCerrados = await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(JSON.parse(localStorage.getItem("contratosCerrados")));
                        }, 2000);
                    });

                    contratosCerrados === null ? contratosCerrados = [] : contratosCerrados;
                    const filtro = contratosCerrados.filter(acumulador => acumulador.apellido === buscadorLastName.value.toUpperCase());
                    filtrar(filtro);

                } catch (error) {
                    console.error("Error al obtener los contratos cerrados:", error);
                }

                buscadorLastName.value = ""; // Deja el input vacío para ingresar otro dato
            }
        });
    })

    document.getElementById("buscarDni").addEventListener("click", () => {
        document.getElementById("formularioName").classList.add("display")
        document.getElementById("formularioLastName").classList.add("display")
        document.getElementById("formularioDni").classList.remove("display")
        buscadorEvento.selectedIndex = 0;

        buscadorDni.addEventListener("keydown", async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                circuloCarga();

                try {
                    let contratosCerrados = await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(JSON.parse(localStorage.getItem("contratosCerrados")));
                        }, 2000);
                    });

                    contratosCerrados === null ? contratosCerrados = [] : contratosCerrados;
                    const filtro = contratosCerrados.filter(acumulador => acumulador.dni === buscadorDni.value);
                    filtrar(filtro);

                } catch (error) {
                    console.error("Error al obtener los contratos cerrados:", error);
                }

                buscadorDni.value = ""; // Deja el input vacío para ingresar otro dato
            }
        });
    })

    buscadorEvento.addEventListener('change', async function () {

        circuloCarga();

        try {
            let contratosCerrados = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(JSON.parse(localStorage.getItem("contratosCerrados")));
                }, 2000);
            });

            contratosCerrados === null ? contratosCerrados = [] : contratosCerrados;
            const filtro = contratosCerrados.filter(acumulador => acumulador.evento[0] === buscadorEvento.value);
            filtrar(filtro);

        } catch (error) {
            console.error("Error al obtener los contratos cerrados:", error);
        }
    });

    document.getElementById("refrescar").addEventListener("click", () => {
        window.location.href = "../index.html";
    })

}

iniciarAdmin();