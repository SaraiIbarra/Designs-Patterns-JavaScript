
let Relationship = Object.freeze({
    parent: 0, 
    child: 1,
    sibling: 2
});

class Person 
{
    constructor(name)
    {
        this.name = name;
    }
}

//LOW - LEVEL MODULE
// La navegacion de relaciones: Es una especificacion de una interfaz 
// para el tipo de cosas que se pueden hacer sobre los datos de relaciones  
class RelationshipBrowser
{
    constructor()
    {
        if(this.constructor.name === 'RelationshipBrowser')
            throw new Error('RelationshipBrowser is abstract!');
    }
    findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser
{
    constructor()
    {
        super();
        this.data = [];
    }

    //Método para añadir un padre y un hijo
    addParentAndChild(parent, child)
    {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        });
    }
    findAllChildrenOf(name) {
       return this.data.filter(r => 
            r.from.name === name &&
            r.type === Relationship.parent
        ).map(r => r.to);
    }
}

// HIGH-LEVEL MODULE
 class Research
{ /* // abstract classes/interfaces
    constructor(relationships)
    {
        // Find all children of John
        //Obtener los datos
        let relations = relationships.data;
        //Criterios: Que el nombre sea John y que John sea padre de alguien
        for (let rel of relations.filter(r => r.from.name === 'John' &&
            r.type === Relationship.parent
        ))
        {
            console.log(`John has a child named ${rel.to.name}`);
        }
    }*/
   constructor(browser)
   {
        for(let p of browser.findAllChildrenOf('John'))
        {
            console.log(`John has a child called ${p.name}`);
        }

   }
} 

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

//Nuevas Relaciones
let rels = new Relationships();
//Relaciones entre Padre e hijos
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

//nueva investigacion, especificar la clase de relaciones
new Research(rels);