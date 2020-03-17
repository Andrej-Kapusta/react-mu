const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs")

const getLatestArchive = () => {
    const dir = __dirname + "/archive"
    const fileName = fs.readdirSync(dir).filter(f => f.endsWith(".zip")).pop()
    return fs.createReadStream(dir + "/" + fileName)
}

const upload = (file) => {
    const urlContext = ["stazovatel", "public"]
    const url = "http://stazovatel.devel.lan:18080/" + urlContext.join("/")
    const paramName = [...urlContext, "file"].join("/")
    const paramValue = file
    
    const method = "POST"
    const body = new FormData()
    body.append(paramName, paramValue)
    
    fetch(url, { method, body })
        .then(res => res.text())
        .then(body => {
            const success = (body === "OK")
            if (success) {
                console.log("Archív úspešne nahraný. :)")
            } else {
                console.log("Archív sa nepodarilo nahrať. :(")
            }
        })
}

const archive = getLatestArchive()
console.log(`Nahrávam archív "${archive.path}"...`)
upload(archive)