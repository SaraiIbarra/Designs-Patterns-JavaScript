class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // representacion de dos cadenas del conjunto
    toString()
    {
        return `(${this.x}, ${this.y})`;
    }
}

// Esta clase es para definir el inicio y final de la linea
class Line 
{
    constructor(start, end)
    {
        this.start = start;
        this.end = end;
    }

    toString()
    {
        return `${this.start.toString()}->${this.end.toString()}`;
    }
}

// Clase base, que es solo una matriz de lineas
class VectorObject extends Array {}

class VectorRectangle extends VectorObject
{
    constructor(x, y, width, height)
    {
        super();
        this.push(new Line(new Point(x,y), new Point(x+width, y) ));
        this.push(new Line(new Point(x+width,y), new Point(x+width, y+height) ));
        this.push(new Line(new Point(x,y), new Point(x, y+height) ));
        this.push(new Line(new Point(x,y+height), new Point(x+width, y+height) ));this.push
      }
}
// ↑↑↑ this is your API ↑↑↑

// ↓↓↓ this is what you have to work with ↓↓↓
// Tiene que trabajar con esta API
let drawPoint = function(point)
{
    process.stdout.write('.');
};

class LineToPointAdapter extends Array 
{
    // Dar al constructor una linea y convertir esa linea en un conjunto de puntos
    constructor(line)
    {
        super();
        //Contar el numero de puntos que se generan y el numero de lineas que se procesan
        //generar un conjunto de puntos para una linea dada.
        console.log(`${LineToPointAdapter.count++}: Generating ` +
            `points for line ${line.toString()} (no caching)` // no caching: NO HAY CACHE
        );

        //Ubicaciones izquierda, derecha, superior e inferior de las lineas
        let left = Math.min(line.start.x, line.end.x);
        let right = Math.max(line.start.x, line.end.x);
        let top = Math.min(line.start.y, line.end.y);
        let bottom = Math.max(line.start.y, line.end.y);

        if(right - left === 0)
        {
            //Generar un conjunto de puntos
            for(let y = top; y <= bottom; ++y)
            {
                this.push(new Point(left, y));
            }
        }
        else if(line.end.y - line.start.y === 0)
        {
            for(let x = left; x <= right; ++x)
            {
                this.push(new Point(x, top));
            }
        }
    }
}
LineToPointAdapter.count = 0;

//Dibujar objetos vectoriales
let vectorObjects = [
    new VectorRectangle(1, 1, 10, 10),
    new VectorRectangle(3, 3, 6, 6)
];

let drawPoints = function()
{
    // Para cada objeto vectorial, obtener cada una de sus lineas
    for (let vo of vectorObjects)
        for(let line of vo)
        {
            //Adaptador de linea a punto
            let adapter = new LineToPointAdapter(line);
            adapter.forEach(drawPoint); //Un adaptador es una MATRIZ
        }
};

drawPoints();
drawPoints();