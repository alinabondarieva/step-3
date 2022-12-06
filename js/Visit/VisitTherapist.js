import { input } from "../components/input.js"
import { Visit } from "./Visit.js"

class VisitTherapist extends Visit{
    constructor() {
     super()
    }
    renderForm(){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputAge = input.renderInput("patient age", "patient-age", "patient age", "text", true)
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true)
        parent.append(inputAge, inputData)
        return parent
    }
    renderCard(data){
    }
    renderEditForm(data){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputAge = input.renderInput("patient age", "patient-age", "patient-age", "text", true, data["patient-age"])
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true, data["data-visit"])
        parent.append(inputAge, inputData)
        return parent
    }
}

const visitTherapist = new VisitTherapist()
export { visitTherapist }