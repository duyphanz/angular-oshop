import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$
  product = {}
  id
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router
  ) 
  { 
    this.categories$ =  categoryService.getCategories()

    this.id = this.route.snapshot.paramMap.get('id')
    //console.log("ID ne" + id + "fjghfjg")
    if(this.id) this.productService.getProduct(this.id).take(1).subscribe(p => //take one object and unsubscribe automatically
      {
        //console.log(p)
        this.product = p
      })
   
  }

  save(product){
    if(this.id) this.productService.updateProduct(this.id, product)
    else{
      this.productService.createProduct(product)
    }
    this.router.navigate(['/admin/products'])
    //console.log(product)
    
  }

  delete() {
    if(!confirm("Are you sure you wanna delete this product?")) return
    
    this.productService.deleteProduct(this.id)
    this.router.navigate(['/admin/products'])
    
  }


  ngOnInit() {
  }

}
