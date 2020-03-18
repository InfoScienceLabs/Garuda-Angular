export class Property {
    id: string;
    name: string;
    description: string;
    propertyId: string;
    location: number[];
    address: Address;
    value: number;
    owner: Owner[];
    admin: any[];
    status: string;
    message: string;
    image: string[];
    docs: string[];
    manager: string[];
    addedBy: string;
    ownedBy: string;
    area: number;
    percent: number;
    totalvalue: number;
    listingType: string;
    propertyType: string;
    amount: number;
    type: Type;
    buyer: string[];
    seller: string[];
    tax: number;
    certificate: Certificate[];
    propertyName: string;
    hash: string;
}
// export enum Type {
//     Buy,
//     Rent,
//     Transfer,
//     Delist
//   }
export enum Type {
    Buy =  'Buy',
    Rent = 'Rent' ,
    Transfer = 'Transfer',
    Delist = 'Delist'
  }
export class Address {
    $class: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  }
export class Owner {
    OwnerName: string;
    id: string;
    stake: number;
    type: string;
    buyDate: string; // change it to listingDate
    docs: string[];
    verified: boolean;
}
export class Certificate {
    name: string;
    stake: number;
    docId: number;
    date: string;
    revoke?: string;
    hash?: string;
}
