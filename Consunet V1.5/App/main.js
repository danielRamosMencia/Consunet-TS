//=======================================
/**
 * @global Variables globales.
 */
//Variable contador para generar id autoincremental por dispositivo para cada elemento.
let counter = 0;
//Nos servirá para almacenar todos los nodos de los elementos html que contienen los totales de cada dispositovo
let all_clones;
//Nos servirá para generar el valor del rendimiento
let tmp_test = 0;
//Nos servirá para almacenar y mostrar el valor del consumo total 
let tmp_total = 0;
//Nos servirá para verificar el porcentaje de uso
let range = 0;
//Referencia a la etiqueta <ul> que contiene los elementos de la lista de dispositivos.
const devicesList = document.getElementById("devicesList")
//Referencia a la etiqueta <input> en la cual muestra la cantidad de dispositivos en la lista.
const inputDispositivosConectados = document.getElementById("inputDispositivosConectados");
//Referencia a la etiqueta <input> que muestra el estado de la conexión.
const inputRendimiento = document.getElementById("inputRendimiento");
//Referencia a la etiqueta <input> que muestra el consumo total
const inputTotal = document.getElementById("inputTotal");
//Referencia a la etiqueta con el valor del ancho de banda de la conexión.
const inputAnchoDeBanda = document.getElementById("inputAnchoDeBanda");
//Referencia al botón con el modal para agregar dispositivos
const buttonAddModal = document.getElementById("AddButton");
//Referencia al botón con el modal para crear nuevos dispositivos
const createDevice = document.getElementById("createDevice");
//Referencia al select del formulario de agregar dispositivos 
const selectAddDevice = document.getElementById("selectAddDevice");

//=======================================
/**
 * @description Cada que se invoca la función se incrementa el valor 1 para simular un id autoincremental.
 * @returns counter
 * Valor de la variable global "counter" incrementado en 1.
 * @implements No se está utilizando
 */
function count_elements() {
    counter++;
    return counter;
}

//=======================================
/**
 * @description Genera un nuevo elemento <button> e <i>, para asignar estilos a cada uno. 
 * @params action: valor entero, valor 0 para indicar que se crea un botón de eliminado para
 * un dispositivo nuevo, en otro caso, (valor 1) para que sea un botón de eliminado de 
 * actividad.
 * @returns new_delete_button: Tag HTML del botón para eliminar el dispositivo agregado.
 * @implements se invoca en: "create_device()".
 */
function create_delete_button(action) { 
    //Crear Botón
    const new_delete_button = document.createElement("button");
    
    //Caso 0
    if(action == 0){
        //Icono
        const button_icon = document.createElement("i");
        //Asignaciones de clases y estilos
        button_icon.classList.add("bi", "bi-trash3");
        button_icon.textContent = " Eliminar";
        new_delete_button.classList.add("btn", "btn-danger", "border", "border-dark", "mt-2");
        
        //Unificar botón con icono
        new_delete_button.appendChild(button_icon);
    }else {
        //Asignaciones de clases y estilos
        new_delete_button.classList.add("btn", "btn-danger");
        new_delete_button.textContent = "X";
    }
    
    //Retorno
    return new_delete_button;
}

//=======================================
/**
 * @description Obtiene el nombre y la src de la imagen según el dispositivo seleccionado por el usuario.
 * Almacena los valores en las variables name y url respectivamente, para selecionarlos según el
 * valor del elemeto <select> en el formulario. Guarda dichos valores en un arreglo.
 * @returns device_info: Arreglo con la información del nombre y src de la imagen del dispositivo seleccionado.
 * @implements se invoca en: "create_device()".
 */
