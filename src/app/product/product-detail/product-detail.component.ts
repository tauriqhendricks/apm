import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
/////// make this page look like activating a route with code slide
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct;
  products: IProduct[];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    // the + turn the string in to a number
    // 'id' is the parameter name specified in the route name
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products.filter((value => value.productId === id));
        this.product = this.products[0];
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
