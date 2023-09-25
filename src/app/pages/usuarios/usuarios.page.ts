import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuarioService, Usuario } from 'src/app/servico/usuario.service';
import { AddUsersPage } from '../add-users/add-users.page';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  public users: Usuario[] = [];
  constructor(
    private toastController: ToastController,
    private service: UsuarioService,
    private modalCtrl: ModalController,
  ) { }


  ngOnInit() {


    this.service.getAll().subscribe(

      (response) => {

        // console.log(response);
        this.users = response;

      }

    )
  }
  update(user: Usuario) {
    this.modalCtrl.create({
      component: AddUsersPage,
      componentProps: { user }
    }).then(modal => {

      modal.present();
      return modal.onDidDismiss();

    }).then(
      ({ data }) => {
        this.service.getAll().subscribe(
          (response) => {
            this.users = response;
          })
      })
    this.toastController.create({
      message: 'Usuário atualizado com sucesso',
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }
  remove(id: any) {
    this.service.remove(id).subscribe(() => {
      this.service.getAll().subscribe(
        (response) => { this.users = response })
    });

    this.toastController.create({
      message: 'Usuário excluido com sucesso',
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }
  addUser() {

    this.modalCtrl.create(
      {
        component: AddUsersPage
      }
    ).then(
      (modal) => {
        modal.present()
        return modal.onDidDismiss();
      }
    ).then(
      ({ data }) => {
        // data sao as informações que foram passadas pelo forms

        // fazemos o retorno  das informçoes que estao no onOniti
        this.service.getAll().subscribe(
          (response) => {
            this.users = response;
          }
        )

      }
    );
    this.toastController.create({
      message: 'Usuário cadastrado com sucesso',
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }


}