function get_device() {
    //Referencias
    const selectAddDevice = document.getElementById("selectAddDevice").value;

    //Variables
    const device_info = [];
    let url = "";
    let name = "";

    //Selección y asignación
    switch(selectAddDevice){
    case "1":
        url = "../images/smartphone.jpeg"
        name = "SMARTPHONE"
        device_info[0] = url;
        device_info[1] = name;
        break;
    case "2":
        url = "../images/laptop.jpeg"
        name = "LAPTOP"
        device_info[0] = url;
        device_info[1] = name;
        break;
    case "3":
        url = "../images/pcEscritorio.jpeg"
        name = "COMPUTADORA DE ESCRITORIO"
        device_info[0] = url;
        device_info[1] = name;
        break;
    case "4":
        url = "../images/tablet.jpeg"
        name = "TABLET"
        device_info[0] = url;
        device_info[1] = name;
        break;
    case "5":
        url = "../images/tv.jpeg"
        name = "TELEVISOR"
        device_info[0] = url;
        device_info[1] = name;
        break;
    case "6":
        url = "../images/dispositivoUsuario.jpeg"
        name = "DISPOSITIVO DE USUARIO"
        device_info[0] = url;
        device_info[1] = name;
        break;
    }
    //Retorno
    return device_info;
}

//=======================================
/**
 * @description Genera el consumo de datos de forma aleatoria según la actividad. 
 * @param opt: toma el valor del atributo "value" en cada option del select para 
 * identificar la actividad y el consumo asociado a ella.
 * @returns consumption: El consumo de datos generado para mostrar al usuario.
 * @implements se invoca en: "create_devide()".
 */
function generate_MB(opt) {
    //Variables valor máximo y mínimo.
    let min;
    let max;
    //Variable del consumo
    let consumption;
    
    //Selección
    switch(opt){
        case "1":
            min = 1;
            max = 3;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
            break;
        case "2":
            min = 1;
            max = 2;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
            break;
        case "3":
            min = 3;
            max = 6;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
            break;
        case "4":
            min = 6;
            max = 9;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
            break;
        case "5":
            min = 10;
            max = 15;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "6":
            min = 5;
            max = 8;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "7":
            min = 9;
            max = 14;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "8":
            min = 7;
            max = 11;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "9":
            min = 5;
            max = 8;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "10":
            min = 10;
            max = 15;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
        case "11":
            min = 5;
            max = 10;
            consumption = parseInt(Math.random() * (1 + max - min) + min);
        break;
    }
    
    //Retorno
    return consumption;
}

//=======================================
/**
 * @description crea los tags HTML necesarios para anexar una actividad a la lista a modo
 * de sub menú para cada dispositivo, y asigna los valores del nombre y el ancho de banda.
 * @params name_content: Es el nombre de la actividad que hemos seleccionado.
 * @params bandwidth_content: El consumo de datos generado para la actividad.
 * @returns new_li: Tag HTML <li> con los datos y estructura necesaria para mostrar al usuario.
 * @implements se implementa en: "create_device()".
 */
function create_activity(name_content, bandwidth_content) {
    //Elementos creados
    const new_li = document.createElement("li");
    const new_p1 = document.createElement("p");
    const new_in = document.createElement("input")
    
    //Asignación de clases, estilos y atributos
    new_li.classList.add("list-item", "d-flex", "align-items-center");
    new_p1.classList.add("form-control", "mt-3");
    new_in.classList.add("form-control");
    new_in.setAttribute("type","number");
    new_in.setAttribute("disabled","true");

    //Asignación de contenidos seleccionados
    new_p1.textContent = name_content;
    new_li.appendChild(new_p1);
    new_in.value = bandwidth_content;
    new_li.appendChild(new_in);

    //Nueva actividad que se anexará al dispositivo
    return new_li;
}

//=======================================
/**
 * @description Se asigna el botón de eliminado y la información del dispositivo (nombre e imagen) en variables.
 * Se referencia al template de <li> definido en main.html para crear un fragmento.
 * Se clona el template para manipularlo y se le asigna la información del dispositivo.
 * Con un eventListener se genera un eliminado dinámico a través del elemento padre del botón (li).
 * Se implementa la funcionalidad de agregar varias actividades al dispositivo.
 * A las actividades se les agrega la asignación y calculo de valores automàtico con un eventListner.
 * Al fragmento creado se lo enlaza el clon, y el fragmento se anexa en la lista de dispositivos.
 * Se hace un conteo de la cantidad de dispositivos conectados (fragmentos <li> en la lista <ul>).
 * @implements botón con id: "add".
 */
