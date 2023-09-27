import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/servico/product.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddProductsPage } from '../add-products/add-products.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public products: Product[] = [];


  constructor(private service: ProductService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {

    this.service.getAll().subscribe((response) => {
      this.products = response;
    })
  }
  /**
   * delete
   */
  public delete(cod: any) {

    // console.log(product);
    this.service.delete(cod).subscribe(() => {

      this.service.getAll().subscribe((response) => {
        this.products = response;

      })
    })

  }
 



  /**
   * addProduct
   */
  public addProduct() {
    this.modalCtrl.create({
      component: AddProductsPage
    }).then((modal) => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.service.getAll().subscribe((response) => {
        this.products = response;
      })
    })

  }

  update(product: Product) {
    this.modalCtrl.create({
      component: AddProductsPage,
      componentProps: { product }
    }).then(modal => {

      modal.present();
      return modal.onDidDismiss();

    }).then(
      ({ data }) => {
        this.service.getAll().subscribe(
          (response) => {
            this.products = response;
          })
      })
    this.toastController.create({
      message: 'produto atualizado com sucesso',
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }



}
