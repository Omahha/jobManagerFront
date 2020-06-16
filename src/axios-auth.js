import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://jobmanagerapi.test:1443/api'
})

export default instance