function create_device() {
    //Botón de borrado e información del dispositivo    
    let delete_button = create_delete_button(0);
    let info_url_name = get_device();

    //Referencia al template y creación de fragmento HTML
    const template = document.getElementById("elementTemplate").content;
    const fragment = document.createDocumentFragment();

    //------Creación y asignación dinámica-----
    //Clonar el template
    let clone = document.importNode(template, true);
    //Asignar atributos
    clone.querySelector("img").setAttribute("src",info_url_name[0]);
    clone.querySelector("h4").textContent = info_url_name[1];
    //Agregar boton de borrado al clon
    clone.querySelector("li").appendChild(delete_button);

    //Conectado dinámico
    const connectButton = clone.querySelector("input[type=checkbox]");
    const labelConnectButton = clone.querySelector(".form-label-checkbox");
    let selectOutput = clone.querySelector(".form-select");
    let totalOutput = clone.querySelector(".text-start");
    
    console.log(labelConnectButton);
    connectButton.addEventListener("click", (event) => {
        if(connectButton.value == 1){
            connectButton.value = 0;
            labelConnectButton.textContent = "Desconectar";
            selectOutput.removeAttribute("disabled");
            counter = counter + 1
            inputDispositivosConectados.value = counter;
            let all_device_activies = internal_ul.querySelectorAll("input[type=number]")
            let k = calculate_consumptions(all_device_activies)
            totalOutput.value = k;
            let all_clones = devicesList.querySelectorAll("input[type=text]")
            tmp_total = calculate_consumptions(all_clones);
            inputTotal.value = tmp_total
            tmp_test = (tmp_total / parseInt(inputAnchoDeBanda.value)) * 100;
            inputRendimiento.value = tmp_test.toFixed(2) +"%";
            range = Math.round(tmp_test)
            //Modificar el color del rendimiento
            if (range <= 60){
                inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
                inputRendimiento.classList.add("border-success");
                inputRendimiento.classList.add("border-2");
            }else if(range <= 90){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
                inputRendimiento.classList.add("border-warning");
                inputRendimiento.classList.add("border-2");
            }else if(range >= 91){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
                inputRendimiento.classList.add("border-danger");
                inputRendimiento.classList.add("border-2");
            }
            
        }else{
            connectButton.value = 1;
            counter = counter - 1; 
            inputDispositivosConectados.value = counter;
            labelConnectButton.textContent = "Conectar";
            selectOutput.setAttribute("disabled","disabled");
            totalOutput.value = 0;
            let all_clones = devicesList.querySelectorAll("input[type=text]")
            tmp_total = calculate_consumptions(all_clones);
            inputTotal.value = tmp_total
            tmp_test = (tmp_total / parseInt(inputAnchoDeBanda.value)) * 100;
            inputRendimiento.value = tmp_test.toFixed(2) +"%";
            range = Math.round(tmp_test)
            //Modificar el color del rendimiento
            if (range <= 60){
                inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
                inputRendimiento.classList.add("border-success");
                inputRendimiento.classList.add("border-2");
            }else if(range <= 90){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
                inputRendimiento.classList.add("border-warning");
                inputRendimiento.classList.add("border-2");
            }else if(range >= 91){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
                inputRendimiento.classList.add("border-danger");
                inputRendimiento.classList.add("border-2");
            }
        }
    });

    //-----Eliminado dinámico-----
    //Agregar evento al botón
    delete_button.addEventListener("click", (event) =>{
        //Referencia al elemento padre del botón
        const item = delete_button.parentElement;
        //Alerta de confirmación de eliminado
        Swal.fire({
            title: "Confirmación.",
            text: "¿Está seguro que desea eliminar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) =>{
            //Aceptación de borrado
            if (result.isConfirmed) {
                //Borrar elemento de la lista
                devicesList.removeChild(item);
                //Conteo de elementos
                inputDispositivosConectados.value = devicesList.childElementCount;
                //Calcular totales
                all_clones = devicesList.querySelectorAll("input[type=text]");
                //Asignar valor al input de rendimiento y de consumo total para mostrarlo al usuaior
                tmp_total = calculate_consumptions(all_clones);
                inputTotal.value = tmp_total
                tmp_test = (tmp_total / parseInt(inputAnchoDeBanda.value)) * 100;
                inputRendimiento.value = tmp_test.toFixed(2) +"%";
                range = Math.round(tmp_test);
                //Modificar el color del rendimiento
                if (range <= 60){
                    inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
                    inputRendimiento.classList.add("border-success");
                    inputRendimiento.classList.add("border-2");
                }else if(range <= 90){
                    inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
                    inputRendimiento.classList.add("border-warning");
                    inputRendimiento.classList.add("border-2");
                }else if(range >= 91){
                    inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
                    inputRendimiento.classList.add("border-danger");
                    inputRendimiento.classList.add("border-2");
                }
                //Alerta de éxito
                Swal.fire({
                    title: "Dispositivo eliminado.",
                    icon: "success",
                    confirmButtonText: 'Listo',
                    timer: 1500,
                    timerProgressBar: true
                })
            }
        })
    })

    //-----Agregado de actividades dinámico-----
    //Referencia al select del dispositivo
    const sel_options = clone.querySelector("select");
    //Referencia a los inputs asociados al dispositivo
    const i = clone.querySelector("input[type=text]");
    //Referencia a la lista ul dentro de cada dispositivo
    const internal_ul = clone.querySelector("ul");
    
    sel_options.addEventListener("change", (event) =>{
        //Se obtiene el valor y el nombre de la actividad seleccionada
        let n = sel_options.selectedIndex;
        let act_name = sel_options.options[n].text;
        //---Se crea el consumo enviando los atributos de "value" y "text"---
        //Consumo de ancho de banda
        let bandwidth = generate_MB(sel_options.value);
        //Actividad
        let activity = create_activity(act_name, bandwidth);
        //Botón de eliminado
        let erase_button = create_delete_button(1);
        
        //Se le agrega el botón de eliminado a cada actividad
        activity.appendChild(erase_button);
        //Se agrega la actividad a la lista.
        internal_ul.appendChild(activity);

        //------Cálculo dinámico de consumo-----
        let all_device_activies = internal_ul.querySelectorAll("input[type=number]");
        //Se asigna el total calculado al input
        i.value = calculate_consumptions(all_device_activies);
        //El total de totales
        tmp_total = calculate_consumptions(all_clones);
        inputTotal.value = tmp_total
        tmp_test = (tmp_total / parseInt(inputAnchoDeBanda.value)) * 100;
        inputRendimiento.value = tmp_test.toFixed(2) +"%";
        range = Math.round(tmp_test)
        if (range <= 60){
            inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
            inputRendimiento.classList.add("border-success");
            inputRendimiento.classList.add("border-2");
        }else if(range <= 90){
            inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
            inputRendimiento.classList.add("border-warning");
            inputRendimiento.classList.add("border-2");
        }else if(range >= 91){
            inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
            inputRendimiento.classList.add("border-danger");
            inputRendimiento.classList.add("border-2");
        }
        
        //-----Eliminado dinámico-----
        erase_button.addEventListener("click", (event) => {
            const internal_item = erase_button.parentElement;
            internal_ul.removeChild(internal_item);
            //Se vuelve a calcular el total
            i.value = calculate_consumptions(internal_ul.querySelectorAll("input[type=number]"));
            //Se vuelve a calcular el total de totales
            tmp_total = calculate_consumptions(all_clones);
            inputTotal.value = tmp_total;
            tmp_test = (tmp_total / parseInt(inputAnchoDeBanda.value)) * 100;
            inputRendimiento.value = tmp_test.toFixed(2) +"%";
            range = Math.round(tmp_test)
            
            if (range <= 60){
                inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
                inputRendimiento.classList.add("border-success");
                inputRendimiento.classList.add("border-2");
            }else if(range <= 90){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
                inputRendimiento.classList.add("border-warning");
                inputRendimiento.classList.add("border-2");
            }else if(range >= 91){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
                inputRendimiento.classList.add("border-danger");
                inputRendimiento.classList.add("border-2");
            }
        })
    });

    //El clon del template se le asigna al fragmeto
    fragment.appendChild(clone);
    //Se asigna el fragmento a la lista (se muestra en pantalla al usuario)
    devicesList.appendChild(fragment);
    //Referencia a todos los inputs de consumo total
    all_clones = devicesList.querySelectorAll("input[type=text]");
    //Conteo de dispositivos
    //inputDispositivosConectados.value = devicesList.childElementCount;
    
}

