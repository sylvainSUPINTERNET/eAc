import * as readline from 'readline';
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


// save events dans une liste 
// quand on instancie l'aggregat, on replay la liste des events
// currentState => projection ( quand on relay ça met à jour ça ET ce n'est jamais stocké, on stock les events qui eux vont transformer la projection)

let cmdGenerator = () => {

    rl.question("What do you want to do ? [Create/Add/Withdraw/Delete] [id]: " , answer => {
      
        switch(answer.toLowerCase().split("")[0]) {
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
            default:
              console.log('Invalid answer !');
              cmdGenerator();
          }
    });


}


( async () => {
    cmdGenerator();
})();
