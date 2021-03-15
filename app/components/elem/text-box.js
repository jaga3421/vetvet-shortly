import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ElemTextBoxComponent extends Component {
    @tracked isLabelUp;
    @tracked value;

    @action
    onBlur(e) {
        if(!e.target.value) {
            this.isLabelUp = false;
        }
    }

    @action
    onFocus(e) {
        if(!e.target.value) {
            this.isLabelUp = true;
        }
    }
}
