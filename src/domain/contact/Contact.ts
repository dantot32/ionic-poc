export class Contact {

    public readonly id!: string;
    public name: string;
    public email: string;
  
    constructor(name: string, email: string) {
        this.name = name
        this.email = email
    }

    rename(newName: string) {
        this.name = newName;
    }
}