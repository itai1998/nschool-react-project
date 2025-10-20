export class Macbook {
  id: number;
  name: string;
  price: string;
  type: string;
  description: string;
  image: string;
  availability: boolean;
  rating: number;
  categories: string;

  constructor(data: Partial<Macbook>) {
    this.id = data.id || 0;
    this.name = data.name || "";
    this.price = data.price || "";
    this.type = data.type || "";
    this.description = data.description || "";
    this.image = data.image || "";
    this.availability = data.availability || false;
    this.rating = data.rating || 0;
    this.categories = data.categories || "";
  }
}
