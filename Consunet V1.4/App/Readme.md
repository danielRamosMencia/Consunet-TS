# ----------count_elements()----------
/**
 * @description Cada que se invoca la función se incrementa el valor 1 para simular un id autoincremental.
 * @returns counter
 * Valor de la variable global "counter" incrementado en 1.
 * @implements No se está utilizando
 */

# ----------create_delete_button()----------
/**
 * @description Genera un nuevo elemento <button> e <i>, para asignar estilos a cada uno. 
 * @returns new_delete_button: Tag HTML del botón para eliminar el dispositivo agregado.
 * @implements se invoca en: "create_device()".
 */

# get_device()
/**
 * @description Obtiene el nombre y la src de la imagen según el dispositivo seleccionado por el usuario.
 * Almacena los valores en las variables name y url respectivamente, para selecionarlos según el
 * valor del elemeto <select> en el formulario. Guarda dichos valores en un arreglo.
 * @returns device_info
 * Arreglo con la información del nombre y src de la imagen del dispositivo seleccionado.
 * @implements se invoca en: "create_device()".
 */

# ----------create_device()----------
/**
 * @description Se asigna el botón de eliminado y la información del dispositivo (nombre e imagen) en variables.
 * Se referencia al template de <li> definido en main.html para crear un fragmento.
 * Se clona el template para manipularlo y se le asigna la información del dispositivo.
 * Con un eventListener se genera un eliminado dinámico a través del elemento padre del botón (li).
 * Al fragmento creado se lo enlaza el clon, y el fragmento se anexa en la lista de dispositivos.
 * Se hace un conteo de la cantidad de dispositivos conectados (fragmentos <li> en la lista <ul>).
 * @implements botón con id: "add".
 */

# ----------update_connection()----------
/**
 * @description Controla el actualizar la conexión escogida por el usuario. 
 * Hace referencia a los elementos del formulario que almacenan la información de la conexión actual.
 * Se controla la selección de una conexión al usuario, si se actualiza con la conexión por defecto
 * se lanza una alerta indicando que se debe seleccionar una conexión, caso contrario, se asigna un 
 * nuevo valor al atributo src que contiene la imagen de la conexión y se muestra un alerta de confimación.
 * @implements se invoca en botón con contenido: "Actualizar". 
 */