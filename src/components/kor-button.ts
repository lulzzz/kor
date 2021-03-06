import { LitElement, css, html, customElement, property } from 'lit-element'
import { sharedStyles } from './shared-styles'

@customElement('kor-button')
export class korButton extends LitElement {

  @property({ type: String, reflect: true }) label = 'Label';
  @property({ type: String, reflect: true }) icon;
  @property({ type: String, reflect: true }) color = 'primary';
  @property({ type: Boolean, reflect: true }) disabled;
  
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: flex;
        height: fit-content;
        width: fit-content;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s all ease-in-out;
        justify-content: center;
      }
      .label {
        font-weight: bold;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host(:not([icon])) {
        min-width: 56px;
        max-width: 160px;
        padding: 4px 12px;
      }
      :host([color="tertiary"]:not([icon])) {
        padding: 3px 11px;
      }
      :host([icon]) {
        padding: 4px;
      }
      :host([color="tertiary"][icon]) {
        padding: 3px;
      }
      /* idle */
      :host([color="primary"]) {
        background-color: rgb(var(--accent-1));
      }
      :host([color="secondary"]) {
        background-color: rgba(var(--neutral-1), .10);
      }
      :host([color="tertiary"]) {
        border-width: 1px;
        border-style: solid;
        border-color: rgba(var(--neutral-1), .25);
      }
      /* disabled */
      :host([disabled]) {
        pointer-events: none;
        opacity: .20;
      }
      /* text and icon colors */
      :host([color="primary"]) .label,
      :host([color="primary"][icon]) kor-icon {
        color: rgba(255, 255, 255, .90);
      }
      /* hover inputs */
      @media (hover: hover) {
        :host([color="primary"]:not(:active):hover) {
          background-color: rgb(var(--accent-1b));
        }
        :host([color="secondary"]:not(:active):hover) {
          background-color: rgba(var(--neutral-1), .15);
        }
        :host([color="tertiary"]:not(:active):hover) {
          border-color: rgba(var(--neutral-1), .30);
          background-color: rgba(var(--neutral-1), .05);
        }
      }
    `]
  }

  render() {
    return html`
      ${!this.icon ? html`
        <kor-text class="label">${this.label}</kor-text>
      ` : html`
        <kor-icon icon="${this.icon}"></kor-icon>
      `}
    `
  }

  attributeChangedCallback(name, oldval, newval) { 
    super.attributeChangedCallback(name, oldval, newval); 
    this.dispatchEvent(new Event(`${name}-changed`));
  }

}
