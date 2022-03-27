import { IWalletEvent } from "../interfaces/IWalletEvent";
import { Db } from "../main";
import { walletService } from "../services/WalletService";

export class Wallet  {

    // projection given by events replay
    private _state:any = {
        id: "",
        amount: 0,
        createdAt: "",
        updatedAt: ""
    };
    private _events: any[] = [];
    
    constructor(id?: string) {
        if ( id ) {
            this._state.id = id;
            this.replay();
        } else {
            this._state = {
                id:this._state.id,
                amount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: ""
            }
        }
    }
    
    public replay() {
        
        if (  this._state  && this._state.id && this._state.id !== "" ) {

            let events:IWalletEvent[] = Db.filter( (ev:any) => ev.walletId === this._state.id);

            if ( events.length > 0 ) {
                // Apply each events to rebuild the projection
                events.forEach( (event:IWalletEvent) => {
    
                    switch (event.actionType) {
                        case 'WalletUpdatedAmount':
                            this._state.amount = event.data;
                          break;
                        default:
                          console.log(`Sorry ${event.actionType} not supported !`);
                      }
                      
                })
            } else {
                this._state = {
                    id:this._state.id,
                    amount: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: ""
                }
            }
        } else {
            this._state = {
                id: `${new Date().getTime()}`,
                amount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: ""
            }
        }


        return this._state;
    }

    public get state():any {
        this.replay();
        return this._state;
    }

    public get amount():number {
        return this._state.amount;
    }

    public set amount(toAdd:number) {
        this.replay();

        let newAmount = walletService.WalletUpdateAmount(toAdd,this._state.amount);
        this._state.amount = newAmount;
        this._events.push({
            actionType: "WalletUpdatedAmount",
            walletId: this._state.id,
            createdAt: this._state.createdAt,
            updatedAt: this._state.updatedAt,
            data: newAmount
        });

    }
}

