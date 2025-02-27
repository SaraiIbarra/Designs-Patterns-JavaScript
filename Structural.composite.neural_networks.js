class Neuron
{
    constructor()
    {
        this.in = [];
        this.out = [];
    }
    // Metodo de conexion donde se especifica la neurona para conectarse
    connectTo(other)
    {
        this.out.push(other);
        other.in.push(this);
    }

    toString()
    {
        return `A neuron with ${this.in.length} inputs ` +
            `and ${this.out.length} outputs`;
    }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();