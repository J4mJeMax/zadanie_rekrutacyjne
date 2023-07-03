import {Component, ViewChild} from '@angular/core';
import {WoocommerceService} from "./woocomerce.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../interfaces/product/product.interface";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  showDetails: any = false;
  selectedOrder: Order | null = null;
  displayedColumns: string[] = ['name', 'date', 'price', 'client'];
  dataSource = new MatTableDataSource<Order>(this.orders);
  loading: any = true;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private woocommerceService: WoocommerceService,
    private clipboard: Clipboard
  ) {}

  getOrders(orderId? : number) {
    this.woocommerceService.getOrders(orderId)
      .subscribe(
      (response) => {
        this.loading = false;
        this.orders = response;
        this.updatePaginator();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePaginator(pageIndex = 0, pageSize = 5) {
    this.pageIndex = pageIndex
    this.pageSize = pageSize;
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
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
    this.getOrders(Number(value));
  }

  onPageChange($event: PageEvent) {
    this.updatePaginator($event.pageIndex, $event.pageSize)
  }

  copyToClipboard(value: string, $event: MouseEvent) {
    this.clipboard.copy(value);
    $event.stopPropagation();
  }
}
