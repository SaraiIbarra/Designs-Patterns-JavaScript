//Con esta clase Etiqueta(Tag) se obtiene el formato de todos
//los elementos internos
class Tag
{
    static get indentSize() {return 2; }

    constructor(name='', text='')
    {
        this.name = name;
        this.text = text;
        this.children = []; //matriz vacia
    }

    toStringImpl(indent)
    {
        let html = [];
        //Identacion o sangria 
        let i = ' '.repeat(indent * Tag.indentSize);
        html.push(`${i}<${this.name}>\n`);
        if (this.text.length > 0)
        {
        html.push(' '.repeat(Tag.indentSize * (indent+1)));
        html.push(this.text);
        html.push('\n');
        }

        for (let child of this.children)
        html.push(child.toStringImpl(indent+1));

        html.push(`${i}</${this.name}>\n`);
        return html.join();
    }

    toString()
    {
        return this.toStringImpl(0);
    }

    //metodo estatico
    static create(name)
    {
        return new HtmlBuilder(name);
    } 
}

//Constructor que ayuda a construir etiquetas sobre etiquetas
//Ayuda a construir los parrafos o listas
class HtmlBuilder
{
    constructor(rootName)
    {
        this.root = new Tag(rootName);
        this.rootName = rootName;
    }

    //metodo Agregar hijo
    addChild(childName, childText)
    {
        let child = new Tag(childName, childText);
        this.root.children.push(child);
    }


    addChildFluent(childName, childText)
    {
        let child = new Tag(childName, childText);
        this.root.children.push(child);
        return this;
    }

    toString()
    {
        return this.root.toString();
    }

    //metodo para borrar el constructor
    clear()
    {
        this.root = new Tag(this.rootName);

    }

    build()
    {
        return root;
    }

}

const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
//construir cadenas mediante el uso de matrices
console.log(html.join(''));

//Para una lista de palabras
const words = ['hello', 'world'];
html = [];
//SALTO DE LINEA AL FINAL DE LA LISTA
html.push('<ul>\n');
for (let word of words)
    // Interpolacion de cadenas
    html.push(` <li>${word}</li>\n`);
//cerrar la etiqueta
html.push('</ul>');
console.log(html.join(''));

//
//let builder = new HtmlBuilder('ul');
//  se inicializa a traves del objeto que pretende construir.
let builder = Tag.create('ul');
for (let word of words)
    builder.addChild('li', word);
console.log(builder.root.toString());

//Limpiar el constructor
builder.clear();
//usar el constructor para agregar varios hijos a la lista en una sola declaracion
builder
    .addChildFluent('LI', 'foo')
    .addChildFluent('LI', 'bar')
    .addChildFluent('LI', 'baz');
console.log(builder.toString());