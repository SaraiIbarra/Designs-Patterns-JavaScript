// ALMACENAMIENTO DE NOMBRES DE PERSONAS
class User 
{
    constructor(fullName)
    {
        this.fullName = fullName;
    }
}

class User2
{
    constructor(fullName)
    {
        //comprobar si la cadena ya esta en el conjunto
        let getOrAdd = function(s)
        {
            let idx = User2.strings.indexOf(s);
            if (idx !== -1) return idx;
            else{
                User2.strings.push(s);
                return User2.strings.length - 1;
            }
        };

        // Dividir el nombre completo con espacio y mapear cada elemento de un array
        // Matriz de numeros. Cada num apunta a algun lugar de la matriz de cadenas
        this.names = fullName.split(' ').map(getOrAdd);
    }
}
// La matriz va a almacenar cada cadena unica
User2.strings = [];

// Medir cuanta memoria se ocupa 

// Numero aleatorio
function getRandomInt(max)
{
    return Math.floor(Math.random() * max);   
}

// Cadena aleatoria
let randomString = function()
{
    let result = [];
    for(let x = 0; x < 10; ++x)
        result.push(String.fromCharCode(65 + getRandomInt(26)));
};

// Crear muchos nombres y apellidos
let firstNames = [];
let lastNames = [];

let users = [];
let users2 = [];

// Genera 10,000 usuarios diferentes
for(let i = 0; i < 100; ++i)
{
    firstNames.push(randomString());
    lastNames.push(randomString());
}

for(let first of firstNames)
    for(let last of lastNames)
    {
        users.push(new User(`${first} ${last}`));
        users2.push(new User2(`${first} ${last}`));
    }

// Serializar todo en JSON y luego medir la longitud de la cadena
console.log('10k users take up approx ' +
    `${JSON.stringify(users).length} chars`);

let users2length = [users2, User2.strings]
// obtener la cadena del elemento como JSON y luego tomar la longitu de la cadena
    .map(x => JSON.stringify(x).length) 
    .reduce((x,y) => x+y);
console.log(`10k flyweight users take up approx ` +
    `${users2length} chars`);



