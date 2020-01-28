import { LitElement, css, html, customElement, property } from 'lit-element'
import { sharedStyles } from './shared-styles'

@customElement('wa-table')
export class waTable extends LitElement {

  @property({ type: Boolean, reflect: true }) readonly;
  @property({ type: Boolean, reflect: true }) condensed;
  @property({ type: String, reflect: true }) columns = "repeat(24, 1fr)";

  static get styles() {
    return [sharedStyles, css`
      :host {
        display: flex;
        flex-direction: column;
        max-height: 100%;
        margin: 0 !important;
      }
      slot {
        display: block;
      }
      slot:not([name]) {
        flex: 1;
        overflow: overlay;
      }
    `]
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
    `
  }

  attributeChangedCallback(name, oldval, newval) { 
    super.attributeChangedCallback(name, oldval, newval); 
    this.dispatchEvent(new Event(`${name}-changed`));
  }
  
}
