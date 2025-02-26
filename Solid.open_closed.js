const { log, Console } = require("console");

let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});
  
let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
});
  
class Product
{
    constructor(name, color, size)
    {
      this.name = name;
      this.color = color;
      this.size = size;
    }
}

//Abierto a la ampliacion (una clase hereda de otra clase y adquiere automaticamente algunos de sus campos), pero cerrado a la modificacion
// OCP = open for extension, closed for modification

class ProductFilter
{
    filterByColor(products, color)
    {
        return products.filter(p => p.color === color);
    }

    filterBySize(products, size)
    {
        return products.filter(p => p.size === size);
    }

    filterBySizeAndColor(product, size, color)
    {
        return products.filter(p => p.size === size && 
            p.color === color);
    }

    // state space explosion - Explocion del espacio de estados 
    // 3 criterios = 7 metodos 
    // Patron de espacificacion. Siempre que quieras un criterio de filtro particular, especifiques una clase separada que defina ese tipo de filtrado
}

//specification
class Specification
{
    constructor()
    {
        if(this.constructor.name === 'Specification')
            throw new Error('Specification is abstract!');
    }

    isSatisfied(item) {}
}

class ColorSpecification extends Specification
{
    constructor(color)
    {
        super();
        this.color = color;
    }

    /* isSatisfied(item)
    {
        return item.color == this.color;
    } */
}

class SizeSpecification
{
    constructor(size)
    {
        this.size = size;
    }

    isSatisfied(item)
    {
        return item.size == this.size;
    }
}

//Combinador: es en si mismo una especificacion que combina todas las especificaciones.
class AndSpecification
{
    constructor(...specs)
    {
        this.specs = specs;
    }

    isSatisfied(item)
    {
        return this.specs.every(x => x.isSatisfied(item));
    }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log('Green Products (old):');

for(let p of pf.filterByColor(products, Color.green))
    console.log(` * ${p.name} is green`);

//Filtro basado en especificaciones
class BetterFilter
{
    filter(items, spec)
    {
        return items.filter(x => spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for(let p of bf.filter(products, 
    new ColorSpecification(Color.green)))
{
    console.log(` * ${p.name} is green`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);

for(let p of bf.filter(products, spec))
{
    console.log(` * ${p.name} is large y green`);
}