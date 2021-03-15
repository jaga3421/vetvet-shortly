/**
 *  Purpose : 
 *  Make request to backend
 *  Store the results in LS
 *  
 */

 import Service from '@ember/service';
 import { tracked } from '@glimmer/tracking';
 
 export default class BaseComponentService extends Service {
     api = {
         'shorten' : "https://api.shrtco.de/v2/shorten?url=",
         'info' : "https://api.shrtco.de/v2/info?code="
     }
     @tracked myUrls = [];
     @tracked isLoading = false;
     @tracked responseError;

     init(){
         super.init(...arguments)
         // Check for LS, if exists set value to tracked variable
         let list = localStorage.getItem('my-urls');
         let myUrls = list ? JSON.parse(list) : [];
         this.myUrls = myUrls;
     }
 
     async shortenUrl(url) {
         // get contents to be populated in page 
         this.isLoading = true;
         let data = await fetch(`${this.api.shorten}${url}`);
         data = await data.json();
         if(data.ok) {
            this.updateMyUrls(data.result);
         }
         else {
             // update error variable on failure
             console.log(data)
         }
         return data;
     }
 
     updateMyUrls(data) {
        this.myUrls.unshift(data);
        localStorage.setItem('my-urls', JSON.stringify(this.myUrls));
     }

     clearAllLinks(data) {
         this.myUrls.length = 0;
         localStorage.removeItem('my-urls');
     }
 }
 