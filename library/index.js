console.log("80%");
class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = "";
    this.overlay = "";
    this.modalContent = "";
    this.btnClose = "";
  }

  buildModal(content) {
    //Overlay
    this.overlay = this.setDomNode(this.overlay, "div", "overlay");

    //Modal
    this.modal = this.setDomNode(this.modal, "div", "modal", this.classes);

    //Modal content
    this.modalContent = this.setDomNode(
      this.modalContent,
      "div",
      "modal__content"
    );

    //BtnClose
    this.btnClose = this.setDomNode(this.modal, "span", "modal__close-icon");
    this.btnClose.innerHTML =
      '<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M12.4239 10.5172L20.6009 2.33999C21.1331 1.80809 21.1331 0.948089 20.6009 0.416194C20.069 -0.115701 19.209 -0.115701 18.6771 0.416194L10.4999 8.59343L2.3229 0.416194C1.79076 -0.115701 0.931004 -0.115701 0.399108 0.416194C-0.133036 0.948089 -0.133036 1.80809 0.399108 2.33999L8.5761 10.5172L0.399108 18.6945C-0.133036 19.2263 -0.133036 20.0863 0.399108 20.6182C0.664184 20.8836 1.01272 21.0169 1.361 21.0169C1.70929 21.0169 2.05758 20.8836 2.3229 20.6182L10.4999 12.441L18.6771 20.6182C18.9425 20.8836 19.2907 21.0169 19.639 21.0169C19.9873 21.0169 20.3356 20.8836 20.6009 20.6182C21.1331 20.0863 21.1331 19.2263 20.6009 18.6945L12.4239 10.5172Z" fill="#2F281E"/>\n' +
      "</svg>\n";

    //Content
    this.setContent(content);
    this.appendElementsInModal();
  }

  setDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  appendElementsInModal() {
    this.modal.append(this.btnClose);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  setContent(content) {
    if (typeof content === "string") {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = "";
      this.modalContent.append(content);
    }
  }

  setHandlerBtnClose() {
    document.addEventListener("click", (e) => {
      if (e.target.parentNode.classList.contains("modal__close-icon")) {
        document.querySelector(".overlay").classList.add("hidden");
        document.querySelector(".overlay").remove();
      }
    });
  }

  openModal() {
    document.body.append(this.overlay);
  }
}

const generateModal = (content, classes) => {
  let modalWindow = new Modal(classes);
  modalWindow.buildModal(content);
  modalWindow.openModal();
  modalWindow.setHandlerBtnClose();
  console.log(modalWindow);
};

const setHidden = (blocks) => {
  blocks.forEach((block) => block.classList.add("hidden"));
};

const hideFavoriteBookBlock = (blockName) => {
  let blocks = document.querySelectorAll("." + blockName);
  console.log(blocks);
  blocks.forEach((block) => {
    block.classList.remove("fade");
    block.classList.add("fade-out");
  });
  setHidden(blocks);
};

const showFavoriteBookBlock = (blocks) => {
  blocks.forEach((block) => {
    block.classList.remove("fade-out");
    block.classList.add("fade");
  });
};

const setCurrentSlide = (number) => {
  for (let i = 1; i <= 3; i++) {
    document.querySelector(".slide-" + i).classList.add("hidden");
    document.querySelector("#pagination .item-" + i).classList.remove("active");
  }
  document.querySelector(".slide-" + number).classList.remove("hidden");
  document.querySelector("#pagination .item-" + number).classList.add("active");
};

const openModalFormLogin = () => {
  let loginForm = document.querySelector(".login-form");
  if (document.querySelector(".login-form-modal") == undefined) {
    let loginFormModal = new Modal("login-form-modal");
    loginFormModal.buildModal(loginForm);
    loginFormModal.setHandlerBtnClose();
    loginFormModal.openModal();
  }

  let subMenu = document.querySelector(".sub-menu");
  document
    .querySelector(".login-form-modal .login-form")
    .classList.remove("hidden");
  subMenu.classList.add("hidden");
};

const hideSubMenu = () => {
  let subMenu = document.querySelector(".sub-menu");
  subMenu.classList.add("hidden");
};

const openModalFormRegister = () => {
  let registerForm = document.querySelector(".register-form");
  let registerFormModal = new Modal("register-form-modal");
  registerFormModal.buildModal(registerForm);
  registerFormModal.setHandlerBtnClose();
  registerFormModal.openModal();
  hideSubMenu();
  document.querySelector(".register-form").classList.remove("hidden");
};

const setActiveFavorite = (selectedSeasonName) => {
  let blockNameHide = localStorage.getItem("currentActiveFavoriteSeason");
  hideFavoriteBookBlock(blockNameHide);
  localStorage.setItem("currentActiveFavoriteSeason", selectedSeasonName);
  let blockNameShow = document.querySelectorAll("." + selectedSeasonName);
  showFavoriteBookBlock(blockNameShow);
  let blocksFavorites = ["winter", "spring", "summer", "autumn"];
  let hiddenBlocksFavorites = blocksFavorites.filter(
    (season) => season !== selectedSeasonName
  );
  document.querySelector("." + selectedSeasonName).classList.remove("hidden");
};

const getFormData = (form) => {
  var formData = new FormData(form);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  console.log(Object.fromEntries(formData));
  return JSON.stringify(Object.fromEntries(formData));
};

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("currentActiveFavoriteSeason", "winter");
  document.querySelector("#btn-sign-up").addEventListener("click", () => {
    generateModal("testOne-btn-sing-up", "modal__sign-up");
  });

  document.querySelector(".profile-icon").addEventListener("click", () => {
    document.querySelector(".sub-menu").classList.toggle("hidden");
  });

  if (document.getElementById("id-register-form") !== null) {
    document
      .getElementById("id-register-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        let dataRegisterUser = getFormData(e.target);
        localStorage.setItem("registered", dataRegisterUser);
      });
  }

  if (document.getElementById("id-login-form") !== null) {
    document.getElementById("id-login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let dataloginUser = getFormData(e.target);
      let dataRegisterUser = JSON.parse(localStorage.getItem("registered"));
      console.log(dataRegisterUser);
      console.log(dataloginUser);
    });
  }
});
