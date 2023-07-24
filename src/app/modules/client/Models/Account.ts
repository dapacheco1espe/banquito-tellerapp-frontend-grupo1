export interface Account {
    accountNumber: number;
    accountBalance: number;
    accountType: string;
    accountTypeId: string;
    accountClientData: Client;
}

export interface Client {
    name: string;
    lastname: string;
    identification: string;
    email: string;
}
