class CurrentState {
    quantity: number = 0;
}


export interface IEvent {
    id: string
    type: "AddedFund" | "WithDrawFund" | "Created";
    createdAt: string
}

export interface IEventAddedFund extends IEvent {
    quantity:number;
}

export interface IEventWithDrawFund extends IEvent {
    quantity:number;
}

export interface IEventCreated extends IEvent {
    quantity:number;
}


export class WalletV3 {
    public id:string = "";

    private _allEvents:Array<IEventAddedFund | IEventWithDrawFund | IEventCreated> = [];
    private _uncommitedEvents:Array<IEventAddedFund | IEventWithDrawFund | IEventCreated> = [];
    private _currentState:any = new CurrentState();

    constructor(id:string) {
        this.id = id;
    }

    public addEvent(event:IEventAddedFund | IEventWithDrawFund | IEventCreated) {
        this.ApplyEvent(event);
        this._uncommitedEvents.push(event);
    }

    public apply(event:IEventAddedFund | IEventWithDrawFund | IEventCreated) {
        if ( event.type === "AddedFund" ) {
            this._currentState.quantity += event.quantity;
        }

        if ( event.type === "WithDrawFund" ) {
            this._currentState.quantity -= event.quantity;
        }

        if ( event.type === "Created" ) {
            this._currentState.quantity = event.quantity;
        }
    }

    public ApplyEvent(event:IEventAddedFund | IEventWithDrawFund | IEventCreated) {

        if ( event.type !== "AddedFund" && event.type !== "WithDrawFund" && event.type !== "Created" ) {
            throw new Error("Unsupported event : " + event);
        }
        this.apply(event);
        this._allEvents.push(event);
    }


    // Business logic
    public addFund(quantity:number) {
        let event:IEventAddedFund = {
            id:this.id,
            type:"AddedFund",
            quantity,
            createdAt: new Date().toISOString()
        }
        this.addEvent(event);
    }

    public create(quantity: number) {
        let event:IEventCreated = {
            id:this.id,
            type:"Created",
            quantity,
            createdAt: new Date().toISOString()
        }
        this.addEvent(event);
    }

    public withDrawFund(quantity:number) {
        if ( this._currentState.quantity - quantity <= 0 ) {
            throw new Error("No enough fund on your wallet");
        }
        let event:IEventWithDrawFund = {
            id:this.id,
            type: "WithDrawFund",
            quantity,
            createdAt: new Date().toISOString()
        }
        this.addEvent(event);
    }

    public getUncommitedEvents() : Array<IEventAddedFund | IEventWithDrawFund | IEventCreated>{
        return this._uncommitedEvents;
    }

    public eventsCommited () {
        this._uncommitedEvents = [];
    }

    public getCurrentState(): CurrentState {
        return this._currentState;
    }
    

}