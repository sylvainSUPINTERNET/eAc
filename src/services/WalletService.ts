
class WalletService {
    
    constructor() {

    }

    WalletUpdateAmount(toAdd: number, currentAmount: number):number { 
        return toAdd + currentAmount;
    }


}

export const walletService = new WalletService();