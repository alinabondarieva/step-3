import { input } from "../components/input.js"
import { Visit } from "./Visit.js"

class VisitDentist extends Visit{
    constructor() {
     super()
     this.dentist
    }
    renderForm(){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputLastVisit = input.renderInput("last visit", "last-visit", "last visit", "date", true)
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true)
        parent.append(inputLastVisit, inputData)
        return parent
    }
    renderEditForm(data){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputLastVisit = input.renderInput("last visit", "last-visit", "last visit", "date", true, data["last-visit"])
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true, data["data-visit"])
        parent.append(inputLastVisit, inputData)
        return parent
    }
}

const visitDentist = new VisitDentist()
export { visitDentist }