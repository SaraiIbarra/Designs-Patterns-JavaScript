class Address
{
    constructor(suite, streetAddress, city)
    {
        this.suite = suite;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    toString()
    {
        return `Suite: ${this.suite}, ` +
        `${this.streetAddress}, ${this.city}`;
    }
}

class Employee //renamed
{
    constructor(name, address)
    {
        this.name = name;
        this.address = address;
    }

    toString()
    {
        return `${this.name} works at ${this.address}`;
    }

    greet()
    {
        console.log(`Hi, my name is ${this.name}, ` +
            `I work at ${this.address.toString()}`
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
                //comprobar que el objeto tiene su propia propiedad
                if (object.hasOwnProperty(key) && object[key] != null)                    
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

// Fábrica de empleados
class EmployeeFactory
{
    static _newEmployee(proto, name, suite)
    {
        // hacer copia del objeto
        let copy = EmployeeFactory.Serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    }

    static newMainOfficeEmployee(name, suite)
    {
        return this._newEmployee(
            EmployeeFactory.main, name, suite
        );
    }

    static newAuxOfficeEmployee(name, suite)
    {
        return this._newEmployee(
            EmployeeFactory.aux, name, suite
        );
    }
}

//Instanciar el serializador
EmployeeFactory.Serializer = new Serializer([Employee, Address]);

// definir las oficinas donde puede trabajar la gente
EmployeeFactory.main = new Employee(null,
    new Address(null, '123 East Dr', 'London'));

EmployeeFactory.aux = new Employee(null,
    new Address(null, '200 London Rd', 'Oxford'));


let john = EmployeeFactory.newMainOfficeEmployee('John', 4231);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 101);

console.log(john.toString());
console.log(jane.toString());

//jane.greet();