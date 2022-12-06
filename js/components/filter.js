import { visit } from "../Visit/Visit.js"
import { form } from "./form.js"


class Filter {
    constructor() {
        this.wrapper = document.createElement("div")
        this.wrapper.className = "search-wrapper"
    }
    renderFilter() {
        this.wrapper.innerText = ""
        const formSearch = form.renderSearchForm("search")
        this.wrapper.append(formSearch)
        return this.wrapper
    }
    filterData(data, searchData) {
        if (!searchData["search-for-title"] && !searchData["status-search"] && !searchData["priority-search"]) {
            visit.renderCards(data)
            return
        }

        const filtered = data.filter(item => {
            if (searchData["search-for-title"] && searchData["status-search"] && searchData["priority-search"]) {
                if ((item.name.includes(searchData["search-for-title"])
                    || item.description.includes(searchData["search-for-title"])
                    || item.title.includes((searchData["search-for-title"]))
                ) &&
                    searchData["status-search"] === item.status
                    &&
                    searchData["priority-search"] === item.priority
                ) {
                    return item
                }
                return
            }
            if (searchData["search-for-title"] && searchData["status-search"]) {
                if ((item.name.includes(searchData["search-for-title"])
                    || item.description.includes(searchData["search-for-title"])
                    || item.title.includes((searchData["search-for-title"]))
                ) &&
                    searchData["status-search"] === item.status
                ) {
                    return item
                }
                return 
            }
            if (searchData["search-for-title"] && searchData["priority-search"]) {
                if ((item.name.includes(searchData["search-for-title"])
                    || item.description.includes(searchData["search-for-title"])
                    || item.title.includes((searchData["search-for-title"]))
                )
                    &&
                    searchData["priority-search"] === item.priority
                ) {
                    return item
                }
                return 
            }
            if (searchData["status-search"] && searchData["priority-search"]) {
                if (
                    searchData["status-search"] === item.status
                    &&
                    searchData["priority-search"] === item.priority
                ) {
                    return item
                }
                return
            }
            if (searchData["search-for-title"]) {
                if (item.name.includes(searchData["search-for-title"]) || item.description.includes(searchData["search-for-title"]) || item.title.includes((searchData["search-for-title"]))) {
                    return item
                }
                return
            }
            if (searchData["status-search"]) {
                if (searchData["status-search"] === item.status) {
                    return item
                }
                return
            }
            if (searchData["priority-search"]) {
                if (searchData["priority-search"] === item.priority) {
                    return item
                }
                return
            }
        })
        visit.renderCards(filtered)
    }
}

const filter = new Filter()
export { filter }