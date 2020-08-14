import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IProduct } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'api/products/products.json';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      // taps into the observable
      // displays all the data in the console
      tap(data => console.log('All: ' + JSON.stringify(data))),
      // catches any errors
      catchError(this.handleError)
    );

  }

  getProduct(id: number): IProduct {
    let product;
    this.getProducts().subscribe({
      next: products => {
        product = products.filter((value => value.productId === id));
      }
    });
    return product;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}