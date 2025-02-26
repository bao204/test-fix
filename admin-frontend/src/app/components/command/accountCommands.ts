// commands/accountCommands.ts
import { create, updateAccount, deleteAccount } from "../../services/accountService";

export interface Command {
  execute(): Promise<void>;
}

export class CreateAccountCommand implements Command {
  constructor(private name: string, private email: string, private password: string) {}

  async execute() {
    await create(this.name, this.email, this.password);
  }
}

export class UpdateAccountCommand implements Command {
  constructor(private id: string, private name: string, private email: string, private password: string) {}

  async execute() {
    await updateAccount(this.id, this.name, this.password, this.email);
  }
}

export class DeleteAccountCommand implements Command {
  constructor(private id: string) {}

  async execute() {
    await deleteAccount(this.id);
  }
}
