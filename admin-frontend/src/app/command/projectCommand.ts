import { Project } from "../models/project";

// commands/projectCommands.ts
export class DeleteProjectCommand {
    constructor(private id: string, private executeCallback: () => void) {}
  
    execute() {
      fetch(`http://localhost:3000/projects/${this.id}`, { method: 'DELETE' })
        .then(() => this.executeCallback())
        .catch((error) => console.error('Lỗi khi xóa dự án:', error));
    }
  }
  
  export class FilterProjectCommand {
    constructor(private projects:Project [], private filterText: string) {}
  
    execute() {
      return this.projects.filter((project) =>
        project.projectName.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
  
  export class SortProjectCommand {
    constructor(private projects: Project[], private sortBy: 'projectName' | 'projectStart') {}
  
    execute() {
      return this.projects.sort((a, b) => {
        if (this.sortBy === 'projectName') {
          return a.projectName.localeCompare(b.projectName);
        } else {
          return new Date(a.projectStart).getTime() - new Date(b.projectStart).getTime();
        }
      });
    }
  }
  
  export class PaginateProjectCommand {
    constructor(private projects: Project[], private page: number, private pageSize: number) {}
  
    execute() {
      const startIndex = (this.page - 1) * this.pageSize;
      return this.projects.slice(startIndex, startIndex + this.pageSize);
    }
  }
  