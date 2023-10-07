import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartId!: string;
  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartId = response.data._id;
      },
    });
  }
  paymentForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  navigateToPage(url: string) {
    window.location.href = url;
  }

  onlinePayment(paymentForm: FormGroup) {
    this._cartService.handelPayment(this.cartId, paymentForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 'success') {
          this.navigateToPage(response.session.url);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
