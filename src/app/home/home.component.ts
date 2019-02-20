import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval  } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersSubscription: Subscription;
  customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // interval is the simplest way to make an observable.
    const myNumbers = interval(1000).pipe(map(
      (data: number) => {
        return data * 2;
      }
    ));
    // We can now subscribe to it!
    this.numbersSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('This is error!');
        observer.complete();
      }, 5000);
      setTimeout(() => {
        // We will never see the line below get printed
        // because the observable completes after 5 seconds!
        observer.error('This is error!');
      }, 6000);
    });

    this.customSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        // The error part!
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy() {
    this.numbersSubscription.unsubscribe();
    this.customSubscription.unsubscribe();   
  }
}