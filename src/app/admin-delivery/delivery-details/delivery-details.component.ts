import { Component, OnInit } from '@angular/core';
import { AdminDeliveryService } from '../admin-delivery.service';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/admin-delivery.reducer';
import * as productActions from '../state/admin-delivery.action';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {

  deliveryList: any[];
  products$: Observable<any[]>;
  tempDeliveryList: any[];
  searchText: any;

  constructor(private store: Store<fromProduct.State>) { }

  searchDeliveryList(): void {
    if (this.searchText) {
      this.deliveryList = [...this.tempDeliveryList];
      this.deliveryList = this.deliveryList.filter(elm4 => elm4.dlvry_date === this.searchText);
    } else {
      this.deliveryList = [...this.tempDeliveryList];
    }
  }

  public enableEditFlag(dlist) {
    this.deliveryList.forEach(element =>
      element.eFlag = false);
    dlist['eFlag'] = true;
  }

  public changeStatus(dlist) {
    this.deliveryList.forEach(element => {
      if (element.itm_id === dlist.itm_id) {
        element.eFlag = false;
        element.dlvry_status = dlist.dlvry_status;
      }
    });
  }

  ngOnInit() {
    // this.adminDeliveryService.getDeliveryDetailsAdmin().subscribe(
    //   response => {
    //     if (response && response.delivery_data) {
    //       this.deliveryList = response.delivery_data;
    //       this.deliveryList.forEach(element =>
    //         element.eFlag = false);
    //     } else {
    //       this.deliveryList = [];
    //     }
    //   }
    // );
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<any[]>;
    this.products$.subscribe(
      (data: any) => {
      this.deliveryList = data.delivery_data;
      this.tempDeliveryList = this.deliveryList;
        if (this.deliveryList) {
          this.deliveryList.forEach(element =>
            element.eFlag = false);
        }
      }
    );
    this.store.dispatch(new productActions.Load());
  }

}
