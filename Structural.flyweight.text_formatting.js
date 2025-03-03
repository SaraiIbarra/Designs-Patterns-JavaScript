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
        this.caps = new Array(plainText.lenght).map(() => false);
    } 

    // Mayusculas en un determinado rango dentro del texto
    capitalize(start, end)
    {
        for (let i = start; i <= end; ++i)
            this.caps[i] = true;
    }
}