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
  orders: Product[] = [];
  showDetails: any = false;
  selectedOrder: any;
  displayedColumns: string[] = ['name', 'date', 'price', 'client'];
  dataSource = new MatTableDataSource<Product>(this.orders);

  constructor(private woocommerceService: WoocommerceService) {}

  getOrders(orderId? : number) {
    this.woocommerceService.getOrders(orderId)
      .subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModal(element: any) {
    this.showDetails = true;
    this.selectedOrder = element
  }

  closeModal() {
    this.showDetails = false;
  }

  ngOnInit() {
    this.getOrders();
  }

  filterRecords(value: string) {
    //  @ts-ignore
    this.getOrders(value);
  }
}
