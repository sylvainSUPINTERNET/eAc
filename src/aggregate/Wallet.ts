import { Db } from "../main";
import { walletService } from "../services/WalletService";

class Wallet  {

    // projection given by events replay
    private _state:any;

    public id:string = "";
    private _amount:number = 0;

    private events: any[] = [];

    constructor() {
        this.id = `${new Date().getTime()}`
    }
    
    public get state():any {
        // FIXME : should replay all events and rebuild the latest state
        return this._state;
    }

    public get amount():number {
        return this._amount
    }
    public set amount(toAdd:number) {
        //walletService.WalletUpdateAmount(toAdd,10)
        // FIXME must save the event to DB
        // WalletUpdateAmount(this._amount, this._state);
        // Db.push({
        //     "id": new Date().getTime(),

        // })
        return 
    }
}

