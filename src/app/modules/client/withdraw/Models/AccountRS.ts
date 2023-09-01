export interface AccountRS {
    id: number;
    uniqueKey: string;
    codeInternalAccount: string;
    name: string;
    totalBalance: number;
    availableBalance: number;
    blockedBalance: number;string;
    allowOverdraft: boolean;
    maxOverdraft: number;
    clientUk: string;
    groupUk: string;
    productUk: string;
}
