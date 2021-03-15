import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ShortenLinkComponent extends Component {
    // inject api service
    @service('api-helper') apiHelper;
    
    @tracked myUrls = this.apiHelper.myUrls;
    @tracked inputLink;
    @tracked loading;
    @tracked error;


    @action 
    updateText(e) {
        this.inputLink = e.target.value.trim();
        if(e.key === 'Enter') this.submitUrl();
    }

    @action 
    async submitUrl() {
        // if input empty or loading active, no go
        if(!this.inputLink || this.loading) return;
        this.error = '';
        this.loading = true;
        let response = await this.apiHelper.shortenUrl(this.inputLink);
        this.onResponse(response)
    }

    @action
    onResponse(res) {
        // reset button and textbox states
        if(res.ok) {
            this.loading = false;
            this.inputLink = '';
            this.myUrls = this.apiHelper.myUrls;
            // #todo, change this from dom tweak to action
            document.querySelector('input').value = '';
            document.querySelector('input').focus();
        }
        else {
            // display error message from api to UI
            this.loading = false;
            this.error = res.error;
        }
    }

    @action
    clearAllLinks() {
        this.apiHelper.clearAllLinks();
        this.myUrls = [];
    }
}
