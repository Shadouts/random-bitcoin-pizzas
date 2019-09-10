import * as WebSocket from 'ws';
import bigMario from './bigMario';
import PrepTable from '../kitchen/PrepTable';
import { Pizza } from '../menu/pizza';

export default waiter;

let franchise:WebSocket|null = null;
let waterRounds:NodeJS.Timer|null = null;

function waiter ():void {
  const lead:number = 8080
  const gm:WebSocket.Server = new WebSocket.Server(
    { port: lead },
    ():void => console.log(`WSS listening on port ${lead}`)
  );

  gm.on('connection', (customer:WebSocket):void => {
    (customer as any).isAlive = true;
    customer.on('pong', heartbeat);

    if (!franchise) {
      registerFranchise(gm);
    }
  });
}

function registerFranchise (gm:WebSocket.Server):void {
  const distributionChain:string = 'wss://ws.blockchain.info/inv';
  franchise = new WebSocket(distributionChain);

  franchise.on('open', ():void => {
    try {
      const openForBusiness:string = `{"op":"unconfirmed_sub"}`;
      franchise.send(openForBusiness);
    } catch (err) {
      console.error("You forgot to pay the phone bill!");
    }
  });

  franchise.on('message', (receivePhoneCall:any):void => {
    try {
      const order:string = bigMario(receivePhoneCall);
      const prepTable:PrepTable = new PrepTable(order);
      prepTable.preparePizza();
      const pizza:Pizza = prepTable.bakePizza();

      (gm.clients as WebSocket[]).forEach((customer:WebSocket):void => {
        customer.send(JSON.stringify(pizza));
      });
    } catch (err) {
      console.error(err);
    }
  });

  turnOnMuzak(gm);
}

function heartbeat():void {
  this.isAlive = true;
}

function turnOnMuzak (gm:WebSocket.Server):void {
  waterRounds = global.setInterval(():void => {
    let customerCount:number = 0;

    (gm.clients as WebSocket[]).forEach((customer:WebSocket):void => {
      customerCount++;

      if ((customer as any).isAlive === false) {
        return customer.terminate();
      }

      (customer as any).isAlive = false;
      customer.ping(():void => {});
    });

    if (customerCount === 0) {
      franchise.terminate();
      franchise = null;
      clearInterval(waterRounds);
    }
  }, 3000);
}
