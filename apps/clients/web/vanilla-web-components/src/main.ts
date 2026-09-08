import "./style.css";
import heroImg from "./assets/hero.png";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
  </div>
  <button id="counter" type="button" class="counter"></button>
  <todo-item checked="true">
    <div slot="title">This is a custom web component</div>
    <span slot="item">To do 1</span>
    <span slot="item-1">To do 2</span>
    <span slot="item-2">To do 3</span>
    <span slot="item-3">To do 4</span>
    <span slot="item-4">To do 5</span>
    <span slot="item-5">To do 6</span>
  </todo-item>
  <ul is="expandable-list" data-expanded>
    <li>Item 1</li>
    <li>Item 2</li>
    <ul is="expandable-list" data-expanded>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </ul>
  <custom-select>
    <custom-option>Option 1</custom-option>
    <custom-option>Option 2</custom-option>
    <custom-option>Option 3</custom-option>
    <custom-option>Option 4</custom-option>
  </custom-select>

  <audio controls src=""></audio>
</section>

`;
