import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "ng-shopping-cart";
import { PurchaseItem } from "src/app/helpers/purchaseitem.helper";
import { Location } from "@angular/common";
import { ResizedEvent } from "angular-resize-event";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  @ViewChild("cartiteminner", { static: false }) cartiteminner: ElementRef;

  cartitems: any;
  carttotal: number;
  start: number;
  end: number;
  scroll: boolean = true;

  subtotal = 0;

  public purchases: PurchaseItem[];
  public displayedpurchases: any[];
  public totalPrice = 0;

  promptCancelProduct: boolean;
  itemToRemove: PurchaseItem;

  concealCartTotalsAndButton = false;

  constructor(
    private location: Location,
    private cartService: CartService<PurchaseItem>,
    // private configuredProd: ConfiguredProductService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.promptCancelProduct = false;
    // const props = JSON.parse(localStorage.getItem('POSSpecialProperties'));
    this.actRoute.queryParams.subscribe((param) => {
      const total = Number(param.CartTotal);
      this.totalPrice = Number((total / 100).toFixed(2));
    });
  }

  /**
   * For testing purspose.
   * Used as input for deduct page
   * Updated based on voucher price
   */

  ngOnInit() {
    localStorage.setItem("disableScreenSaver", "FALSE");
    this.displayedpurchases = [];
    this.start = 0;
    this.end = 2;
    this.purchases = this.cartService.getItems();
    this.setTotalPrices();
    this.getOverallSubTotal(this.purchases);
    this.purchases.map((d) => {
      this.displayedpurchases.push({
        ...d,
        subtotal: this.getItemTotal(d),
      });
    });
  }

  countChange(id: number, currentValue: number) {
    const founditem = this.cartitems.find((data: { id: number }) => {
      return data.id === id;
    });

    if (currentValue > 0) {
      founditem.count = currentValue;
    } else if (currentValue < 1) {
      founditem.count = 1;
    }
  }

  getOverallSubTotal(purchases: PurchaseItem[]) {
    this.subtotal = 0;
    purchases.map((item) => {
      this.subtotal += Number(item.price * item.quantity);
    });
  }

  getItemTotal(item: PurchaseItem) {
    let total = Number(item.total());
    // const childPurchases = this.getChildPurchases(item);
    // childPurchases.map((data) => {
    //   total += Number(data.price * data.quantity);
    // });

    return total.toString().split(".");
  }

  public decrementQuantity(toDecrement: PurchaseItem) {
    toDecrement.quantity -= toDecrement.quantity > 1 ? 1 : 0;
    this.cartService.addItem(toDecrement);
    this.purchases = this.cartService.getItems();
    this.displayedpurchases = [];
    this.purchases.map((d) => {
      this.displayedpurchases.push({
        ...d,
        subtotal: this.getItemTotal(d),
      });
    });

    // now update
    this.handleCartItemsChange();
  }

  handleCartItemsChange() {
    this.purchases = this.cartService.getItems();
    this.setTotalPrices();
    this.getOverallSubTotal(this.purchases);
    this.displayedpurchases = [];
    // this.displayedpurchases = this.purchases;
    this.purchases.map((d) => {
      this.displayedpurchases.push({
        ...d,
        subtotal: this.getItemTotal(d),
      });
    });
    // }
  }

  public incrementQuantity(toIncrement: PurchaseItem) {
    toIncrement.quantity += 1;
    this.cartService.addItem(toIncrement);
    this.purchases = this.cartService.getItems();
    this.displayedpurchases = [];
    this.purchases.map((d) => {
      this.displayedpurchases.push({
        ...d,
        subtotal: this.getItemTotal(d),
      });
    });
    this.handleCartItemsChange();
  }

  public removeModifier(modifierId: string, purchaseId: string) {
    const purchase: PurchaseItem = this.purchases.find(
      (p) => p.id === purchaseId
    );

    purchase.modifiers = purchase.modifiers.filter(
      (mod) => mod.id !== modifierId
    );
    this.cartService.addItem(purchase);
  }

  public removeRelatedProduct(relProductId: string, purchaseId: string) {
    const purchaseItem: PurchaseItem = this.purchases.find(
      (purchase) => purchase.id === purchaseId
    );

    purchaseItem.relatedproducts = purchaseItem.relatedproducts.filter(
      (relProd) => relProd.id !== relProductId
    );
    this.cartService.addItem(purchaseItem);
  }

  public removeProduct(purchase: PurchaseItem) {
    this.removePurchaseAndSuggestedSales(purchase);
    this.purchases = this.cartService.getItems();
  }

  showCancelOverlay(purchase: PurchaseItem) {
    this.promptCancelProduct = true;
    this.itemToRemove = purchase;
  }

  hideCancelOverlay() {
    this.promptCancelProduct = false;
    this.itemToRemove = null;
  }

  public removeSuggSale() {
    const purchase = this.itemToRemove;
    const cartitems = this.cartService.getItems();
    const purchaseItem = cartitems.find((ci) => ci.itemid === purchase.itemid);

    // should be true
    if (purchaseItem) {
      this.cartService.removeItem(purchase.id);
    }

    this.purchases = this.cartService.getItems();

    this.promptCancelProduct = false;
    this.itemToRemove = null;
  }

  private setTotalPrices() {
    // const props = JSON.parse(localStorage.getItem('POSSpecialProperties'));
    this.actRoute.queryParams.subscribe((param) => {
      const total = Number(param.CartTotal);
      this.totalPrice = Number((total / 100).toFixed(2));
    });
  }

  routeBack(): void {
    this.location.back();
  }

  backToMenuSelection() {
    this.router.navigate(["/home"]);
  }

  editProduct(product: PurchaseItem) {
    // console.log('Product to edit: ', product);
  }

  public removePurchaseAndSuggestedSales(purchase: PurchaseItem) {
    // remove main item

    this.handleCartItemsChange();
  }

  continue() {
    this.router.navigate(["/payment-info"]);
  }

  clearBasket() {
    // takes us to spalsh screen which
    // clear cart during initialisation
    this.cartitems.this.router.navigate(["/"]);
  }

  onCartResized(event: ResizedEvent) {
    /**
     * class: cart-item_inner => max-height: 65rem (1170px)
     * sanifair logo component height = 145px;
     * if included, we need to deduct from the 1170px max-height
     */
    // const sanifairCompHeight = 415;
    // const maxHeight = !this.showSanifairComponent
    //   ? 1165
    //   : 1165 - sanifairCompHeight;
    // if (event .newHeight >= maxHeight) {
    //   this.scroll = true;
    // } else {
    //   this.scroll = false;
    // }
  }

  public scrollUp(): void {
    this.cartiteminner.nativeElement.scrollTop -= 40;
  }

  public scrollDown(): void {
    this.cartiteminner.nativeElement.scrollTop += 40;
  }

  toCartDisplay() {
    // first set pos properties

    const total = 500;
    this.totalPrice = Number((total / 100).toFixed(2));
  }

  decode(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  isNaN(value: any) {
    return isNaN(value);
  }
}
