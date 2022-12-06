import { button } from "./button.js"
import { input } from "./input.js"
import { api } from "../API/API.js"
import { modal } from "../Modal/modal.js"
import { changeBtn, renderNoItems, updateStatus } from "../index.js"
import { visit } from "../Visit/Visit.js"
import { visitCardiologist } from "../Visit/VisitCardiologist.js"
import { visitDentist } from "../Visit/VisitDentist.js"
import { visitTherapist } from "../Visit/VisitTherapist.js"
import { filter } from "./filter.js"

class Form {
    constructor() {
        this.form = document.createElement("form")
    }
    renderForm(id, data) {
                this.form.id = id
        if (id === "modal-enter-form") {
            this.form.innerHTML = ""
            const btn = button.renderBtn("cancel", "cancel", "cancelBtn")
            this.form.append(
                input.renderInput("example@gmail.com", "email", "enter your email", "email", true),
                input.renderInput("password", "password", "enter your password", "password", true),
                button.renderBtn("submit", "submit", "submitBtn"),
                btn
            )
            this.form.addEventListener("submit", this.handleEnter.bind(this))
            btn.addEventListener("click", modal.closeModal)
        }
        if (id === "edit-form") {
            this.form.innerHTML = ""
            const doctorSelect = input.renderInputSelectEdit("doctor", "select doctor", ["cardiologist", "dentist", "therapevt"], "doctor", data.doctor)
            doctorSelect.className = "doctor-select"
            const div = document.createElement("div")
            const wrapper = document.createElement("div")
            const btnSubmit = button.renderBtn("submit", "submit", "submitBtn")
            const btnCancel = button.renderBtn("cancel", "cancel", "cancelBtn")
            div.id = "doctors"
            const common = visit.renderEditForm(data)
            div.append(doctorSelect, common)
            wrapper.append(btnSubmit, btnCancel)
            this.form.append(div, wrapper)

            if (data.doctor === "dentist") {
                const visitdentist = visitDentist.renderEditForm(data)
                div.append(visitdentist)
            }
            if (data.doctor === "therapevt") {
                const visittherapist = visitTherapist.renderEditForm(data)
                div.append(visittherapist)
            }
            if (data.doctor === "cardiologist") {
                const visitcardiologist = visitCardiologist.renderEditForm(data)
                div.append(visitcardiologist)
            }

            doctorSelect.addEventListener("change", (event) => {
                div.innerText = ""
                const commonVisit = visit.renderCommonForm()
                div.append(doctorSelect, commonVisit)
                if (event.target.value === "cardiologist") {
                    const visitcardiologist = visitCardiologist.renderForm()
                    div.append(visitcardiologist)
                }
                if (event.target.value === "dentist") {
                    const visitdentist = visitDentist.renderForm()
                    div.append(visitdentist)
                }
                if (event.target.value === "therapevt") {
                    const visittherapist = visitTherapist.renderForm()
                    div.append(visittherapist)
                }

            })
            this.form.addEventListener("submit", this.handleEditCard.bind(this, data.id))
            btnCancel.addEventListener("click", modal.closeModal)

        }
        if (id === "create-visit-form") {
            this.form.innerHTML = ""
            const doctorSelect = input.renderInputSelect("doctor", "select doctor", ["cardiologist", "dentist", "therapevt"], "doctor")
            doctorSelect.className = "doctor-select"
            const div = document.createElement("div")
            const wrapper = document.createElement("div")
            const btnSubmit = button.renderBtn("submit", "submit", "submitBtn")
            const btnCancel = button.renderBtn("cancel", "cancel", "cancelBtn")
            div.id = "doctors"
            div.append(doctorSelect)
            wrapper.append(btnSubmit, btnCancel)
            this.form.append(div, wrapper)
            doctorSelect.addEventListener("change", (event) => {
                div.innerText = ""
                const commonVisit = visit.renderCommonForm()
                div.append(doctorSelect, commonVisit)

                if (event.target.value === "cardiologist") {
                    const visitcardiologist = visitCardiologist.renderForm()
                    div.append(visitcardiologist)
                }
                if (event.target.value === "dentist") {
                    const visitdentist = visitDentist.renderForm()
                    div.append(visitdentist)
                }
                if (event.target.value === "therapevt") {
                    const visittherapist = visitTherapist.renderForm()
                    div.append(visittherapist)
                }

            })
            this.form.addEventListener("submit", this.handleCreateCard.bind(this))
            btnCancel.addEventListener("click", modal.closeModal)
        }
        return this.form
    }
    renderSearchForm(id){
        const form = document.createElement("form")
        form.id = id
        const inputTitle = input.renderInput("title/card info", "search-for-title", "search by title card", "text", false)
        const inputStatus = input.renderInputSelect("status-search", "search by status", ["open", "done"], "status")
        const inputPr = input.renderInputSelect("priority-search", "search by priority", ["high", "normal", "low"], "priority")
        const btn = button.renderBtn("search", "submit", "search-btn")
        const btnClear = button.renderBtn("clear", "clear", "clear-btn")
        const div = document.createElement("div")
        div.className = "btn-wrapper"
        div.append(btn, btnClear)
        btn.className = "main-submit"
        form.append(inputTitle, inputStatus, inputPr, div)
        form.addEventListener("submit", this.handleSearch.bind(this))
        btnClear.addEventListener("click", this.handleClear)
        return form
    }
    handleClear(event){
        event.preventDefault()
        const form = document.querySelector("#search")
        const input = form.querySelectorAll("input")
        const select = form.querySelectorAll("select")
        input.forEach(item => {
            item.value = ""
        })
        select.forEach(item => {
            item.value = ""
        })
    }
    handleCreateCard(event) {
        event.preventDefault()
        const formData = {}
        const inputs = this.form.querySelectorAll("input")
        const selects = this.form.querySelectorAll("select")
        const textAreas = this.form.querySelectorAll("textarea")
        inputs.forEach(item => {
            if(item.name === "data-visit"){

            }
            formData[item.name] = item.value
        })
        selects.forEach(item => {
            formData[item.name] = item.value
        })
        textAreas.forEach(item => {
            formData[item.name] = item.value
        })
        try {
            api.postDataCreateCard(formData, "/cards")
                .then(data => {
                        modal.closeModal(event);
                        visit.renderCard(data)
                    })

        } catch (error) {
            console.log(error)
        }
    }

