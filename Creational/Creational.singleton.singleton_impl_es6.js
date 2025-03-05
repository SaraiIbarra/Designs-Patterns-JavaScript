class Singleton
{
    // El constructor se utiliza como objeto que
    // tiene campos y comportamientos propios
    constructor()
    {
        const instance = this.constructor.instance;
        if(instance)
        {
            return instance;
        }
        //Asignar una instancia del objeto actual
        this.constructor.instance = this;
    }

    foo()
    {
        console.log(`Doing something...`);
    }
}

// Solo obtiene el tipo de instancia que tipicamente se
// obtiene si se llama a un constructor.
let s1 = new Singleton();

// Se produce un orden de operaciones completamente distinto
// porque despues de inicializar s1 el this.constructor.instance = this
// se obtiene la instancia que esta dentro del constructor
let s2 = new Singleton();

console.log(`Are they identical? ` + (s1 === s2));
s1.foo();