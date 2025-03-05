class Percentage
{
    constructor(percent)
    {
        this.percent = percent; // 0 - 100
    }

    toString()
    {
        return `${this.percent}% `;
    }

    // Metodo 'Valor de' va a a dar el valor real 
    // que se va a utilizar en todos loa calculos
    valueOf()
    {
        return this.percent / 100;
    }
}

// un 5% equivale a un nuevo porcentaje de 5
let fivePercent = new Percentage(5);
console.log(fivePercent.toString());

// Multiplicar un valor por 5% y obtener el 5% de ese valor
console.log(`5% of 50 is ${50*fivePercent}`);
