export function call({ uri, method="GET", body=undefined }){
    const token = JSON.parse(localStorage.getItem("token"))
    return fetch(`http://localhost:2025/api/${uri}`, {
            method: method,
            headers: {
                'Content-Type': "Application/json",
                "Authorization": `Bearar ${token}`
            },
            body: JSON.stringify(body)
        })
}