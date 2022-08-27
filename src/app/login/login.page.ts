import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    usuario:"",
    password:""
  }

  formularioLogin:FormGroup;

  constructor(private router: Router,public fb:FormBuilder , 
    public alertController:AlertController,
    public navCtrl: NavController ) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  } 

  ngOnInit() {
  }
  
  async ingresar(){
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.nombre == f.nombre && usuario.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      let navigationExtras: NavigationExtras = {
      state: {
        user: this.user 
      }
    };
    this.router.navigate(['/home'],navigationExtras); 

    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos!',
        message: 'Usuario y/o contraseña incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
      
    }

    }

}

/** // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  */