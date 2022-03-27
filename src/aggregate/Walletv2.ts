import { Db } from "../main";


export enum WalletEvent {
    CREATE_WALLET = "CreatedWallet",
    UPDATE_AMOUNT_WALLET = "UpdatedAmountWallet",

}


export class Walletv2 {

    // projection given by events replay
    private _state:any = {
        id: "",
        amount: 0,
        createdAt: "",
        updatedAt: ""
    };


    constructor(amount:number){
            this._state.id = `${new Date().getTime()}`;
            this._state.amount = amount;
    }

    public replay() {
        let eventsAttached = Db.filter(  event => event.id === this._state.id );
        
        if ( eventsAttached.length > 0 ) {
            eventsAttached.forEach( event => {

                const { eventType } = event;

                switch ( eventType ) {
                    case WalletEvent.CREATE_WALLET:
                        this._state.id = event.id;
                        this._state.createdAt = event.createdAt;
                        break;
                    case WalletEvent.UPDATE_AMOUNT_WALLET:
                        this._state.amount += event.data.amount;
                        this._state.updatedAt = event.createdAt;
                        break;
                    default:
                        throw new Error("Domain exception");
                }

            })
        }
    }

    public getState() {
        this.replay();
        return this._state;
    }

    public create() {
        let ev = {
            id: this._state.id,
            createdAt: new Date().toISOString(),
            eventType: WalletEvent.CREATE_WALLET
        };

        Db.push(ev);
        return this._state;
    }

    public setAmount(newAmount:number):void {    
        let ev = {
            id: this._state.id,
            createdAt: new Date().toISOString(),
            eventType: WalletEvent.UPDATE_AMOUNT_WALLET,
            data : {
                amount:newAmount
            }
        };

        Db.push(ev);
    }



}