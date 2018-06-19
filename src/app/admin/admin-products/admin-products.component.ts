import { AppProduct } from './../../models/app-product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  products: AppProduct[]
  
  subscription: Subscription
  tableResource: DataTableResource<AppProduct>
  items: AppProduct[] = []
  itemCount: number

  constructor(private productService: ProductService) { 
    this.subscription = productService.getAll().subscribe(p => {
      this.products = p

     this.initializeTable(p)
    })
  }

  private initializeTable(product: AppProduct[]) {
     //data-table

     this.tableResource = new DataTableResource(product)
     this.tableResource.query({offset: 0})
       .then(items => 
        {
          // console.log("Items: " + items)
          this.items = items
        })
     this.tableResource.count()
       .then(itemCount => {
        // console.log("Count: " + itemCount)
         this.itemCount = itemCount
       })
  }

  reloadItems(param) {
    if(!this.tableResource) return

    this.tableResource.query(param)
       .then(items => this.items = items)
  }

  filter(query: string) {
    //console.log(query)
    let filterProducts = (query) ?
      this.products.filter(p => p.title.includes(query)) : this.products
    
    //apply filter to data-table
    this.initializeTable(filterProducts)
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
