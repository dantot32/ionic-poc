import { IContactRepository } from '../../domain/contact/IContactRepository';
import { Contact } from '../../domain/contact/Contact';

export class TempContactRepository implements IContactRepository {

  findById(id: string): Promise<Contact | null> {
      throw new Error('Method not implemented.');
  }
  findAll(): Promise<Contact[]> {
      throw new Error('Method not implemented.');
  }
  save(user: Contact): Promise<void> {
      throw new Error('Method not implemented.');
  }
  async getAll(): Promise<Contact[]> {
    var c = new Contact()
    return [c]
  }

}