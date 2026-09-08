const template = document.createElement("template");
template.innerHTML = `
  <style>
  h3 {
    color: green;
    font-size: 24px;
  }
  .title {
    color: blue
  }
  label {
    color: red;
    display: block;
  }
  .item {
    color: orange;
  }
  </style>
  <!-- <h3 data-title></h3> -->
  <h3 class="title"><slot name="title"></slot></h3>

  <label class="item">
    <input type="checkbox" />
    <slot name="item"></slot>
    ${(() => {
      return Array.from({ length: 5 }).reduce((prev, cur, index) => {
        return prev + `<slot name="item-${index + 1}"></slot>`;
      }, "");
    })()}
  </label>
`;

class TodoItem extends HTMLElement {
  checkbox: HTMLInputElement;

  constructor() {
    super();
    // this.innerHTML = "Hi, this is a custom web element";
    // 1. Select the host element - in this case will be "this"
    // 2. Attach a shadow root (mode: 'open' allows access via JS)
    const shadow = this.attachShadow({ mode: "open" });
    // 3. Add content and scoped styles
    shadow.append(template.content.cloneNode(true));
    // this.title = shadow.querySelector("[data-title]");
    // this.title.innerText = this.innerText;

    this.checkbox = shadow.querySelector("input")!;
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    console.log(name, oldValue, newValue);
    if (name === "checked") this.updateChecked(newValue);
  }

  updateChecked(value: string | null) {
    this.checkbox.checked = value != null && value !== "false";
  }
}

customElements.define("todo-item", TodoItem);
