CoordinateSystem = {
    cartesian: 0,
    polar: 1
};

class Point
{
    /*
    constructor(a, b, cs=CoordinateSystem.cartesian)
    {
        switch (cs){
            case CoordinateSystem.cartesian:
                this.x = a;
                this.y = b;
                break;

            case CoordinateSystem.polar:
                this.x = a * Math.cos(b);
                this.y = a * Math.sin(b);
                break;
        }
    }*/
    
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    /*
    constructor(rho, theta)
    {
        this.x = rho * Math.cos(theta);
        this.y = rho * Math.sin(theta);
    }
*/
    //Métodos estáticos que van a inicializar el punto de 
    //ambos cartesianos, así como las coordenadas polares

    static newCartesianPoint(x, y)
    {
        return new Point(x, y);

    }

    static newPolarPoint(rho, theta)
    {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        );
    }

    static get factory()
    {
       return new PointFactory(); 
    }
}

//Esta clase va a tener una sola responsabilidad
class PointFactory
{
    //no es necesario que sea static 
    newCartesianPoint(x, y)
    {
        return new Point(x, y);
    }

    static newPolarPoint(rho, theta)
    {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        );
    }
}

/*
let p = Point.newCartesianPoint(4, 5);
console.log(p);

let p2 = Point.newPolarPoint(5, Math.PI/2);
console.log(p2);*/

let p1 = new Point(2, 3, CoordinateSystem.cartesian);
console.log(p1);
// Point → PointFactory
let p2 = PointFactory.newPolarPoint(5, Math.PI/2);
console.log(p2);

// this line will not work if newCartesianPoint is static!
let p3 = Point.factory.newCartesianPoint(2, 3);
console.log(p3);