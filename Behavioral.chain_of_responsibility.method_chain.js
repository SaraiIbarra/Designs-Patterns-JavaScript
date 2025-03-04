// Juego de ordenador
class Creature 
{
    constructor(name, attack, defense)
    {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }

    toString()
    {
        return `${this.name} (${this.attack}/${this.defense})`;
    }
}

class CreatureModifier
{
    constructor(creature)
    {
        this.creature = creature;
        this.next = null; // linked list 
    }

    add(modifier)
    {
        if(this.next) this.next.add(modifier);
        else this.next = modifier;
    }
    // si no se aplica 
    handle()
    {
        if (this.next) this.next.handle();        
    }
}

class NoBonusesModifier extends CreatureModifier
{
    constructor(creature)
    {
        super(creature);
    }

    handle()
    {
        console.log(`No bonuses for you!`);        
    }
}

// Modificador de ataque doble
class DoubleAttackModifier extends CreatureModifier
{
    constructor(creature){
        super(creature);
    }

    handle()
    {
        console.log(`Doubling ${this.creature.name}'s attack`);
        this.creature.attack *= 2;
        super.handle(); //Permite recorrer toda la lista enlazada 
    }
}
// Aumentar el modificador de defensa
class IncreaseDefenseModifier extends CreatureModifier
{
    constructor(creature){
        super(creature);
    }

    handle()
    {
        if (this.creature.attack <= 2)
        {
            console.log(`Increasing ${this.creature.name}'s defense`);
            this.creature.defense++;
        }
        super.handle(); //Permite recorrer toda la lista enlazada 
    }
}

//Nueva creatura llamada Goblin
let goblin = new Creature('Goblin', 1, 1);
console.log(goblin);

let root = new CreatureModifier(goblin);

root.add(new NoBonusesModifier(goblin));

root.add(new DoubleAttackModifier(goblin));
root.add(new DoubleAttackModifier(goblin));

root.add(new IncreaseDefenseModifier(goblin));

root.handle();
console.log(goblin.toString());
