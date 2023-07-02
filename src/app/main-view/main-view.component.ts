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
  products: Product[] = [];
  orders: Product[] = [];

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

  ngOnInit() {
    this.getOrders();
  }

  displayedColumns: string[] = ['name', 'date', 'price', 'client'];
  dataSource = new MatTableDataSource<Product>(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //@ts-ignore
    this.dataSource.paginator = this.paginator;
  }

}
