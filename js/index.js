import { api } from "./API/API.js"
import { button } from "./components/button.js"
import { filter } from "./components/filter.js"
import { modal } from "./Modal/modal.js"
import { visit } from "./Visit/Visit.js"

const parent = document.querySelector("#root")
const container = document.createElement("div")
const contentWrapper = document.createElement("header")
const log = JSON.parse(localStorage.getItem("token"))
const mainWrapper = document.createElement("main")
const logo = document.createElement("img")

logo.className = "logo"
logo.src = "./img/Unknown.png"
contentWrapper.className = "contentWrapper"
container.className = "container"
parent.append(container)
container.append(contentWrapper, mainWrapper)



const btn = button.renderBtn("login", "button", "btnEnter")
export const changeBtn = () => {
    contentWrapper.innerHTML = ""
    btn.remove()
    const newbtn = button.renderBtn("add card", "button", "btnAdd")
    contentWrapper.append(logo, newbtn)
    mainWrapper.append(filter.renderFilter())
    newbtn.addEventListener("click", handleAddNewCard)
}

export const renderNoItems = () => {
    mainWrapper.innerHTML = ""
    const span = document.createElement("span")
    span.innerText = "no items"
    span.className = "no-items"
    mainWrapper.append(span)
}

if (log) {
    changeBtn()
    try {
        api.getData("/cards")
            .then(res => {
                filter.renderFilter()
                const updatedData = updateStatus(res)
                visit.renderCards(updatedData)
            })
    } catch (error) {
        console.log(error)
    }
} else {
    contentWrapper.append(logo, btn)
}
export function updateStatus(data){
    return data.map(item => {
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
    })
}

function handleAddNewCard(event) {
    event.preventDefault()
    modal.renderModal("create visit", "create-visit")

}