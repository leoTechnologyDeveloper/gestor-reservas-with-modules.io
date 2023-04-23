import {nuevaCita, datosCita} from '../funciones.js';
import {form, inputNombre, inputTelefono, inputFecha, inputHora, inputCantidad} from '../selectores.js';

class App {

    constructor(){
        this.initApp();
    }

    initApp(){
        form.addEventListener('submit', nuevaCita)
        inputNombre.addEventListener('change', datosCita)
        inputTelefono.addEventListener('change', datosCita)
        inputFecha.addEventListener('change', datosCita)
        inputHora.addEventListener('change', datosCita)
        inputCantidad.addEventListener('change', datosCita)
    }

}

export default App;