import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { name: 'Smartphone X', shortDescription: 'Latest smartphone with high-end features', price: 799, image: 'https://th.bing.com/th/id/OIP.qtfRNLFTiSUT4yXJz_bkKAHaHa?w=500&h=500&rs=1&pid=ImgDetMain', category: 'mobile', quantity: 1 },
    { name: 'Smartphone Y', shortDescription: 'Latest smartphone with high-end features', price: 799, image: 'https://th.bing.com/th/id/OIP.nvdM5sEm4DqG8oZb8nNStQHaHa?rs=1&pid=ImgDetMain', category: 'mobile', quantity: 1 },
    { name: 'Smartphone Z', shortDescription: 'Latest smartphone with high-end features', price: 799, image: 'https://th.bing.com/th/id/OIP.jfIv9WAqZQ7_2BqwWsa4OwHaHa?rs=1&pid=ImgDetMain', category: 'mobile', quantity: 1 },
    { name: 'Smartphone W', shortDescription: 'Latest smartphone with high-end features', price: 799, image: 'https://th.bing.com/th/id/OIP._1i-qKNGsucUsz-mB7UmlwHaHa?rs=1&pid=ImgDetMain', category: 'mobile', quantity: 1 },
    { name: 'Laptop Pro', shortDescription: 'Powerful laptop for professionals', price: 1200, image: 'https://th.bing.com/th/id/R.0e7a3fffa6f41b8b2cb95c25b0fa791a?rik=oCirMXvWuh5UDA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-OipYuuNx7bc%2fUYznOsel-mI%2fAAAAAAAAA48%2fvoQrFOp9vNI%2fs1600%2flaptop.jpg&ehk=n8GXTV9JaytbWC9ckuoOP0DmWQu5pp7nylPuH9xdb3k%3d&risl=&pid=ImgRaw&r=0', category: 'Laptops', quantity: 1 },
    { name: 'Laptop Air', shortDescription: 'Powerful laptop for professionals', price: 1200, image: 'https://th.bing.com/th/id/OIP.8dONY82usxXQzZHJ_OgwfQHaFR?rs=1&pid=ImgDetMain', category: 'Laptops', quantity: 1 },
    { name: 'Laptop Fly', shortDescription: 'Powerful laptop for professionals', price: 1200, image: 'https://www.bhphotovideo.com/images/images2500x2500/hp_5yh29ua_aba_pavilion_laptop_15_cs2010nr_core_1473122.jpg', category: 'Laptops', quantity: 1 },
    { name: 'Laptop Neo', shortDescription: 'Powerful laptop for professionals', price: 1200, image: 'https://i5.walmartimages.com/asr/ee1840e1-d589-498f-810c-0d4ee6cc9a4e.f05cdc65e3976a4b7af1aec5806d8034.jpeg', category: 'Laptops', quantity: 1 },
    { name: 'Wireless Earbuds', shortDescription: 'Comfortable and high-quality sound', price: 150, image: 'https://th.bing.com/th/id/OIP.iHWAPUI5CTb2XGFRZnK5nwHaHn?rs=1&pid=ImgDetMain', category: 'Accessories', quantity: 1 },
    { name: 'Smartwatch', shortDescription: 'Track your fitness and notifications', price: 250, image: 'https://i5.walmartimages.com/asr/4951cfe5-b949-435c-a4aa-8aa918d0752b.5b459bbce6b3752b5875a697023e03c8.jpeg', category: 'Accessories', quantity: 1 },
    { name: '4K TV', shortDescription: 'Ultra HD television with vibrant colors', price: 1000, image: 'https://th.bing.com/th/id/OIP.JOpLqIn13jA-GIkRyfJNsgHaE8?rs=1&pid=ImgDetMain', category: 'Home Entertainment', quantity: 1 },
    { name: 'Gaming Console', shortDescription: 'Experience next-gen gaming with awesome feature', price: 500, image: 'https://cdn1.smartprix.com/rx-iGhlAzLuU-w1200-h1200/GhlAzLuU.jpg', category: 'Tablets', quantity: 1 },
    { name: 'Bluetooth Speaker', shortDescription: 'Portable speaker with deep bass', price: 100, image: 'https://th.bing.com/th/id/OIP.rNxkdzB6EsyKwx3tG_OZvAHaHa?rs=1&pid=ImgDetMain', category: 'Accessories', quantity: 1 },
    { name: 'Tablet X', shortDescription: 'Lightweight and powerful tablet', price: 400, image: 'https://th.bing.com/th/id/OIP.tnPSJwThmR86reywvQFE0QHaFe?rs=1&pid=ImgDetMain', category: 'Tablets', quantity: 1 },
    { name: 'Tablet Y', shortDescription: 'Lightweight and powerful tablet', price: 400, image: 'https://th.bing.com/th/id/OIP.BqovwyUqHzvOW1BwrZxWiQHaHa?rs=1&pid=ImgDetMain', category: 'Tablets', quantity: 1 },
    { name: 'Tablet Z', shortDescription: 'Lightweight and powerful tablet', price: 400, image: 'https://i5.walmartimages.com/asr/bb3c4eb0-0ada-4cef-8b5f-97a11fa7ef0f.2d3805e39285bde9b9884e68e76e3608.jpeg', category: 'Tablets', quantity: 1 },
    { name: 'Smart Home Assistant', shortDescription: 'Voice-controlled smart home device', price: 200, image: 'https://cdn.dribbble.com/users/849229/screenshots/17133429/media/102e7ae34d311113da78fa6a16a610c1.jpg?compress=1&resize=840x630&vertical=top', category: 'Accessories', quantity: 1 },
    { name: 'Camera', shortDescription: 'Capture stunning photos and videos in real time', price: 750, image: 'https://th.bing.com/th/id/OIP.F3Cbk0WQAaZydDttBy_K_QHaGd?rs=1&pid=ImgDetMain', category: 'Accessories', quantity: 1 },
    { name: 'Smartphone Out of Stock', shortDescription: 'Out of stock mobile phone', price: 0, image: 'https://th.bing.com/th/id/OIP.V8NVXODUkODhicTKe7MblAHaIL?rs=1&pid=ImgDetMain', category: 'mobile', quantity: 0 },
    { name: 'Laptop Out of Stock', shortDescription: 'Out of stock laptop will be avaliable soon', price: 0, image: 'https://th.bing.com/th/id/OIP.WCCq2nZelTZuFIRbJF7AuAHaEK?rs=1&pid=ImgDetMain', category: 'Laptops', quantity: 0 },
    { name: 'Headphpone Out of Stock', shortDescription: 'Out of stock accessory', price: 0, image: 'https://th.bing.com/th/id/R.6a0b65c256fcc25d77267ca04858887e?rik=Vo668FFWe1dFww&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fheadphones-hd-png-headphones-png-image-1005.png&ehk=bAzJKbYvpa7Aw02BGAv%2fuUVe5qV5I8jgX5PNlL%2f162I%3d&risl=&pid=ImgRaw&r=0', category: 'Accessories', quantity: 0 },
    { name: 'Tablet Out of Stock', shortDescription: 'Out of stock tablet will be avaliable soon', price: 0, image: 'https://th.bing.com/th/id/OIP.kVw9lOC-hHRCei-ubFGMtAHaHa?rs=1&pid=ImgDetMain', category: 'Tablets', quantity: 0 }
  ];


  constructor() { }

  getProducts(category: string = 'all'): Product[] {
    if (category === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }
  searchProducts(query: string): Product[] {
    return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  }
}
