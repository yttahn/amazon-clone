import axios from "axios"

const axiosInstance = axios.create({
    // ` backend directly from function folder
    // baseURL:"http://127.0.0.1:5001/clone-a307c/us-central1/api",
        // ` backend deploy on firebase
    // baseURL: "https://api-comvbkinnq-uc.a.run.app",
    // ` backend deploy on render
    baseURL: "https://amazon-api-deploy-i99z.onrender.com"

})

export {axiosInstance}