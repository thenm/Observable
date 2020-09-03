import { Component, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Unsubscribing to an subscription      
  private firstObservableSubscription: Subscription;
  private customObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // interval returns an observable which emits a data stream after sepific time. 
    // Store the subscription which is returned by the subscribe. 
    // this.firstObservable will store the subscription
    this.firstObservableSubscription = interval(1000).subscribe(count => {
      console.log('from interval', count);
    });


    // Custom Observable. You can create an Observable by 'Observable.create'

    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }

        if( count == 2) {
          observer.complete();
        }
        count++
      }, 1000)
    })

    this.customObservableSubscription = customObservable.subscribe(
      counter => {
        console.log('from custom observable', counter);
      },
      error => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log('Completed')
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firstObservableSubscription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }

}
