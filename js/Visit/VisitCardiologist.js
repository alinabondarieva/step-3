import { input } from "../components/input.js"
import { Visit } from "./Visit.js"

class VisitCardiologist extends Visit{
    constructor() {
     super()
    }
    renderForm(){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputPressure = input.renderInput("presssure data", "bp", "presssure data", "text", true)
        const inputBodyMassIndex = input.renderInput("body mass index", "weight", "body mass index", "text", true)
        const inputIll = input.renderInput("heart illnesses", "heart-illnesses", "heart illnesses", "text", true)
        const inputAge = input.renderInput("patient age", "patient-age", "age", "text", true)
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true)
        parent.append(inputPressure, inputBodyMassIndex, inputIll, inputAge, inputData)
        return parent
    }
    renderCard(data){
    }
    renderEditForm(data){
        const parent = document.createElement("div")
        parent.className = "visit-form"
        const inputPressure = input.renderInput("presssure data", "bp", "presssure data", "text", true, data["bp"])
        const inputBodyMassIndex = input.renderInput("body mass index", "weight", "body mass index", "text", true, data["weight"])
        const inputIll = input.renderInput("heart illnesses", "heart-illnesses", "heart illnesses", "text", true, data["heart-illnesses"])
        const inputAge = input.renderInput("patient age", "patient-age", "age", "text", true, data["patient-age"])
        const inputData = input.renderInput("data visit", "data-visit", "date of visit", "date", true, data["data-visit"])
        parent.append(inputPressure, inputBodyMassIndex, inputIll, inputAge, inputData)
        return parent
    }
}

const visitCardiologist = new VisitCardiologist()
export { visitCardiologist }