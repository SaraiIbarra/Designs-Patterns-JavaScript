// Dar formato a texto
// Editor Texto: negrita, cursiva, subrayado
class FormattedText
{
    //Especificar algún tipo de texto sin formato
    constructor(plainText)
    {
        this.plainText = plainText;
        //formato para mayusculas en determinados carácteres
        // Matriz de cualquier longitud, 
        // false para que se convierta en un monton de valores booleanos
        this.caps = new Array(plainText.lenght).map(function(){ return false;});
    } 

    // Mayusculas en un determinado rango dentro del texto
    capitalize(start, end)
    {
        for (let i = start; i <= end; ++i)
            this.caps[i] = true;
    }

    // cadena
    toString()
    {
        let buffer = [];
        for(let i in this.plainText)
        {
            let c = this.plainText[i];
            buffer.push(this.caps[i] ? c.toUpperCase() : c);
        }
        return buffer.join('');
    }
}

class TextRange
{
    // posiciones de inicio y fin del rango
    constructor(start, end)
    {
        this.start = start;
        this.end = end;
        this.capitalize = false;
    }

    // si cubre o no una posicion
    covers(position)
    {
        return position >= this.start &&
            position <= this.end;
    }
}

class BetterFormattedText
{
    constructor(plainText)
    {
        this.plainText = plainText;
        this.formatting = [];
    }

    // da el rango desde la posicion inicial hacia la posicion final
    // Almacena el rango en la matriz de formato
    getRange(start, end)
    {
        let range = new TextRange(start, end);
        this.formatting.push(range);
        return range;
    }

    toString()
    {
        let buffer = [];
        for(let i in this.plainText)
        {
            let c = this.plainText[i];
            for(let range of this.formatting)
            {
                if(range.covers(i) && range.capitalize)
                    c = c.toUpperCase();
            }
            buffer.push(c);
        }
        return buffer.join('');
    }
}

const text = 'This is a brave new world';
// Poner en mayusculas la palabra 'brave'
let ft = new FormattedText(text);
// Especificar el rango
ft.capitalize(10, 15);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());

