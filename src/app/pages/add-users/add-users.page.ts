import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
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
  onlyNumbers: any = new RegExp('^[0-9]+$');


  ngOnInit() {
    // console.log("entrou");
    // console.log(this.user)
    if (this.user) {
      this.update = true;
      this.datas = this.user;
    }

  }
  async send(form: NgForm) {
    //variaveis importantes para fazer a manipulação mais abaixo do codigo
    let cpfExist;
    let msg: string = '';

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
    if (this.datas.nome === '' || this.datas.nome === null) {
      this.msg('preencha o nome');
    } else if (this.datas.email === '' || this.datas.email === null) {
      this.msg('preencha o email');
    } else if (this.datas.cpf === '' || this.datas.cpf === null) {
      this.msg('preencha o cpf');
    } else if (this.datas.senha === '' || this.datas.senha === null) {
      this.msg('preencha a senha');
    } else if (this.datas.nivel === '' || this.datas.nivel === null) {
      this.msg('preencha o nível');
    } else if (this.update) {
      this.service.update(user, this.user.id).subscribe(
        (response) => {
          this.modalController.dismiss(response)
        })
    } else {

      /*Primeiro teste irá ver se o user inseriu apenas
      numeros no inpu*/
      if (this.onlyNumbers.test(user.cpf)) {
        /*segunda condiçao sera responsavel por verificar se ja existe
         um cpf igual ao que foi inserido*/
        user.cpf = this.getCpfFormated(user.cpf);
        cpfExist = await firstValueFrom(this.service.getUserByCPF(user.cpf));
        if (cpfExist) {
          // caso de false, a variavel 'msg' receberá um valor e campo será limpo

          this.datas.cpf = '';
          msg = 'este cpf ja existe';
        }
      } else {
        // caso de false, a variavel 'msg' receberá um valor e campo será limpo
        this.datas.cpf = '';

        msg = 'Somente numeros no campo CPF';
        cpfExist = true;
      }




      const emailExist = await firstValueFrom(this.service.getUserByEmail(user.email));

      if (emailExist) {
        this.msg('Este email já existe');
      } else if (cpfExist) {
        /*Essa condição será responsavel por "liberar" a criação do user.
        Aqui, caso a variavel cpfExist receber o valor true, por conta das condições mostradas acima,
        o codigo nao dara prosseguimento para criação do user
        */
        this.datas.cpf = '';

        this.msg(msg);



      } else {
        this.service.create(user).subscribe(
          (response) => {
            this.modalController.dismiss(response);
          })
      }
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

  /**
   * getCpfFormated -> funçao responsavel por formatar o cpf e retornar o cpf formatado
   */

  getCpfFormated(cpf: string): string {
    //array com os cada parte do cpf
    let cpfGroup: Array<string> = [
      `${cpf[0]}${cpf[1]}${cpf[2]}`,
      `${cpf[3]}${cpf[4]}${cpf[5]}`,
      `${cpf[6]}${cpf[7]}${cpf[8]}`,
      `${cpf[9]}${cpf[10]}`
    ];
    //formando o cpf formatado
    let formattedCpf: string = `${cpfGroup[0]}.${cpfGroup[1]}.${cpfGroup[2]}-${cpfGroup[3]}`;
    return formattedCpf;





  }

}
