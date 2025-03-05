const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class HotDrink
{
    //Metodo de consumo
    consume() {}
}

class Tea extends HotDrink{
    consume(){
       console.log(`This tea is nice with lemon!`);

    }
}

class Coffee extends HotDrink{
    consume(){
       console.log(`This coffee is delicious!`);
        
    }
}

//El te y el cafe forman una jerarquia, ambos son 
// del tipo bebida caliente porque se extienden desde HotDrink

//clase base
class HotDrinkFactory
{
    //Metodo Preparar
    prepare(amount) { /* abstract */ }
}

class TeaFactory extends HotDrinkFactory
{
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount} ml`);
        return new Tea(); // << customize 
    }
}

class CoffeeFactory extends HotDrinkFactory
{
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount} ml`);
        return new Coffee(); 
    }
}

//Enumera todas las fabricas y sus respectivos tipos de bebidas
let AvailableDrink = Object.freeze({
    coffee: CoffeeFactory,
    tea: TeaFactory
});

class HotDrinkMachine
{
    constructor()
    {
        this.factories = {};
        for (let drink in AvailableDrink)
        {
            // usa corchetes para instanciar la fabrica 
            // las claves siguen siendo los nombres coffee y tea
            // pero los valores son instancias de la fabrica de café y de la fabrica de té
            this.factories[drink] = new AvailableDrink[drink]();
        }
    }

    //Metodo Interactuar
    interact(consumer)
    {
        rl.question('Please specify drink and amount ' + 
            '(e.g., tea 50): ', answer => {
                let parts = answer.split(' '); //espacio
                let name = parts[0];
                let amount = parseInt(parts[1]); //convertir cadena en un numero entero
                let d = this.factories[name].prepare(amount); //llamar al metodo PREPARE
                rl.close(); //cerrar pregunta
                consumer(d);
            });
    }

    //Metodo Hacer bebida, se especifica el tipo de bebida
    makeDrink(type)
    {
        switch (type)
        {
            case 'tea':
                return new TeaFactory().prepare(200);
            case 'coffee':
                return new CoffeeFactory().prepare(50);
            default:
                throw new Error('');
        }
    }
}

let machine = new HotDrinkMachine();
// rl.question('Which drink? ', function(answer)
// {
//     let drink = machine.makeDrink(answer);
//     drink.consume();

//     rl.close();
// });
machine.interact(
    function(drink)
    {
        drink.consume();
    }
);