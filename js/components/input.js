
class Input {
    constructor() {
    }
    renderInput(place, id, text, inputType, req, val) {
        const input = document.createElement("input")
        const label = document.createElement("label")
        const div = document.createElement("div")
        label.innerText = text
        input.placeholder = place
        input.id = id
        label.htmlFor = id
        input.name = id
        input.type = inputType
        label.className = "clabel label"
        input.className = "cinput"
        input.required = req
        if (val){
            input.value = val
        }
        div.append(label, input)
        return div
    }
    renderInputSelect(id, label, selectedValue, title) {
        const select = document.createElement("select")
        const lab = document.createElement("label")
        const div = document.createElement("div")
        const opt = document.createElement("option")
        lab.innerText = label
        lab.className = "label"
        select.id = id
        select.name = id
        opt.value = ""
        opt.innerText = title
        select.append(opt)
        select.insertAdjacentHTML("beforeend", `${selectedValue.map(item => {
            return `<option value=${item}>${item}</option>`
        }).join("")}.`)
        div.append(lab, select)
        return div
    }
    renderInputSelectEdit(id, label, selectedValue, title, cvalue){
                const select = document.createElement("select")
        const lab = document.createElement("label")
        const div = document.createElement("div")
        const opt = document.createElement("option")
        lab.innerText = label
        lab.className = "label"
        select.id = id
        select.name = id
        opt.value = cvalue
        opt.innerText = title
        select.append(opt)
        select.insertAdjacentHTML("beforeend", `${selectedValue.map(item => {
        if(cvalue === item){
           return `<option value=${item} selected>${item}</option>`
        } else{
            return `<option value=${item}>${item}</option>`
        }
        }).join("")}.`)
        div.append(lab, select)
        return div
    }
    renderTextArea(place, id, text, req, val){
        const textArea = document.createElement("textarea")
        const label = document.createElement("label")
        const div = document.createElement("div")
        label.innerText = text
        textArea.placeholder = place
        textArea.id = id
        label.htmlFor = id
        textArea.name = id
        label.className = "cclabel"
        textArea.className = "ctextArea"
        textArea.required = req
        if(val){
         textArea.value = val
        }
        div.append(label, textArea)
        return div
    }
}
const input = new Input()
export { input }