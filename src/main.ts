import * as readline from 'readline';
import { Walletv2 } from './aggregate/Walletv2';
import { WalletV3 } from './aggregate/WalletV3';
import { WalletV3Repository } from './repositories/WalletV3Repository';


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// https://microservices.io/patterns/data/event-sourcing.html
// https://microservices.io/patterns/data/cqrs.html
// https://blog.risingstack.com/event-sourcing-with-examples-node-js-at-scale/
// https://blog.risingstack.com/cqrs-explained-node-js-at-scale/
// https://softwareengineering.stackexchange.com/questions/371708/too-many-unnecessary-events
// https://codeopinion.com/event-sourcing-example-explained-in-plain-english/#:~:text=Event%20Sourcing%20is%20a%20different,have%20occurred%20in%20your%20system.
export const Db:any[] = [];
let currentWallet:any = {};

let walletRepository:WalletV3Repository = new WalletV3Repository();
let id = `${new Date().getTime()}`;

let cmdGenerator = () => {
    rl.question("What do you want to do ? [Create/Add/Withdraw/Delete/Update] [id]: " , answer => {

        switch(answer.toLowerCase().split(" ")[0]) {
            case 'create':
              walletRepository.get(id);
              let newWallet = new WalletV3(id);
              newWallet.create(100);
              walletRepository.save(newWallet);
              console.log("created new wallet with success" , newWallet.id);
              walletRepository.get(id);

              id = newWallet.id;
              console.log("created : ", id)

              cmdGenerator();
              break;
            case 'add':
              console.log("add to " , id)
              let currentWallet = walletRepository.get(id);
              currentWallet.addFund(10);
              walletRepository.save(currentWallet);
              console.log("New quantity", currentWallet.getCurrentState().quantity);

              cmdGenerator();
              break;
            case 'withdraw':
              cmdGenerator();
                break;
            case 'delete':
                console.log('Delete wallet !');
                cmdGenerator();
                break;
            case 'update':
                // currentWallet.setAmount(parseInt(answer.toLowerCase().split(" ")[1]));
                // console.log(currentWallet.getState());
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