//=======================================
/**
 * @description Controla el actualizar la conexión escogida por el usuario. 
 * Hace referencia a los elementos del formulario que almacenan la información de la conexión actual.
 * Se controla la selección de una conexión al usuario, si se actualiza con la conexión por defecto
 * Se lanza una alerta indicando que se debe seleccionar una conexión, caso contrario, se asigna un 
 * nuevo valor al atributo src que contiene la imagen de la conexión y se muestra un alerta de confimación.
 * Control del ingreso de un ancho de banda por el usuario para comenzar a agregar dispositivos.
 * Se lanza una alerta indicando que debe llenar este campo, caso contrario se actualiza y se habilita
 * el botón de agregar dispositivos
 * @implements se invoca en botón con contenido: "Actualizar". 
 */
function update_connection() {
    //Referencias
    const inputTipoDeConexion = document.getElementById("inputTipoDeConexion").value;
    const connectionIMG = document.getElementById("connectionIMG");

    let x, y, z;

    //Condiciones
    if (inputTipoDeConexion == 0){
        Swal.fire({
            title: "¡Debe escoger una conexión!",
            icon: "info",
        })
    }else if (inputAnchoDeBanda.value == ''){
        Swal.fire({
            title: "¡Debe ingresar un ancho de banda!",
            icon: "info",
        })
    }else if(inputAnchoDeBanda.value < 1){
        Swal.fire({
            title: "¡Debe ingresar un ancho de banda mayor a 0!",
            icon: "info",
        })
    }else {
        //Descomentar al final
        buttonAddModal.removeAttribute("disabled");
        buttonAddModal.classList.replace("btn-info","btn-primary");
        createDevice.removeAttribute("disabled");
        createDevice.classList.replace("btn-info","btn-primary");
        switch(inputTipoDeConexion){
            case "1":
                connectionIMG.setAttribute("src","../Images/inalambrico.jpeg");
                break;
            case "2":
                connectionIMG.setAttribute("src","../Images/cableado.jpeg");
                break;
            case "3":
                connectionIMG.setAttribute("src","../Images/fibraOptica.jpeg");
                break;
            case "4":
                connectionIMG.setAttribute("src","../Images/satelital.jpeg");
                break;    
        }

        //Actualizar valor de rendimiento en caso de modificar la conexión
        if (devicesList.childElementCount != 0){
            x = devicesList.querySelectorAll("input[type=text]");
            y = calculate_consumptions(x);
            inputTotal.value = y;
            z = (y / parseInt(inputAnchoDeBanda.value)) * 100;
            inputRendimiento.value = z.toFixed(2) + "%";
            range = Math.round(z);
            if (range <= 60){
                inputRendimiento.classList.remove("border-dark", "border-warning", "border-danger");
                inputRendimiento.classList.add("border-success");
                inputRendimiento.classList.add("border-2");
            }else if(range <= 90){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-danger");
                inputRendimiento.classList.add("border-warning");
                inputRendimiento.classList.add("border-2");
            }else if(range >= 91){
                inputRendimiento.classList.remove("border-dark", "border-success", "border-warning");
                inputRendimiento.classList.add("border-danger");
                inputRendimiento.classList.add("border-2");
            }
        }
        //Alerta de confimación
        Swal.fire({
            title: "¡Conexión actualizada!",
            text: "Los datos de consumo se han modificado.",
            icon: "success",
        })
    }
}

