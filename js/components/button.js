import {modal} from "../Modal/modal.js"
class Button{
    constructor(){}
    renderBtn(text, typeBtn, classBtn){
        const button = document.createElement("button")
        button.innerText = text
        button.type = typeBtn
        button.className = "btn"
        button.classList.add(classBtn)
        if(text === "login"){
          button.addEventListener("click", this.handleBtnEnter)
        }
        return button
    }
    handleBtnEnter(event){
        event.preventDefault()
        modal.renderModal("LOG IN", "modal-enter")
    }
}
const button = new Button()
export {button} 