const customOptionTemplate = document.createElement("template");
customOptionTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 10px 15px;
      cursor: pointer;
      transition: background 0.2s;
    }
    :host(:hover) {
      background-color: #f1f1f1;
    }
    :host([selected="true"]) {
      background-color: #007bff;
      color: white;
    }
  </style>
  <slot></slot>
`;

class CustomOption extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(customOptionTemplate.content.cloneNode(true));
  }

  get value() {
    return this.getAttribute("value");
  }
}
customElements.define("custom-option", CustomOption);

const customSelectTemplate = document.createElement("template");
customSelectTemplate.innerHTML = `
  <style>
    .select-container {
      position: relative;
      width: 250px;
      font-family: Arial, sans-serif;
    }
    .select-trigger {
      padding: 10px 15px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
    .select-trigger::after {
      content: '▼';
      font-size: 10px;
      color: #666;
    }
    .options-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #fff;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      max-height: 200px;
      overflow-y: auto;
      display: none;
      z-index: 10;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .options-dropdown.show {
      display: block;
    }
  </style>
    
  <div class="select-container">
    <div class="select-trigger">Chọn một mục...</div>
    <div class="options-dropdown">
      <!-- Slot này sẽ chứa các thẻ <my-option> từ DOM ngoài đưa vào -->
      <slot></slot>
    </div>
  </div>
`

class CustomSelect extends HTMLElement {
  trigger: HTMLElement;
  dropdown: HTMLElement;
  selectedValue: any;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(customSelectTemplate.content.cloneNode(true));

    this.trigger = shadow.querySelector(".select-trigger") as HTMLElement;
    this.dropdown = shadow.querySelector(".options-dropdown") as HTMLElement;
    this.selectedValue = null;
  }

  connectedCallback() {
    // Thiết lập placeholder ban đầu nếu có
    if (this.hasAttribute("placeholder")) {
      this.trigger.textContent = this.getAttribute("placeholder");
    }

    // Bắt sự kiện Click để đóng/mở Dropdown
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.dropdown.classList.toggle("show");
    });

    // Bắt sự kiện Click chọn Option bên trong Slot
    this.addEventListener("click", (e: any) => {
      const targetOption = e.target.closest("my-option");
      if (targetOption) {
        this.selectOption(targetOption);
      }
    });

    // Click ra ngoài thì đóng dropdown
    document.addEventListener("click", () => {
      this.dropdown.classList.remove("show");
    });
  }

  // Xử lý logic khi chọn 1 option
  selectOption(optionEl: any) {
    // Bỏ chọn tất cả các option cũ
    const allOptions = this.querySelectorAll("my-option");
    allOptions.forEach((opt) => opt.removeAttribute("selected"));

    // Đánh dấu option mới được chọn
    optionEl.setAttribute("selected", "true");
    this.selectedValue = optionEl.value;
    this.trigger.textContent = optionEl.textContent.trim();

    // Đóng dropdown
    this.dropdown.classList.remove("show");

    // Bắn sự kiện 'change' ra ngoài giống thẻ select mặc định
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.selectedValue },
        bubbles: true,
      })
    );
  }

  get value() {
    return this.selectedValue;
  }
}
customElements.define("custom-select", CustomSelect);