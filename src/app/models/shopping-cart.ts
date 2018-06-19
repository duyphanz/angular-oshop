import { AppProduct } from './app-product';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    items: ShoppingCartItem[] = []

    constructor(public itemsMap: {[productId:string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {}
        for(let productId in itemsMap){
            let item = itemsMap[productId]
            
            this.items.push(new ShoppingCartItem({ 
                ...item, //spread copy thuoc tinh
                $key: productId
            }))
        }
    }

getQuantity(product: AppProduct) {
        
        let item = this.itemsMap[product.$key]
        return item ? item.quantity : 0
      }
    
get totalPrice() {
    
    let result = 0
    for( let item of this.items){
        result += item.totalPrice
    }

    return result
}

get totalItemsCount() {
        let count = 0
        for (let productId in this.itemsMap){
            count += this.itemsMap[productId].quantity
        }
        return count
    }
}