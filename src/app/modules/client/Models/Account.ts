export interface Account {
    id: number,
    uniqueKey: string,
    codeInternalAccount: string, //account type id
    name: string,//account type
    totalBalance: number
    availableBalance: number,
    blockedBalance: number,
    lastInterestCalculationDate: string,
    allowOverdraft: boolean,
    maxOverdraft: number,
    clientUk: string,//client id
    groupUk: string | null,
    productUk: string

}

export interface Client {
    name: string,
    lastname: string,
    identification: string,
    email: string,
}
