/**
 *  Purpose : 
 *  Get contents from API for webpage text
 *  Accept language switch and return new content 
 *  
 */

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BaseComponentService extends Service {
    // set default language as English
    // #todo: Pick language from Local storage
    lang = 'en';
    isLoading = false;
    @tracked content;


    init(){
        super.init(...arguments)
        // get contents from content api 
        this.getContents();
    }

    async getContents() {
        // get contents to be populated in page 
        this.isLoading = true;
        let data = await fetch(`contents/home/${this.lang}.json`);
        data = await data.json();
        this.content = data;
        this.isLoading = false
    }

    setLang(lang) {
        // set new language and trigger a new request
        this.lang = lang;
        this.getContents();
    }
}
