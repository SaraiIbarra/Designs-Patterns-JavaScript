class Person
{
    constructor()
    {
        // address, codigo postal y ciudad
        this.streetAddress = this.postcode
            = this.city = '';

        // employment, nombre de la empresa y posicion 
        this.companyName = this.position = '';
        // Ingresos anuales
        this.annualIncome = 0;
    }

    toString()
    {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n`
            + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
    }
}

//Constructores separados para especificar la informacion 
//Dos constructores, para eso se van a tener tres clases diferentes

// Esta clase va a almacenar el objeto que estamos inicializando 
class PersonBuilder
{
    // Va a tomar una persona, pero tambien va a tener un valor por defecto
    constructor(person = new Person())
    {
        this.person = person;
    }

    // Propiedad
    get lives()
    {
        return new PersonAddressBuilder(this.person);
    }

    get works()
    {
       return new PersonJobBuilder(this.person);
    }

    // Este metodo devuelve el objeto que se esta construyendo
    build() 
    {
        return this.person;
    }
}

//El constructor PersonAddressBuilder y PersonJobBuilder 
// van a ser herederos de PersonBuilder
class PersonJobBuilder extends PersonBuilder
{
    constructor(person)
    {
        super(person);
    }

    at(companyName)
    {
        this.person.companyName = companyName;
        return this;
    }

    asA(position)
    {
        this.person.position = position;
        return this;
    }

    earning(annualIncome)
    {
        this.person.annualIncome = annualIncome;
        return this;
    }
}

class PersonAddressBuilder extends PersonBuilder
{
  constructor(person)
  {
    super(person);
  }

  at(streetAddress)
  {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode)
  {
    this.person.postcode = postcode;
    return this;
  }

  in(city)
  {
    this.person.city = city;
    return this;
  }
}

//Inicializar un nuevo objeto
let pb = new PersonBuilder();
let person = pb
  .lives.at('123 London Road').in('London').withPostcode('SW12BC') //especificar la direccion
  .works.at('Fabrikam').asA('Engineer').earning(123000) //especificar la informacion de empleo
  .build();
  // Imprimir como una cadena
console.log(person.toString());
