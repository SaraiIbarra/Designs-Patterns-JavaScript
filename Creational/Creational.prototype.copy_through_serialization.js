class Address
{
    constructor(streetAddress, city, country)
    {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }


    toString()
    {
        return `Address: ${this.streetAddress}, ` +
        `${this.city}, ${this.country}`;
    }
}

class Person
{
    constructor(name, address)
    {
        this.name = name;
        this.address = address;
    }

    toString()
    {
        return `${this.name} lives at ${this.address}`;
    }

    greet()
    {
        console.log(`Hi, my name is ${this.name}, ` +
            `I live at ${this.address.toString()}`
        );
    }
}

class Serializer
{
    constructor(types)
    {
        this.types = types;   
    }

    // Toma un objeto y lo recorre en forma recursiva
    markRecursive(object)
    {
        let idx = this.types.findIndex(t => {
            return t.name === object.constructor.name;
        });

        // Encontrar un tipo
        if(idx !== -1)
        {
            object['typeIndex'] = idx;

            for(let key in object)
            {
                // si el objeto tiene su propia propiedad con una clave,
                // lo que hace es llamar a este metodo recursivamente
                this.markRecursive(object[key]);
            }
        }
    }

    reconstructRecursive(object)
    {
        if(object.hasOwnProperty('typeIndex'))
        {
            let type = this.types[object.typeIndex];
            let obj = new type();
            for (let key in object)
            {
                //comprobar que el objeto tiene su propia propiedad
                if (object.hasOwnProperty(key) && object[key] != null)
                    //para cada miembro asignar ese miembro al objeto instanciado
                    //que tiene informacion de tipo, reconstruye los subelementos recursivamente
                    obj[key] = this.reconstructRecursive(object[key]);
            }

            //Eliminar el indice de tipo
            delete obj.typeIndex;
            //Devolver el objeto reconstruido
            return obj;
        }
        return object;
    }

    //clonar el objeto
    clone(object)
    {
        this.markRecursive(object);
        // se obtiene una replica del objeto, pero sin ningun tipo de informacion
        let copy = JSON.parse(JSON.stringify(object));
        //Metodo Reconstruir recursiva, va a traves de cada uno de los miembros
        return this.reconstructRecursive(copy);
    }
}

let john = new Person('John', 
    new Address('123 London Road', ' London', 'UK'));

// Serializar
let s = new Serializer([Person, Address]);
let jane= s.clone(john);
// Convierte a Persona John en una cadena Json y luego se analiza esa cadena
// Reconstruye el objeto completo
//let jane = JSON.parse(JSON.stringify(john));

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john.toString());
console.log(jane.toString());

jane.greet();