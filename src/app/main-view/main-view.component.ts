import {Component, ViewChild} from '@angular/core';
import {WoocommerceService} from "./woocomerce.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../interfaces/product/product.interface";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  orders: Product[] = [];
  showDetails: any = false;
  selectedProduct: any;
  displayedColumns: string[] = ['name', 'date', 'price', 'client'];
  dataSource = new MatTableDataSource<Product>(this.orders);

  constructor(private woocommerceService: WoocommerceService) {}

  getOrders() {
    this.woocommerceService.getOrders()
      .subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModal(element: any) {
    console.log(element)
    this.showDetails = true;
    this.selectedProduct = element
  }

  closeModal() {
    this.showDetails = false;
  }

  ngOnInit() {
    this.getOrders();
  }
}
