class Buffer extends Array
{
    constructor(width=30, height=20)
    {
        super();
        this.width = width;
        this.height = height;
        this.alloc(width*height); //alloc = asignar
    }

    write(text, position = 0)
    {

    }
}

class Viewport
{
    constructor(buffer = new Buffer())
    {
        this.buffer = buffer;
        this.offset = 0;
    }

    //append agregar algo extra
    append(text, pos)
    {
        this.buffer.write(text, pos + this.offset);
    }

    getCharAt(index)
    {
        return this.buffer[this.offset + index];
    }
}

class Console
{
    constructor()
    {
        this.buffer = new Buffer();
        this.currentViewport = new Viewport(
            this.buffer
        );
        this.buffers = [this.buffer];
        this.viewports = [this.currentViewport];
    }

    write(text)
    {
        this.currentViewport.buffer.write(text);
    }

    getCharAt(index)
    {
        return this.currentViewport.getCharAt(index);
    }
}

let c = new Console();
c.write('hello');
let ch = getCharAt(0);
//this.buffers.push(new Buffer())
console.log();
