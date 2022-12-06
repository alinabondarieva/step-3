import { api } from "../API/API.js"
import {form} from "../components/form.js"
import {button} from "../components/button.js"

class Modal{
    constructor(){
        this.modal = document.createElement("div")
        this.modal.className = "modal"
        this.modalWindow = document.createElement("div")
        this.modalWindow.className = "modal-window"
        this.closeModalBtn = document.createElement("button")
        this.closeModalBtn.innerText = "X"
        this.closeModalBtn.className = "close"
        this.closeModalBtn.addEventListener("click", this.closeModal.bind(this))
        this.parent = document.querySelector("#root")
        // this.modal.addEventListener("click", this.closeModal.bind(this))
    }
    renderModal(title, id){ 
        this.modal.innerHTML= ""
        this.modalWindow.innerHTML = ""
        this.modal.id = id
        const titleModal = document.createElement("h4")
        titleModal.innerText = title 
        titleModal.className = "title-modal"
    this.modal.append(this.modalWindow)
    this.parent.append(this.modal)
    this.modalWindow.append(
        this.closeModalBtn,      
        titleModal,
        form.renderForm(`${id}-form`)
    )
    }
    renderModalEdit(title, id, data){
        this.modal.innerHTML= ""
        this.modalWindow.innerHTML = ""
        const titleModal = document.createElement("h4")
        titleModal.innerText = title 
        titleModal.className = "title-modal"
        this.modal.append(this.modalWindow)
        this.parent.append(this.modal)
        this.modalWindow.append(
            this.closeModalBtn,      
            titleModal,
            form.renderForm(`${id}-form`, data)
        )
    }
    renderModalRemove(element, id){
        this.modal.innerHTML= ""
        this.modalWindow.innerHTML = ""
        const titleModal = document.createElement("h4")
        titleModal.innerText = "are u sure to delete?" 
        titleModal.className = "card-modal"
        const btnSubmit = button.renderBtn("submit", "submit", "submitBtn")
        const btnCancel = button.renderBtn("cancel", "cancel", "cancelBtn")
        this.modal.append(this.modalWindow)
        this.parent.append(this.modal)
        this.modalWindow.append(
            this.closeModalBtn,      
            titleModal,
            btnSubmit, btnCancel
        )    
        btnCancel.addEventListener("click", this.closeModal.bind(this))
        btnSubmit.addEventListener("click", this.handleCardDelete.bind(this, element, id))
    }
    closeModal(){
        const close = document.querySelector(".modal")
        close.remove()
    }
    handleCardDelete(element, id){
                try{
            api.deleteData(id, "/cards")
            this.closeModal()
            element.remove()
            .then(res => {
                this.closeModal() 
                element.remove()})
        }catch(error){
            console.log(error)
        }
    }
}

const modal = new Modal()
export {modal}