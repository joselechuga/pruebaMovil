import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro:FormGroup;

  constructor(public fb: FormBuilder , public alertController:AlertController,
    public navCtrl: NavController ) {

    this.formularioRegistro= this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required),
    })
   }

  ngOnInit() {
  }

  async guardar(){

    var f = this.formularioRegistro.value;



    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos!',
        message: 'Debes rellenar todos los campos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password,
      conPassword : f.confirmacionPassword
    }

    if(usuario.password != usuario.conPassword){
      console.log('distinta');
      const alert = await this.alertController.create({
        header: 'La contraseña no coincide!',
        message: 'Verifica que la contraseña y la confirmacion de contraseña sean las mismas',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }else{
      this.navCtrl.navigateRoot('login');
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));//SE GUARDA DE FORMA LOCAL
  }

}
