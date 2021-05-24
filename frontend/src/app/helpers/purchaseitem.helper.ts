import { CartItem } from "ng-shopping-cart";

export class PurchaseItem extends CartItem {
  public id: string;
  public itemid: string;
  public name: string;
  public price: number;
  public quantity: number;
  public modifiers: any[];
  public relatedproducts: any[];
  public suggestivesaleproducts: any[];
  public image: string;
  public sale: boolean;

  public canIncrease: boolean;
  public subtitle: string;
  public vatId: number | string;

  constructor(purchase: any = {}) {
    super();

    this.id = purchase.id;
    this.itemid = purchase.itemid;
    this.name = purchase.name;
    this.image = purchase.image;
    this.price = purchase.price;
    this.quantity = purchase.quantity;
    this.relatedproducts = purchase.relatedproducts || [];
    this.modifiers = purchase.modifiers || [];

    this.canIncrease = purchase.canIncrease;
    this.subtitle = purchase.subtitle;
    this.vatId = purchase.vatId;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  getImage(): string {
    return this.image;
  }

  getTotalPrice(): number {
    const itemPrice = this.price;

    // Sum of all the (price * quantity) pairing
    const relatedPrices: number = this.relatedproducts.reduce(
      (acc: number, curr: any) => {
        return acc + curr.price * curr.quantity;
      },
      0
    );
    const totalPrice = (+itemPrice + +relatedPrices) * this.quantity;

    // for testing purposes. return correct value later
    return itemPrice;
  }

  public addModifier(modifier: any) {
    this.modifiers.push(modifier);
  }

  public addModifiers(modifiers: any[]) {
    this.modifiers = this.modifiers.concat(...modifiers);
  }

  public removeModifier(modifierId: string) {
    this.modifiers = this.modifiers.filter(
      (modifier) => modifier.id !== modifierId
    );
  }

  public removeRelatedProduct(relatedProductId: string) {
    this.relatedproducts = this.relatedproducts.filter(
      (relProduct) => relProduct.id !== relatedProductId
    );
  }

  /**
   * Increment or decrement the quantity of a particular modifier
   * @param modifierId The ID of the modifier to modify
   */
  public editModiferQuantity(modifierId: string, quantity: number): void {
    const index = this.modifiers.findIndex((mod) => mod.id === modifierId);
    const modifier = this.modifiers[index];

    modifier.quantity = quantity < 0 ? 0 : quantity;
    this.modifiers.splice(index, 1, modifier);
  }
}
