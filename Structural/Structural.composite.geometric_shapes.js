class GraphicObject
{
    get name()
    {
        return this._name;
    }

    constructor(name = 'Group ' + (GraphicObject.count++))
    {
        this._name = name;
        this.color = undefined;
        this.children = []; //para que el objeto grafico actue como grupo. Es una lista vacia 
    }
    // El objeto buffer actua como visitante a la invocacion recursiva
    print(buffer, depth)
    {
        buffer.push('*'.repeat(depth));
        if(depth > 0)
            buffer.push(' ');
        if(this.color)
            buffer.push(this.color + ' ');
        buffer.push(this.name);
        buffer.push('\n'); //salto de linea

        for(let child of this.children)
            child.print(buffer, depth+1);
    }

    toString()
    {
        let buffer = [];
        this.print(buffer, 0);
        return buffer.join('');
    }
}

GraphicObject.count = 0;

class Circle extends GraphicObject
{
    constructor(color)
    {
        super('Circle');
        this.color = color;
    }
}

class Square extends GraphicObject
{
    constructor(color)
    {
        super('Square');
        this.color = color;
    }
}

let drawing = new GraphicObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Circle('Yellow'));

//Composite
let group = new GraphicObject();
group.children.push(new Circle('blue'));
group.children.push(new Square('blue'));
drawing.children.push(group); //agrgar un grupo a un grupo. 
//Se puede tener grupos de grupos de grupos hasta el infinito

//Resultado
console.log(drawing.toString());
