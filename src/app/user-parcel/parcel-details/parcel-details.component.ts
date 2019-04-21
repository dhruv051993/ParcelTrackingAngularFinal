import { Component, OnInit } from '@angular/core';
import { UserparcelService } from '../user-parcel.service';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/user-parcel.reducer';
import * as productActions from '../state/user-parcel.action';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent implements OnInit {

  deliveryList: any[];
  products$: Observable<any[]>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit() {
    // this.UserService.getParcelDetailsUser().subscribe(
    //   response => {
    //     if (response && response.parcel_data) {
    //       this.deliveryList = response.parcel_data;
    //   } else {
    //       this.deliveryList = [];
    //   }
    // });
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<any[]>;
    this.products$.subscribe(
      (data: any) => { this.deliveryList = data.parcel_data;
     }
    );
    this.store.dispatch(new productActions.Load());
  }

}
