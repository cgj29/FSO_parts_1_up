const t = [1,2,3,4,5,6,7,8,9];

const [first, second, third, ...rest] = t;

console.log(first, second);
console.log('third', third);
console.log(rest);

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}

object1.address = 'Helsinki'
object1['secret number'] = 12341

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
  }
  
  const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
  }

  console.log(object1['secret number']);
  console.log(object3.name);
  console.log(object2['level']);


  const sum = (p1, p2) => {
    console.log(p1);
    console.log(p2);
    return(p1+p2);
  };

  console.log(sum(12354734, 7567234265));

const square = p => {
    console.log(p);
    return p**2;
};

console.log(square(5));

const t3 = [5645, 457543, 1345643];
const t3Squared = t3.map(p => p **2);
console.log(t3Squared);


function average(a, b) {
    return (1/2) * (a + b);
}
console.log(average(6, 12));

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Phd',
  //never use arrow fuynction to define object methods, as arrow functions lose "this" context
  greet: function() {
    console.log('hello, my name is ' + this.name);
  },
  doAddition: function(a ,b) {
    console.log(a + b)
  }
}

arto.growOlder = function() {
  this.age +=1;
};

arto.greet();
/**
 * when method is called from object, this refers to the object.
 */
arto.growOlder();
console.log(arto.age);
const referenceToAddition = arto.doAddition
referenceToAddition(4, 125);

// const referenceToGreet = arto.greet;
/**
 * when method is called via reference this becomes global object, which has no defined property name.
 */
// referenceToGreet();

setTimeout(arto.greet, 1000);
/**
 * loses reference to object since the  method is being called within another function, so it needs to have the method bound
 * 
 */
setTimeout(arto.greet.bind(arto), 1000);

class Person{
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name);
  }
}

const adam = new Person('Adam Ondra', 29);
adam.greet();

const janja = new Person('Janja Garnbert', 23);
janja.greet();