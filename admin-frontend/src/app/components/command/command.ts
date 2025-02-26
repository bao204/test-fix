// command.ts
interface Command {
    execute(): void;
  }
  
  class EditCommand implements Command {
    private accountId: string;
    private onEdit: (id: string) => void;
  
    constructor(accountId: string, onEdit: (id: string) => void) {
      this.accountId = accountId;
      this.onEdit = onEdit;
    }
  
    execute() {
      this.onEdit(this.accountId);
    }
  }
  
  class DeleteCommand implements Command {
    private accountId: string;
    private onDelete: (id: string) => void;
  
    constructor(accountId: string, onDelete: (id: string) => void) {
      this.accountId = accountId;
      this.onDelete = onDelete;
    }
  
    execute() {
      setTimeout(() => this.onDelete(this.accountId), 500);
    }
  }
  
  export { EditCommand, DeleteCommand };
  