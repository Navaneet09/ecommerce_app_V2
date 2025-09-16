import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { Product } from '../../common/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { NgForOf } from "../../../../node_modules/@angular/common/common_module.d";


@Component({
  selector: 'app-product-list',
  imports: [NgForOf, CurrencyPipe, NgIf, RouterLink, NgbModule],
  templateUrl: './product-list-grid.html',
  // templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 2;
  currentCategoryName: String = "";
  searchMode: boolean = false;

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousCategoryId: number = 1;

  previousKeyword: string = "";

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts(); 
    }
    else {
      this.handleListProducts();
    }
  }

  
  handleSearchProducts() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1
    if(this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  
  }

  handleListProducts() {

    //check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {

      //get 'id' param string and convert to number using '+'
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else{
      
      //no category id ... default to 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // check if we have a different category than previous
    // Notice: Angular will reuse a component if it is currently being viewed
    //
    
    // if we have a different category id than previous
    // then set thePageNumber back to 1 
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    // now we have the current category id
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);



    //get the prods for given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              this.currentCategoryId).subscribe(this.processResult());
                                                // Mapping the data from spring data rest to the properties                              

  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {

    // Mapping the data from spring data rest to the properties
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}` );
  }
}