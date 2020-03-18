export class Builder {
        name : string;
        email: string;
        password: string;
        phone: number;
        gst: number;
        address: Addres;
        admin : string[];
        orgID: string;

}
export class Addres {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
}