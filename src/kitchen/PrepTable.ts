import { Pizza } from '../menu/pizza';
import {
  Cheese,
  Dough,
  Sauce,
  Topping
} from '../menu/ingredients';
import {
  cheeseSelections,
  doughSelections,
  sauceSelections,
  toppingSelections
} from './ingredientBins';

export default class PrepTable {
  private order:string;
  private recipe:number[];

  constructor(order:string) {
    this.order = order;
  }

  public bakePizza ():Pizza {
    try {
      const pizza:Pizza = {
        dough: this.tossDough(this.recipe.shift()),
        sauce: this.spreadSauce(this.recipe.shift()),
        cheese: this.dropCheese(this.recipe.shift()),
        toppings: this.layerToppings(this.recipe)
      };

      return pizza;
    } catch (err) {
      console.error("Pizza was undercooked! Do it again.");
    }
  }

  private dropCheese (whichCheese:number):Cheese {
    const stock:number = cheeseSelections.length;
    return cheeseSelections[whichCheese % stock];
  }

  private howManyToppings (count:number):number {
    return Math.floor(count / 42);
  }

  private layerToppings (recipe:number[]):Topping[] {
    const howManyToppings:number = this.howManyToppings(recipe.shift());
    const stock:number = toppingSelections.length;
    let toppings:Topping[] = [];

    for (let i = 0; i < howManyToppings; i++) {
      const option:number = recipe.shift();
      toppings.push(toppingSelections[option % stock]);
    }

    return toppings;
  }

  public preparePizza ():void {
    try {
      this.recipe = this.unpackDelivery(this.order);
    } catch (err) {
      throw new Error("Wrong order! Do it again.");
    }
  }

  private spreadSauce (whichSauce:number):Sauce {
    const stock:number = sauceSelections.length;
    return sauceSelections[whichSauce % stock];
  }

  private tossDough (whichDough:number):Dough {
    const stock:number = doughSelections.length;
    return doughSelections[whichDough % stock];
  }

  private unpackDelivery (recipe:string):number[] {
    const ingredients:number[] = new Array<number>(32);
    let items:string[] = recipe.split('');

    for (let i = 0; i < 32; i++) {
      const byte:string = items.shift() + items.shift();
      const ingredient:number = parseInt(byte, 16);
      ingredients[i] = ingredient;
    }

    return ingredients;
  }
}
