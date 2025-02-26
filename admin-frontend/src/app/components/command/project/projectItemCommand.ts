import { toast } from "react-toastify";
import { mutate } from "swr";

export class DeleteProjectCommand {
    private projectId: string;
    private onDelete: (id: string) => void;
  
    constructor(projectId: string, onDelete: (id: string) => void) {
      this.projectId = projectId;
      this.onDelete = onDelete;
    }
  
    async execute() {
      if (!window.confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
        return;
      }
  
      try {
        await this.onDelete(this.projectId);
        toast.success("Dự án đã được xóa thành công");
        mutate("http://localhost:3000/projects");
      } catch (error) {
        toast.error("Lỗi khi xóa dự án");
        console.error("Error deleting project:", error);
      }
    }
  }
  
  export class EditProjectCommand {
    private openEditModal: (state: boolean) => void;
  
    constructor(openEditModal: (state: boolean) => void) {
      this.openEditModal = openEditModal;
    }
  
    execute() {
      this.openEditModal(true);
    }
  }
  