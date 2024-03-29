import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { BrandComponent } from './brand/brand.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { authGuard } from './guards/authguard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
  },
  { path: 'brands', canActivate: [authGuard], component: BrandComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  {
    path: 'details/:id',
    canActivate: [authGuard],
    component: ProductdetailsComponent,
  },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },

  // & lazy loading
  {
    path: 'changePassword',
    loadChildren: () => {
      return import('./setting/setting.module').then((m) => {
        return m.SettingModule;
      });
    },
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
