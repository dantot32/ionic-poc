import { Contact } from './Contact';

export interface IContactRepository {

  getAll(): Promise<Contact[]>

  findById(id: string): Promise<Contact | null>;

  findAll(): Promise<Contact[]>;

  save(user: Contact): Promise<void>;
  
}