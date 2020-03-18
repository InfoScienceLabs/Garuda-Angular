
 export class Transaction {
    transactionId: string;
    transactionType: transactionType;
    address: string;
    public?: NetworkTransaction;
    private?: NetworkTransaction;
    status: transactionStatus;
    scope?: string;
    sender: string;
    
 }
export class NetworkTransaction {
    hash: string;
    status: transactionStatus;
    message: string;
    receipt: Object;
    networkType: networkType;
}
export enum transactionType {
    Deposit = "Deposit", Withdraw = "Withdraw", CreateProperty = "Create_Property", ConfirmProperty = "Confirm_Property", List = "List",
    Buy = "Buy", ConfirmBuy = "Confirm_Buy", Rent = "Rent", AddUser = "AddUser", Others = "Others"
}
export enum transactionStatus {
    In_Progress = "In_Progress", Submitted = "Submitted", Pending_Confirmations = "Pending_Confirmation", Success = "Success", Failed = "Failed"
}
export enum networkType {
    private = "private",
    public = "public"
}


