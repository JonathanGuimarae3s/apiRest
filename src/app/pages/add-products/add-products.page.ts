import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product,ProductService } from 'src/app/servico/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  @Input() product!: Product;
  public update: boolean = false;

  datas = {
    name: '',
    description: '',
    amount: '',
    price: '',

  }
  constructor(private service: ProductService, private modalController: ModalController) { }

  ngOnInit() {
    if (this.product) {
      this.update = true;
      this.datas = this.product;
    }
  }
  send(form: NgForm) {

    const product = form.value;
    if (this.update) {
      this.service.update(product, this.product.cod).subscribe((response) => { this.modalController.dismiss(response) })

    } else {
      this.service.create(product).subscribe((response) => {
        this.modalController.dismiss(response);
      })
    }


  }
  closeModal() {
    this.modalController.dismiss();
  }
}
