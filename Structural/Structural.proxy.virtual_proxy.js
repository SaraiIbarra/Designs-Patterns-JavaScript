// Sponer que se tiene una aplicación que muestra imágenes de personas.

class Image 
{
    constructor(url)
    {
        this.url = url;
        console.log(`Loading image from ${url}`);
    }

    //Dibujar la imagen
    draw()
    {
        console.log(`Drawing image from ${this.url} `); 
    }
}

class LazyImage
{
    constructor(url)
    {
        this.url = url;
    }

    draw()
    {
        if(!this.image) 
            //Construir la imagen a menos que ya haya sido construida
            this.image = new Image(this.url);
        this.image.draw();
    }
}

function drawImage(img)
{
    console.log(`About to draw the image`);
    img.draw();
    console.log(`Done drawing the image`);   
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);