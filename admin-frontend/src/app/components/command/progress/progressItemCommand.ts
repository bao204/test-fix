export class DeleteProgressCommand {
    constructor(private progressId: string) {}
  
    async execute() {
      const response = await fetch(`http://localhost:3000/progress/${this.progressId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Xóa tiến độ thất bại');
      }
  
      return response.json();
    }
  }
  