const baseUrl = "https://ajax.test-danit.com/api/v2"
// f96628ff-c210-4d12-8993-5f65d269d735

//       Jizvix-nenzyq-qivvo5

class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.token = null
        this.getToken()
    }
    getToken() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            this.token = token
        }
    }
    async getData(url) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
        const data = await res.json()
        return data
    }
    async postData(data, url) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await res.text()
        this.setToken(resData)
        return resData
    }
    async postDataCreateCard(data, url) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        const resData = await res.json()
        return resData
    }
    async deleteData(id, url) {
        const res = await fetch(`${this.baseUrl}${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
        })
        const resData = await res.json()
        return resData
    }
    async putData(data, id, url) {
        const res = await fetch(`${this.baseUrl}${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        const resData = await res.json()
        return resData
    }
    setToken(token) {
        this.token = token
        localStorage.setItem("token", JSON.stringify(token))
    }
}

const api = new API(baseUrl)
export { api }