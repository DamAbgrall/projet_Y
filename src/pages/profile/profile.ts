import { Component } from '@angular/core';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

    profile={
        name:"Nom",
        profilePic:"images/yellow-point.png",
        prefered:"Evenement",
        score:0,
    }
    comments=[
        {
            author:{
                name:"Nom 1",
                profilePic:"images/yellow-point.png",
            },
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            score:5
        },
        {
            author:{
                name:"Nom 2",
                profilePic:"images/yellow-point.png",
            },
            content:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            score:4
        },
        {
            author:{
                name:"Nom 3",
                profilePic:"images/yellow-point.png",
            },
            content:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            score:2
        }
    ]
    firstComment={}

	constructor() {
        var score = 0;
        for (let comment of this.comments){
            score = score+comment.score;
        }
        this.profile.score=score/this.comments.length;
        console.log(this.profile.score)
        this.firstComment = this.comments[0];
        this.comments.splice(0,1);
    }    
    getStar(number){
        if (this.profile.score >= number){
            return "star"
        }else{
            if(Math.round(this.profile.score) ==number ){
                return "star-half"
            }else{
                return "star-outline"
            }
        }
    }
    getCommentStar(comment,number){
        if (comment.score >= number){
            return "star"
        }else{
            return "star-outline"
        }
    }
    getPrefered(){
        return "images/"+this.profile.prefered+".png"
    }
}
