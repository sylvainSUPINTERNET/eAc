import { IEvent } from "./IEvent";

export interface IEventsWallet extends IEvent {
    WalletUpdateAmount: (toAdd:number, currentAmount: number) => number;
}