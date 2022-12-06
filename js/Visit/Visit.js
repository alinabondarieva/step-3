import { button } from "../components/button.js"
import { input } from "../components/input.js"
import { modal } from "../Modal/modal.js"

class Visit {
    constructor() {
        this.section = document.createElement("section")
        this.ul = document.createElement("ul")
        this.ul.className = "card-list"
    }
    renderEditForm(data) {
        const parent = document.createElement("div")
        parent.className = "visit"
        const inputTitle = input.renderInput("title visit", "title", "title visit", "text", true, data.title)
        const inputName = input.renderInput("first and lastname", "name", "first and lastname", "text", true, data.name)
        const inputPr = input.renderInputSelectEdit("priority", "priority", ["high", "normal", "low"], "priority", data.priority)
        const textArea = input.renderTextArea("visit describe", "description", "visit describe", true, data.description)
        inputTitle.className = "c"
        inputName.className = "names"
        inputPr.className = "priority"
        textArea.className = "visit-describe"
        parent.append(inputTitle, textArea, inputPr, inputName)
        return parent

    }

    renderCommonForm() {
        const parent = document.createElement("div")
        parent.className = "visit"
        const inputTarget = input.renderInput("target visit", "title", "target visit", "text", true)
        const inputName = input.renderInput("first and lastname", "name", "first and lastname", "text", true)
        const inputPr = input.renderInputSelect("priority", "priority", ["high", "normal", "low"], "priority")
        const textArea = input.renderTextArea("visit describe", "description", "visit describe", true)
        inputTarget.className = "c"
        inputName.className = "names"
        inputPr.className = "priority"
        textArea.className = "visit-describe"
        parent.append(inputTarget, textArea, inputPr, inputName)
        return parent
    }
    editCard(data) {
        const li = document.getElementById(data.id)
        li.className = "card-item"
        const p = li.querySelectorAll("p")
        const doctor = p[0]
        const userName = p[1]
        const close = li.querySelector(".close")
        const editbtn = li.querySelector(".edit-btn")
        const morebtn = li.querySelector(".more-btn")
        doctor.innerText = data.doctor
        userName.innerText = data.name
        close.addEventListener("click", this.handleDeleteCard.bind(this))
        editbtn.addEventListener("click", this.handleEdit.bind(this, data))
        morebtn.addEventListener("click", this.handleMore.bind(this, data))
    }
    renderCards(data) {
        this.ul.innerText = ""
        const parent = document.querySelector("main")
        data.forEach(item => {
            const li = document.createElement("li")
            const title = document.createElement("h4")
            title.className = "card-title"
            title.innerText = "patient info:"
            li.className = "card-item"
            li.id = item.id
            const doctor = document.createElement("p")
            const userName = document.createElement("p")
            const editbtn = button.renderBtn("edit card", "button", "edit-btn")
            const morebtn = button.renderBtn("show more", "button", "more-btn")
            const close = button.renderBtn("X", "button", "close")
            doctor.innerText = `doctor: ${item.doctor}`
            userName.innerText = `patient: ${item.name}`
            li.append(close, title, userName, doctor, morebtn, editbtn)
            close.addEventListener("click", this.handleDeleteCard.bind(this))
            editbtn.addEventListener("click", this.handleEdit.bind(this, item))
            morebtn.addEventListener("click", this.handleMore.bind(this, item))
            this.ul.append(li)
        })
        this.section.append(this.ul)
        parent.append(this.section)
    }

    renderCard(data) {
        const li = document.createElement("li")
        li.className = "card-item"
        li.id = data.id
        const doctor = document.createElement("p")
        const userName = document.createElement("p")
        const editbtn = button.renderBtn("edit card", "button", "edit-btn")
        const morebtn = button.renderBtn("show more", "button", "more-btn")
        const close = button.renderBtn("X", "button", "close")
        doctor.innerText = data.doctor
        userName.innerText = data.name
        li.append(close, userName, doctor, morebtn, editbtn)
        close.addEventListener("click", this.handleDeleteCard.bind(this))
        editbtn.addEventListener("click", this.handleEdit.bind(this, data))
        morebtn.addEventListener("click", this.handleMore.bind(this, data))
        this.ul.append(li)
    }

    handleDeleteCard(event) {
        event.preventDefault()
        const elementForRemove = event.target.closest("li")
        const id = elementForRemove.id
        modal.renderModalRemove(elementForRemove, id)
    }
    handleEdit(data) {
        modal.renderModalEdit("edit card", "edit", data)

    }
    handleMore(data) {
        if (data.doctor === "dentist") {
            this.renderDentist(data)
        }
        if (data.doctor === "therapevt") {
            this.renderTherapevt(data)
        }
        if (data.doctor === "cardiologist") {
            this.renderCardiologist(data)
        }
    }
    renderDentist(data) {
        const parent = document.getElementById(data.id)
        const p = parent.querySelectorAll("p")
        const btn = parent.querySelector(".more-btn")
        const btnHide = button.renderBtn("hide info", "button", "hide-btn")
        parent.replaceChild(btnHide, btn)
        const neighbor = p[p.length - 1]
        neighbor.insertAdjacentHTML("afterend", `<div id="show-more-${data.id}"><p>last visit: ${data["last-visit"]}</p><p>next visit: ${data["data-visit"]}</p><p>priority: ${data["priority"]}</p><p>status: ${data["status"]}</p><p>title: ${data["title"]}</p></div>`)
        btnHide.addEventListener("click", this.handleHide.bind(this, data))
    }
    renderTherapevt(data) {
        const parent = document.getElementById(data.id)
        const p = parent.querySelectorAll("p")
        const btn = parent.querySelector(".more-btn")
        const btnHide = button.renderBtn("hide info", "button", "hide-btn")
        parent.replaceChild(btnHide, btn)
        const neighbor = p[p.length - 1]
        neighbor.insertAdjacentHTML("afterend", `<div id="show-more-${data.id}"><p>desciption: ${data["description"]}</p><p>patient age: ${data["patient-age"]}</p><p>next visit: ${data["data-visit"]}</p><p>priority: ${data["priority"]}</p><p>status: ${data["status"]}</p><p>title: ${data["title"]}</p></div>`)
        btnHide.addEventListener("click", this.handleHide.bind(this, data))
    }
    renderCardiologist(data) {
        const parent = document.getElementById(data.id)
        const p = parent.querySelectorAll("p")
        const btn = parent.querySelector(".more-btn")
        const btnHide = button.renderBtn("hide info", "button", "hide-btn")
        parent.replaceChild(btnHide, btn)
        const neighbor = p[p.length - 1]
        neighbor.insertAdjacentHTML("afterend", `<div id="show-more-${data.id}"><p>description: ${data["description"]}</p><p>presssure data: ${data["bp"]}</p><p>body mass index: ${data["weight"]}</p><p>heart illnesses: ${data["heart-illnesses"]}</p><p>patient age: ${data["patient-age"]}</p><p>data visit: ${data["data-visit"]}</p><p>priority: ${data["priority"]}</p><p>status: ${data["status"]}</p><p>title: ${data["title"]}</p></div>`)
        btnHide.addEventListener("click", this.handleHide.bind(this, data))
    }
    handleHide(data) {
        const parent = document.getElementById(data.id)
        const p = document.getElementById(`show-more-${data.id}`)
        const btn = button.renderBtn("show more", "button", "more-btn")
        const btnHide = parent.querySelector(".hide-btn")
        parent.replaceChild(btn, btnHide)
        p.remove()
        btn.addEventListener("click", this.handleMore.bind(this, data))
    }
}

const visit = new Visit()
export { visit, Visit }