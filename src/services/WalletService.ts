import { IEventsWallet } from "../interfaces/IEventsWallet";

class WalletService implements IEventsWallet {
    
    constructor() {

    }

    WalletUpdateAmount(toAdd: number, currentAmount: number):number { 
        // TODO save into DB
        return 20000;
    }


}

export const walletService = new WalletService();