import { Address } from "./property";

export class User{
    username:string;
    id:string;
    walletAddress: string;
    balance: number;
    name: string;
    dob: string;

    firstname: string;
    lastname: string;
    phone:string;
    email:string;

    company:string;
    gst:string;
    password:string;
    cphone:string;
    cemail:string;
    hnumber:string;
    cstreet:string;
    ccity:string;
    cstate:string;
    cpostal:string;
    roleId: string;
    orgId: string;
    session: Session;
    token: string;
    address : Address;
}

export class Roles{
    admin : {
        _id: string;
        name: string;
    }
}
export class Session{
    browser: string;
    key : string;
    os: string;
    lastActive: Date;
    timeCreated: Date;
    _id: string;
}