import Component from '@glimmer/component';
import copy from 'copy-to-clipboard';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';

export default class PartialsShortLinkListComponent extends Component {
    @tracked copied = false;

    @action copyToClipBoard(text) {
        this.copied = true;
        copy(text);
        setTimeout(() => this.copied = false, 3000)
        
    }
}
