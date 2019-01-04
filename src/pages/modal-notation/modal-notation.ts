import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-modal-notation',
    templateUrl: 'modal-notation.html',
})
export class ModalNotationPage {

    event = {
        name: "Nom event",
        author: {
            name: "nom auteur"
        }
    }

    constructor(public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        var a = document.getElementsByTagName("ion-modal")
        a[0].addEventListener("click",(event:any)=>{
            var flag:boolean = true;
            event.path.forEach(element => {
                if(element.localName=="page-modal-notation"){
                    flag=false
                }
            });
            if(flag){
                this.close();
            }
        })
    }

    close() {
        this.navCtrl.pop();
    }
}