//=======================================
/**
 * @description Calcula el total de consumo por dispositivo, sumando el valor de todas
 * las actividades asociadas al dispositivo.
 * @inner Calcula el total de todos los consumos totales de los dispositivos.
 * @param device_collection: colección html con todos los elementos <input> donde se
 * muestra el valor del consumo de la actividad para poder realizar la suma de estos
 * @returns total: valor del consumo total del dispositivo.
 * @implements se implementa en "create_device()"
 */
function calculate_consumptions(inputs_collection) {
    //Almacenar la suma de cada valor
    let total = 0;
    //Alias para el valor contenido dentro de cada elemento de la colección
    let content;

    inputs_collection.forEach(element => {
        //Válidar si algún input está vacío
        if (element.value == ''){
            content = 0;
            total = total + content;
        }else{
            content = parseInt(element.value)
            total = total + content;
        } 
    });
    
    //Retorno
    return total;
}

//=======================================
/**
 * @description Se usa para que el usuario pueda agregar sus propios dispositivos.
 * Usa un template para mayor eficiencia.
 * @implements se implementa en el botón con id: "createDevice"
 */
function new_device_by_user() {
    //Referencia al input con el nombre ingresado por el usuario
    const newDeviceName = document.getElementById("newDeviceName");

    if (newDeviceName.value == ""){
        Swal.fire({
            title: "¡Debe ingresar un nombre!",
            icon: "info",
        })
    }else{
    //Obtener contenido del template (450), crear fragmento (451) y clonar template (452)
    const template = document.getElementById("userDeviceTemplate").content;
    const fragment = document.createDocumentFragment();
    const clone = document.importNode(template, true);

    //Agregar el valor ingresado por el usuario al contenido de la nueva opción el formulario
    clone.querySelector("option").textContent = newDeviceName.value;
    //Agregar clon al fragmento 
    fragment.appendChild(clone);
    //Agregar fragmento al select parar mostrarlo al usuario
    selectAddDevice.appendChild(fragment);
    //Limpiar el input despúes de enviarlo
    newDeviceName.value = '';
    //Alerta de confirmación
    Swal.fire({
        title: "¡Dispositivo creado con éxito!",
        icon: "success",
    })
    }    
}

