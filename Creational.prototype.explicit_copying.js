class Address
{
    constructor(streetAddress, city, country)
    {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    deepCopy()
    {
        return new Address(
            this.streetAddress,
            this.city,
            this.country
        );
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

    //Cuando se quiera copiar a una persona, cree una nueva con los mismos atributos.
    deepCopy()
    {
        return new Person(
            this.name,
            this.address.deepCopy()
        );
    }

    toString()
    {
        return `${this.name} lives at ${this.address}`;
    }
}

let john = new Person('John', 
    new Address('123 London Road', ' London', 'UK'));

    //Hacer una replica del objeto que se puede personalizar
let jane = john.deepCopy();

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john.toString());
console.log(jane.toString());
