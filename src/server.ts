import * as express from 'express';
import waiter from './staff/waiter';

waiter();

const restaurant:any = express();
const customer:number = 3000;

restaurant.get('/', (req:any, res:any):void => {
  res.sendFile('diningArea/table.html', { root: __dirname });
});

restaurant.get('/app.js', (req:any, res:any):void => {
  res.sendFile('app.js', { root: './dist' });
});

restaurant.listen(
  customer,
  ():void => console.log(`HTTP listening on port ${customer}`)
);
