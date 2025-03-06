import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ProductComponent } from '../components/product/product.component';
import { CartComponent } from '../components/cart/cart.component';
import { WishlistComponent } from '../components/wishlist/wishlist.component';
import { HomeComponent } from '../components/home/home.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ProductDescComponent } from '../components/product-desc/product-desc.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'product', redirectTo: '/product/all', pathMatch: 'full' },
    { path: 'product/:category', component: ProductComponent },
    { path: 'productDesc', component: ProductDescComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];
