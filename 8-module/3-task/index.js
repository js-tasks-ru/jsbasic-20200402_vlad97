export default class Cart {
  

  constructor(cartIcon) {
    this.cartItems = []; // [product: {...}, count: N]
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let n = -1;
    if (this.cartItems.length > 0) {this.cartItems.forEach((item, index, array)=>{ if (item.product.name === product.name) { n = index;}});}
    if (n < 0) {this.cartItems.push({'product': product, 'count': 1});}
    else {this.cartItems[n].count++;}
    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index, array) =>{
      if (item.product.name.toLowerCase().split(' ').join('-') == productId) { item.count += amount;}
    });
    this.cartItems = this.cartItems.filter((item)=> item.count > 0);
    this.onProductUpdate();
  }

  isEmpty() {
    if (this.getTotalCount() === 0) {return true;}
    else {return false;}
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((item) => {totalCount += item.count;});
    return totalCount;
  }

  getTotalPrice() {
    let itogo = 0;
    this.cartItems.forEach((item)=>{itogo += item.product.price * item.count;});
    return itogo;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

