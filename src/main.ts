import * as readline from 'readline';
import { Wallet } from './aggregate/Wallet';
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// https://microservices.io/patterns/data/event-sourcing.html
// https://microservices.io/patterns/data/cqrs.html
// https://blog.risingstack.com/event-sourcing-with-examples-node-js-at-scale/
// https://blog.risingstack.com/cqrs-explained-node-js-at-scale/
// https://softwareengineering.stackexchange.com/questions/371708/too-many-unnecessary-events
export const Db = [];

let cmdGenerator = () => {

    rl.question("What do you want to do ? [Create/Add/Withdraw/Delete/Update] [id]: " , answer => {
      console.log(answer.toLowerCase().split(" ")[0])
        switch(answer.toLowerCase().split(" ")[0]) {
            case 'create':
              console.log('Create wallet !');
              cmdGenerator();
              break;
            case 'add':
              console.log('Add fund to wallet !');
              cmdGenerator();
              break;
            case 'withdraw':
              console.log('Withdraw !');
              cmdGenerator();
                break;
            case 'delete':
                console.log('Delete wallet !');
                cmdGenerator();
                break;
            case 'update':
                let wallet = new Wallet(`${answer.toLowerCase().split(" ")[1]}`);
                wallet.amount = 52;
                console.log(wallet.amount)
                cmdGenerator();
            default:
              console.log('Invalid answer !');
              cmdGenerator();
          }
    });


}


( async () => {
    cmdGenerator();
})();
