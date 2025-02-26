import { toast } from "react-toastify";

export class EditDepartmentCommand {
  private id: string;
  private name: string;
  private onEdit: (id: string) => void;

  constructor(id: string, name: string, onEdit: (id: string) => void) {
    this.id = id;
    this.name = name;
    this.onEdit = onEdit;
  }

  execute() {
    toast.info(`Đang chỉnh sửa: ${this.name}`);
    this.onEdit(this.id);
  }
}

export class DeleteDepartmentCommand {
  private id: string;
  private name: string;
  private onDelete: (id: string) => void;

  constructor(id: string, name: string, onDelete: (id: string) => void) {
    this.id = id;
    this.name = name;
    this.onDelete = onDelete;
  }

  execute() {
    toast.success(`Đã xóa: ${this.name}`);
    setTimeout(() => this.onDelete(this.id), 500); // Đợi một chút để toast hiển thị trước khi xóa
  }
}
