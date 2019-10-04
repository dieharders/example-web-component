const getStyle = () => {
  return `
  .text {
    font-family: sans-serif;
    font-weight: 800;
    letter-spacing: -2px;
    position: relative;
    font-size: 24px;
    text-transform: uppercase;
  }
  .container {
    text-align: center;
    display: block;
    position: relative;
    overflow: hidden;
    width: 400px;
    height: 400px;
    border-radius: 5px;
    font-family: Helvetica;
    margin: 4px;
    background-color: 0;
  }
  img {
    left: 0px;
    position: absolute;
    transition: 1s;
    background-size: 400px 400px;
  }
  button {
    display: block;
    position: relative;
    text-align: center;
    background-color: #1a1a1a9b;
    width: 52px;
    height: 52px;
    padding: 8px;
    padding-top: 2px;
    margin: auto;
    border-radius: 4px;
    border: 4px solid black;
    cursor: pointer;
  }
    button:hover {
      border: 4px solid white;
      background: #1a1a1a;
    }
    button:active {
      border: 4px solid white;
      background: white;
    }
    button.btn-left {
      top: 162px;
      right: 40%;
    }
    button.btn-right {
      top: 110px;
      left: 40%;
    }
  .slide-right {
      left: 400px;
      transition: 1s;
  }
  .slide-left {
    left: -400px;
    transition: 1s;
}
  `
}

class ImageCarousel extends HTMLElement {
  connectedCallback () {
    this.attachShadow({mode: 'open'});
    this.render();
  }

  setStyle () {
    const styleTag = document.createElement('style');
    styleTag.textContent = getStyle();
    this.shadowRoot.appendChild(styleTag);
  }

  slide(div, style) {
    const images = div.getElementsByTagName("img");
    const last = images.length-1;
    const firstImage = images[0];
    const lastImage = images[last];
    firstImage.classList.add('slide-' + style.toLowerCase() );
    div.insertBefore(lastImage, firstImage);
    lastImage.classList.remove('slide-right');
    lastImage.classList.remove('slide-left');
  }

  addBtnEventListeners (div, btn, style) {
    btn.addEventListener('click', () => { this.slide(div, style) });
  }

  createButtons(div, text, style, icon) {
    const btn = document.createElement('BUTTON');
    btn.classList.add('text');
    btn.classList.add(style);
    btn.innerHTML = icon;
    this.addBtnEventListeners(div, btn, text);
    div.appendChild(btn);
  }

  addImage(url) {
    const image = document.createElement('IMG');
    image.setAttribute("src", url);
    image.setAttribute("width", "400");
    image.setAttribute("height", "400");
    return image;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('container');
    this.shadowRoot.appendChild(div);

    const imageUrls = ["https://images.unsplash.com/photo-1570130298930-5013c4438aa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                      "https://images.unsplash.com/photo-1570133103227-96458ed32d7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
                      "https://images.unsplash.com/photo-1570132579542-2cbab2583a5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                      "https://images.unsplash.com/photo-1570097482939-0af870ad7914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"];

    for (let index = 0; index < imageUrls.length; index++) {
      const url = imageUrls[index];
      const image = this.addImage(url);
      div.appendChild(image);
      if (index > 0) {
        image.classList.add('slide-right');
      }
    }

    this.createButtons(div, 'Left', 'btn-left', '👈');
    this.createButtons(div, 'Right', 'btn-right', '👉');
    this.setStyle();
  }
}

customElements.define('image-carousel', ImageCarousel);