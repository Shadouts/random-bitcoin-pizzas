import { Pizza } from './menu/pizza';

const url:string = 'ws://localhost:8080/';
const waiter:WebSocket = new WebSocket(url);

const pizzaPan = (pizza:Pizza):void => {
  try {
    const placemat = document.getElementById('root');
    const announcement = document.createElement('h4');

    const plate = document.createElement('div');
    const slice = document.createElement('ul');
    const dough = document.createElement('li');
    dough.appendChild(
      document.createTextNode(`Dough: ${pizza.dough}`)
    );
    const sauce = document.createElement('li');
    sauce.appendChild(
      document.createTextNode(`Sauce: ${pizza.sauce}`)
    );
    const cheese = document.createElement('li');
    cheese.appendChild(
      document.createTextNode(`Cheese: ${pizza.cheese}`)
    );


    const toppingsList = document.createElement('li');
    toppingsList.appendChild( document.createTextNode("Toppings: ") );
    const toppings = document.createElement('ol');
    for (let i = 0; i < pizza.toppings.length; i++) {
      const topping = document.createElement('li');
      topping.appendChild( document.createTextNode(pizza.toppings[i]) );
      toppings.appendChild(topping);
    }

    announcement.appendChild( document.createTextNode("Order up!") );
    placemat.appendChild(announcement);
    placemat.appendChild(plate);
    plate.appendChild(slice);
    slice.appendChild(dough);
    slice.appendChild(sauce);
    slice.appendChild(cheese);
    slice.appendChild(toppingsList);
    toppingsList.appendChild(toppings);

    placemat.appendChild( document.createElement('br') );
  } catch (err) {
    console.error(err);
    throw err
  }
}

waiter.onopen = ():void => {
  try {
    console.log('Table prepared.');
  } catch (err) {
    console.error("The restaurant is closed!");
  }
};

waiter.onmessage = ({ data: pizza }):void => {
  try {
    pizzaPan( JSON.parse(pizza) );
  } catch (err) {
    console.error("Wrong order!");
  }
}

waiter.onerror = ():void => {
  console.error("The restaurant is closed!");
};
