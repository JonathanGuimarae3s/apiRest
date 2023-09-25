import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario, UsuarioService } from 'src/app/servico/usuario.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.page.html',
  styleUrls: ['./add-users.page.scss'],
})
export class AddUsersPage implements OnInit {
  @Input() user!: Usuario;

  public update: boolean = false;
  constructor(private service: UsuarioService, private modalController: ModalController, private toastController: ToastController) { }
  datas = {
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    nivel: '',
  }

  ngOnInit() {
    // console.log("entrou");
    // console.log(this.user)
    if (this.user) {
      this.update = true;
      this.datas = this.user;
    }

  }
  send(form: NgForm) {



    // console.log(form.value);


    // for (const key in form.value) {
    //   if (form.value[key] === '') {

    //     this.msg('preencha os campos')
    //   } else {
    //     const user = form.value;
    //     if (this.update) {
    //       this.service.update(user, this.user.id).subscribe(
    //         (response) => {
    //           this.modalController.dismiss(response)
    //         })
    //     } else {
    //       this.service.create(user).subscribe(
    //         (response) => {
    //           this.modalController.dismiss(response);
    //         })
    //     }
    //   }

    // }

    const user = form.value;
    if
      (this.datas.nome === '' || this.datas.nome === null) {
      this.msg('preencha o nome');
    } else if
      (this.datas.email === '' || this.datas.email === null) {
      this.msg('preencha o email');
    } else if
      (this.datas.cpf === '' || this.datas.cpf === null) {
      this.msg('preencha o cpf');
    } else if
      (this.datas.senha === '' || this.datas.senha === null) {
      this.msg('preencha a senha');
    } else if
      (this.datas.nivel === '' || this.datas.nivel === null) {
      this.msg('preencha o nível');
    } else if
      (this.update) {
      this.service.update(user, this.user.id).subscribe(
        (response) => {
          this.modalController.dismiss(response)
        })
    } else {
      this.service.create(user).subscribe(
        (response) => {
          this.modalController.dismiss(response);
        })
    }




  }
  closeModal() {
    this.modalController.dismiss();
  }
  msg(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }

}