//=======================================
/**
 * @event click 
 * @description Invoca la función para generar el gráfico y mostrarlo en una ventana modal.
 */
const graphButton = document.getElementById("graphButton");
graphButton.addEventListener("click", (event) => {
    //Invocar función
    generate_graph();
})

//=======================================
/**
 * @event click
 * @description 
 */
const closeAndDelete = document.getElementById("closeAndDelete");
closeAndDelete.addEventListener("click", (event)=>{
    //Referencia al contenedor del gráfico.
    const graphContainer = document.getElementById("graphContainer");

    //Verifica que no este vacío, es decir, tiene que haber dispositivos en la lista
    if(devicesList.childElementCount != 0){
        //Eliminar etiqueta canvas la cual se usa para el gráfico
        const tmp_ctx = document.getElementById('myChart');
        graphContainer.removeChild(tmp_ctx);
        
        //Recrear la etiqueta canvas a través de un template para crear un gráfico nuevo
        const canvaGraphTemplate = document.getElementById("canvaGraphTemplate").content;
        const fragmet = document.createDocumentFragment();
        const clone = document.importNode(canvaGraphTemplate, true);
        fragmet.appendChild(clone);
        graphContainer.appendChild(fragmet); 
    }
})

//=======================================
/**
 * @description Obtiene los datos de la lista de dispositivos, el consumo total y el nombre
 * de cada uno de los dispositivos.
 * Crea los datos que irán en la gráfica.
 * Genera el gráfico con los datos recolectados.
 * @implements se implementa en el evento del botón con id: graphButton
 */
function generate_graph(){
    //Arreglos los cuales contendrán la información para generar la gráfica.
    let data_array = [0]
    let name_array = ["INICIO"]

    //Se obtienen los campos de Consumo total del dispositivo
    let totals = devicesList.querySelectorAll("input[type=text]");
    //Se optienen los nombres de los dispositivos
    let titles = devicesList.querySelectorAll("h4");

    //Verifica que no este vacío, es decir, tiene que haber dispositivos en la lista
    if(totals.length != 0){
        //Se llenan los valores con ambas nodeLists
        for (let i = 0; i < totals.length; i++) {
            data_array[i+1] = (totals[i].value);
            name_array[i+1] = (titles[i].textContent);
        }

        //---------Procedimiento de creación de la gráfica---------
        //Referenciar el elemento canvas
        const ctx = document.getElementById('myChart');

            //Crear gráfica
            new Chart(ctx, {
                type: 'line',
                data: {
                labels: name_array,
                datasets: [{
                    label: 'Consumo máximo de dispositivos (Mbps)',
                    data: data_array,
                    backgroundColor:[
                        '#FC9E91',
                        '#9193FC',
                        '#AAFC91',
                        '#DA91FC',
                        '#FCFA91',
                        '#FC91BE'
                    ],
                    borderWidth: 1,
                    borderColor: 'black'
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        }    
}

