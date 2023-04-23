// VARIABLES ********************************

const form = document.querySelector('#nueva-cita');
const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputCantidad = document.querySelector('#cantidad');
const reservasActualesContainer = document.querySelector('#reservasActualesContainer');
let editando;

// EVENT LISTENERS ********************************

form.addEventListener('submit', nuevaCita)
inputNombre.addEventListener('change', datosCita)
inputTelefono.addEventListener('change', datosCita)
inputFecha.addEventListener('change', datosCita)
inputHora.addEventListener('change', datosCita)
inputCantidad.addEventListener('change', datosCita)

// CLASES Y OBJETOS ********************************

const citaObj = {
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    cantidad: ''
}


class Citas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }

}

class UI{
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'rounded-md', 'w-full', 'absolute', 'py-6');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('bg-red-600', 'text-white');
        } else {
             divMensaje.classList.add('bg-lime-600', 'text-white');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#main').insertBefore( divMensaje, document.querySelector('.contenido'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => { 
            divMensaje.remove();
        }, 3000);
   }

// Se puede aplicar destructuring desde la función...
   imprimirCitas({citas}) { 
       
    this.limpiarHTML();

    citas.forEach(cita => {
        const {nombre, telefono, fecha, hora, cantidad, id } = cita;

        const divCita = document.createElement('div');
        divCita.classList.add('bg-gray-800', 'p-3', 'my-2');
        divCita.dataset.id = id;

        // Scripting de los elementos...
        const nombreH2 = document.createElement('h2');
        nombreH2.classList.add('bg-yellow-300', 'text-gray-900', 'uppercase');
        nombreH2.innerHTML = `<span>Reserva a nombre de: </span> ${nombre}`;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `<span >Teléfono: </span> ${telefono}`;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span >Fecha: </span> ${fecha}`;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span >Hora: </span> ${hora}`;

        const cantidadParrafo = document.createElement('p');
        cantidadParrafo.innerHTML = `<span >Cantidad de Personas: </span> ${cantidad}`;

        //Agregar un contenedor para los botones de eliminar y editar
        const containerButtons = document.createElement('div');
        containerButtons.classList.add('flex', 'justify-around', 'items-center', 'md:w-3/5', 'mx-auto', 'mt-2');
        
        //Agregar un botón de eliminar...
        const btnEliminar = document.createElement('button');
        btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
        btnEliminar.classList.add('bg-red-500', 'text-white', 'rounded-xl', 'flex', 'justify-center', 'items-center', 'w-2/5');
        btnEliminar.innerHTML = '<span>Eliminar</span><svg class="w-3/12 h-1/5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

        // Añade un botón de editar...
         const btnEditar = document.createElement('button');
         btnEditar.onclick = () => cargarEdicion(cita);

         btnEditar.classList.add('bg-green-500', 'text-white', 'rounded-xl', 'flex', 'justify-center', 'items-center', 'w-2/5');
         btnEditar.innerHTML = 'Editar <svg class="w-3/12 h-1/5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

         containerButtons.appendChild(btnEliminar)
         containerButtons.appendChild(btnEditar)

        // Agregar al HTML
        divCita.appendChild(nombreH2);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(cantidadParrafo);
        divCita.appendChild(containerButtons);


        reservasActualesContainer.appendChild(divCita);
    });    
}

    limpiarHTML() {
        while(reservasActualesContainer.firstChild) {
            reservasActualesContainer.removeChild(reservasActualesContainer.firstChild);
        }
    }

}


const administrarCitas = new Citas();
const ui = new UI();


// FUNCIONES ********************************

// Agrega datos al objeto de Cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}


function nuevaCita(e) {
    e.preventDefault();
    const {nombre, telefono, fecha, hora, cantidad } = citaObj;

    // Validar
    if( nombre === '' || telefono === '' || fecha === ''  || hora === '' || cantidad === '' ) {
        ui.imprimirAlerta('Todos los campos son Obligatorios', 'error')

        return;
    }


    if (editando) {
        // Mensaje de edición de nueva cita
        ui.imprimirAlerta('Se ha editado Correctamente')

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});

        //Regresar el texto original del Botón 
        form.querySelector('button[type="submit"]').textContent = "Crear Cita";

        // Quitar el modo edición
        editando = false;
    } else {
        
        // Mensaje de creacion de nueva cita
        ui.imprimirAlerta('Se ha creado una nueva cita')
        
        // generar un id único
        citaObj.id = Date.now();
        
        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});
    }


    // Reiniciar el formulario
    form.reset();
    
    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    //Reiniciando objeto
    reiniciarObjeto();

}


// Reiniciar el objeto

function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.cantidad = '';
}


// Funcion para eliminar una cita
function eliminarCita(id) {

    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Muestra n mensaje 
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar las citas mostradas
    ui.imprimirCitas(administrarCitas)
}


// Carga los datos y activa el modo edición
function cargarEdicion(citaEditable) {
    const {nombre, telefono, fecha, hora, cantidad, id } = citaEditable;
    
    // Llenar los inpus a editar
    inputNombre.value = nombre;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputCantidad.value = cantidad;

    // Llenar el objeto
    citaObj.nombre = nombre;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.cantidad = cantidad;
    citaObj.id = id;


    //Cambiar el texto del Botón del formulario
    form.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

    // Activando el modo edición
    editando = true;

}

