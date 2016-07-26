// Recibe un nodo padre y el div que se esta generando, y crea los divs de sus
// hijos recursivamente
function create_tree(father, father_div) {
    // Comprobamos si hay mas hijos
    if (father.children.length === 0) {
        return;
    }
    
    // Recorremos los hijos para comprobar que no hay widgets entre ellos o no
    // se ha terminado el arbol a copiar
    for (var i = 0; i < father.children.length; i++) {
        if (father.children[i].hasAttribute("statusContainer")) {
            return;
        }
    }

    // Seguimos creando el arbol
    for (var i = 0; i < father.children.length; i++) {
        // Creamos el div de un hijo
        var child_div = document.createElement('div');

        // Atributos de un hijo
        var attributes = father.children[i].attributes;

        // Copiamos los atributos en el nuevo arbol
        for (var j = 0; j < attributes.length; j++) {
            child_div.setAttribute(attributes[j].name, attributes[j].value);
        }

        // Aniadimos el hijo al arbol
        father_div.appendChild(child_div);
        
        // Llamamos recursivamente a create_tree()
        create_tree(father.children[i], child_div);
    }

    return;
}

// Empezamos el arbol de divs en main-content
var main_content = document.getElementsByClassName("main-content")[0];

// Creamos la raiz del arbol copia
var main_root = document.createElement('div');

// Lista de atributos a copiar
var attributes = main_content.attributes

// Creamos el arbol
create_tree(main_content, main_root);

// Guardamos el html del arbol resultante
var text = main_root.innerHTML;

//Descargar archivo
var a = window.document.createElement('a');
a.href = window.URL.createObjectURL(new Blob([text], {type: 'text/txt'}));
a.download = 'test.txt';

// Append anchor to body.
document.body.appendChild(a)
a.click();

// Remove anchor from body
document.body.removeChild(a)
