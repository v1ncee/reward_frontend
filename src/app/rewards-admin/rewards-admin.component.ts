import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards-admin',
  templateUrl: './rewards-admin.component.html',
  styleUrls: ['./rewards-admin.component.sass']
})
export class RewardsAdminComponent implements OnInit {
  items = [
    {name: 'Aruba', price: 3000, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
    {name: 'Opleiding', price: 200, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
    {name: 'Test', price: 25, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
    {name: 'Bier', price: 25, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
    {name: 'Trip to North Korea', price: 'FREE', image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
    {name: 'JAVA', price: 'DEAD', image: 'http://3.bp.blogspot.com/-kUT0WNNNTLo/TrUbE-gvyUI/AAAAAAAABHU/wF_0X7Hs258/s1600/javadead.png', active: false},

  ];
  constructor() { }

  ngOnInit() {

  }

  filter(filter) {
    console.log(filter);
  }

  search(name) {
    console.log(name);
  }

  toggleClass(item){
    item.active = !item.active;
  }

}
