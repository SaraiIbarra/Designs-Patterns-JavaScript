var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this,(new mixin));
            });
        }
    }
    let copyProps = (target, source) => { // this function copies all properties and symbols, 
    // filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if(!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                    Object.defineProperty(target, prop,
                        Object.getOwnPropertyDescriptor(source, prop));                    
            })
    };
    mixins.forEach((mixin) => {
        // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
      });
      return base;
};

class Connectable
{
    connectTo(other)
    {
        for (let from of this)
            for(let to of other)
            {
                from.out.push(to);
                to.in.push(from);
            }
    }
}

class Neuron extends Connectable
{
    constructor()
    {
        super();
        this.in = [];
        this.out = [];
    }
    // Metodo de conexion donde se especifica la neurona para conectarse
    // connectTo(other)
    // {
    //     this.out.push(other);
    //     other.in.push(this);
    // }

    toString()
    {
        return `A neuron with ${this.in.length} inputs ` +
            `and ${this.out.length} outputs`;
    }
    //Iterador que devuelve un único elemento
    [Symbol.iterator]()
    {
        let returned = false;
        return {
        next: () => ({
            value: this,
            done: returned++
            })
        }
    }
}

class NeuronLayer extends aggregation(Array, Connectable)
{
    constructor(count)
    {
        super();
        while(count --> 0)
            // Crea una nueva Neurona que agrega a la colección 
            this.push(new Neuron())
    }

    toString()
    {
        return `A layer with ${this.length} neurons`;
        
    }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(4);

// Métodos múltiples
neuron1.connectTo(neuron2); // conectar neurona a otra neurona
neuron1.connectTo(layer1); // conectar una neurona con una capa
layer2.connectTo(neuron1); // conectar una capa a una neurona
layer1.connectTo(layer2); // conectar capa a otra capa

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());

