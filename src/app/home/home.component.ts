import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Unsubscribing to an subscription      
  private firstObservable: Subscription;
  constructor() { }

  ngOnInit() {
    // interval returns an observable which emits a data stream after sepific time. 
    // Store the subscription which is returned by the subscribe. 
    // this.firstObservable will store the subscription
    this.firstObservable = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firstObservable.unsubscribe();
  }

}
