class Car 
{
    drive()
    {
        console.log(`Car is being driven`);   
    }
}

class CarProxy
{
    constructor(driver)
    {
        this.driver = driver;
        this._car = new Car();
    }
    
    drive()
    {
        if (this.driver.age >= 18)
            this._car.drive();
        else {
            console.log(`Driver too young`);
            
        }
    }
}
// Autenticar el usuario
// El conductor tenga la edad suficiente
class Driver
{
    constructor(age)
    {
        this.age = age;
    }
}

let car = new Car();
car.drive();

let car2 = new CarProxy(new Driver(12));
car2.drive();