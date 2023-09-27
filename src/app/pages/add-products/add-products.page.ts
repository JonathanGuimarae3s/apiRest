import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Product, ProductService } from 'src/app/servico/product.service';

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
    serie: '',

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

      product.serie = this.generateSerieCode()

      this.service.create(product).subscribe((response) => {
        this.modalController.dismiss(response);
      })
    }


  }

  closeModal() {
    this.modalController.dismiss();
  }
  generateSerieCode(length: number = 6): String {
    let product;
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let serie: string = '';

    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      serie += characters.charAt(randomIndex);
    }
    let productExist = this.service.getProductBySerie(serie).subscribe((response) => {

      return response;
    })
    if (!productExist) {
      console.log(111111)
      this.generateSerieCode();

    }

    return serie;

  }


}

