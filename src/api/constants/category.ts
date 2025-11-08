export class Category {
  id: number;
  category: string;

  constructor(data: Partial<Category>) {
    this.id = data.id || 0;
    this.category = data.category || "";
  }
}
