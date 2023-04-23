import {inputNombre, inputTelefono, inputFecha, inputHora, inputCantidad, form} from './selectores.js';

import Citas from './Clases/Citas.js';
import UI from './Clases/Ui.js';



// Instancias Objetos

const administrarCitas = new Citas();
const ui = new UI();

let editando;

const citaObj = {
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    cantidad: ''
}

// FUNCIONES ********************************

// Agrega datos al objeto de Cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}


export function nuevaCita(e) {
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
        ui.imprimirAlerta('Se ha creado una nueva reserva')
        
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

export function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.cantidad = '';
}


// Funcion para eliminar una cita
export function eliminarCita(id) {

    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Muestra n mensaje 
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar las citas mostradas
    ui.imprimirCitas(administrarCitas)
}


// Carga los datos y activa el modo edición
export function cargarEdicion(citaEditable) {
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