    handleEnter(event) {
        event.preventDefault()
        const formData = {}
        const inputs = this.form.querySelectorAll("input")
        inputs.forEach(item => {
            formData[item.name] = item.value
        })
        try {
            api.postData(formData, "/cards/login")
                .then(data => {
                    if (data === "Incorrect username or password") {
                        this.handleError(data)
                    } else if (data) {
                        modal.closeModal(event);
                        changeBtn()
                        api.getData("/cards")
                            .then(data => {
                                this.form.removeEventListener("submit", this.handleEnter)
                                if (data.length === 0) {
                                    renderNoItems()
                                }
                                const updatedData = updateStatus(data)
                                visit.renderCards(updatedData)
                            })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    handleError(data) {
        const parent = this.form.querySelector("input")
        const span = document.createElement("span")
        span.innerText = data
        span.className = "error"
        parent.after(span)
    }
    handleSearch(event) {
        event.preventDefault()
        const inputs = document.querySelector("#search").querySelectorAll("input")
        const selects = document.querySelector("#search").querySelectorAll("select")
        const searchData = {}
        inputs.forEach(item => {
        searchData[item.name] = item.value
        })
        selects.forEach(item => {
            searchData[item.name] = item.value
            })
        try{
        api.getData("/cards")
        .then(data => {
        const updateData = updateStatus(data)
        filter.filterData(updateData, searchData)
        })
        } catch(error){
            console.error(error)
        }
        
    }
    handleEditCard(id) {
        const formData = {}
        const inputs = this.form.querySelectorAll("input")
        const selects = this.form.querySelectorAll("select")
        const textAreas = this.form.querySelectorAll("textarea")
        inputs.forEach(item => {
            formData[item.name] = item.value
        })
        selects.forEach(item => {
            formData[item.name] = item.value
        })
        textAreas.forEach(item => {
            formData[item.name] = item.value
        })
        try {
            api.putData(formData, id, "/cards")
                .then(data => {
                        modal.closeModal();
                        visit.editCard(data)
                })
        } catch (error) {
            console.log(error)
        }    }
        updateStatus(item){
            const today = new Date()
            const dataVisit = item["data-visit"].split("-")
            let [year, month, day] = dataVisit
            const dateOfVisit = new Date(year, --month, day)
            if(dateOfVisit >= today){
            item["status"] = "open"
            return item
            } else{
                item["status"] = "done"
                return item 
            }
        }
}
const form = new Form()
export { form }