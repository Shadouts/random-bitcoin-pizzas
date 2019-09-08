import {
  Cheese,
  Dough,
  Sauce,
  Topping
} from './ingredients';

export interface Pizza {
  readonly cheese:Cheese;
  readonly dough:Dough;
  readonly sauce:Sauce;
  readonly toppings:Topping[];
}
