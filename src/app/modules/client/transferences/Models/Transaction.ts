export interface Transaction{
    reference: string,
    ammount:number,
    creditorBankCode?:string,
    creditorAccount:string,
    debtorBankCode?:string,
    debtorAccount:string,
    transactionType:'TRANSFER',
    notes:string,
}