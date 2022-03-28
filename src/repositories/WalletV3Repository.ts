import { IEvent, IEventAddedFund, IEventCreated, IEventWithDrawFund, WalletV3 } from "../aggregate/WalletV3";

export class WalletV3Repository {
    // DB local to test
    private _inMemoryStreams:Map<string, (IEventAddedFund | IEventWithDrawFund | IEventCreated)[]> = new Map();


    /**
     * This is replaying all the events in the aggregate to get back to current state.
     * @param id 
     * @returns 
     */
    public get(id:string): WalletV3{
        console.log(id)
        console.log(this._inMemoryStreams);
        let eventsList = this._inMemoryStreams.get(id);
        let wallet = new WalletV3(id);

        if ( eventsList ) {

            eventsList.forEach( (event:IEventAddedFund | IEventWithDrawFund | IEventCreated ) => {
                wallet.ApplyEvent(event);
            });
            
        } else {
            console.log("No wallet found, no events to reply.")
        }

        return wallet;
    }

    public save(wallet:WalletV3):void {
        if ( this._inMemoryStreams.has(wallet.id) === false ) {
            this._inMemoryStreams.set(wallet.id, []);
        }

        var newEvents = wallet.getUncommitedEvents();
        
        this._inMemoryStreams.get(wallet.id)?.push(...newEvents);
        wallet.eventsCommited();

        console.log(this._inMemoryStreams.get(wallet.id))
    }

}