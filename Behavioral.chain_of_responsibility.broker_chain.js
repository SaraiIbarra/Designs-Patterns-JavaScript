// Corredor de eventos
class Event 
{
    constructor()
    {
        this.handlers = new Map();
        this.count = 0;
    }
    
    subscribe(handler)
    {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(idx)
    {
        this.handlers.delete(idx);
    }
    // Disparar el evento
    fire(sender, args)
    {   // v = valor, k = 
        this.handlers.forEach(function(v, k) {
            v(sender, args);
        });
    }
}
class Game 
{
    constructor()
    {
        //Consulta de datos de criaturas 
        this.queries = new Event();
    }

    //Metodo de utilidad, realizar consulta
    perfomQuery(sender, query)
    {

    }
}

class Creature
{

}