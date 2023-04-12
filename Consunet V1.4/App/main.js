//=======================================
/**
 * @global Variables globales.
 */
//Variable contador para generar id autoincremental por dispositivo para cada elemento.
let counter = 0;
//Referencia a la etiqueta <ul> que contiene los elementos de la lista de dispositivos.
const devicesList = document.getElementById("devicesList")
//Referencia a la etiqueta <input> en la cual muestra la cantidad de dispositivos en la lista.
const inputDispositivosConectados = document.getElementById("inputDispositivosConectados");

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
 * @returns new_delete_button: Tag HTML del botón para eliminar el dispositivo agregado.
 * @implements se invoca en: "create_device()".
 */
function create_delete_button() { 
    //Tags creados
    const new_delete_button = document.createElement("button");
    const button_icon = document.createElement("i");

    //Asignaciones de clases y estilos 
    button_icon.classList.add("bi", "bi-trash3");
    button_icon.textContent = " Eliminar";
    new_delete_button.classList.add("btn", "btn-danger", "border", "border-dark", "mt-2");
    
    //Unificar botón con icono
    new_delete_button.appendChild(button_icon);

    //Retorno
    return new_delete_button;
}

//=======================================
/**
 * @description Obtiene el nombre y la src de la imagen según el dispositivo seleccionado por el usuario.
 * Almacena los valores en las variables name y url respectivamente, para selecionarlos según el
 * valor del elemeto <select> en el formulario. Guarda dichos valores en un arreglo.
 * @returns device_info
 * Arreglo con la información del nombre y src de la imagen del dispositivo seleccionado.
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
    }

    //Retorno
    return device_info;
}

//=======================================
/**
 * @description Se asigna el botón de eliminado y la información del dispositivo (nombre e imagen) en variables.
 * Se referencia al template de <li> definido en main.html para crear un fragmento.
 * Se clona el template para manipularlo y se le asigna la información del dispositivo.
 * Con un eventListener se genera un eliminado dinámico a través del elemento padre del botón (li).
 * Al fragmento creado se lo enlaza el clon, y el fragmento se anexa en la lista de dispositivos.
 * Se hace un conteo de la cantidad de dispositivos conectados (fragmentos <li> en la lista <ul>).
 * @implements botón con id: "add".
 */

function create_device() {
    //Botón de borrado e información del dispositivo    
    let delete_button = create_delete_button();
    let info_url_name = get_device();

    //Referencia al template y creación de fragmento HTML
    const template = document.getElementById("elementTemplate").content;
    const fragment = document.createDocumentFragment();

    //------Creación y asignació dinámica-----
    //Clonar el template
    let clone = document.importNode(template, true);
    //Asignar atributos
    clone.querySelector("img").setAttribute("src",info_url_name[0]);
    clone.querySelector("h4").textContent = info_url_name[1];
    //Agregar boton de borrado al clon
    clone.querySelector("li").appendChild(delete_button);
    
    //-----Actualizado dinámico-----
    

    //-----Eliminado dinámico-----
    //Agregar evento al botón
    delete_button.addEventListener("click", (event) =>{
        //Referencia al elemnto padre del botón
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

    //El clon del template se le asigna al fragmeto
    fragment.appendChild(clone);
    //Se asigna el fragmento a la lista (se muestra en pantalla al usuario)
    devicesList.appendChild(fragment);
    //Conteo de dispositivos
    inputDispositivosConectados.value = devicesList.childElementCount;
}

//=======================================
/**
 * @description Controla el actualizar la conexión escogida por el usuario. 
 * Hace referencia a los elementos del formulario que almacenan la información de la conexión actual.
 * Se controla la selección de una conexión al usuario, si se actualiza con la conexión por defecto
 * se lanza una alerta indicando que se debe seleccionar una conexión, caso contrario, se asigna un 
 * nuevo valor al atributo src que contiene la imagen de la conexión y se muestra un alerta de confimación.
 * @implements se invoca en botón con contenido: "Actualizar". 
 */
function update_connection(){
    //Referencias
    const inputTipoDeConexion = document.getElementById("inputTipoDeConexion").value;
    const connectionIMG = document.getElementById("connectionIMG");

    //Condiciones
    if (inputTipoDeConexion == 0) {
        //Alerta de información
        Swal.fire({
            title: "¡Debe escoger una conexión!",
            icon: "info",
        })
    }else {
        //Selección y asignación
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
        
        //Alerta de confimación
        Swal.fire({
            title: "¡Conexión actualizada!",
            text: "Los datos de consumo se han modificado.",
            icon: "success",
        })
    }
}
