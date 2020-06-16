import globalAxios from 'axios'
import router from '../../router'

const state = {
    companies: []
}

const mutations = {
    'SET_COMPANIES' (state, companies) {
        state.companies = companies
    },
    'UPDATE_COMPANIES' (state, company) {
        state.companies.push(company)
    },
    'CLEAR_COMPANIES' (state) {
        state.companies = []
    }
}

const actions = {
    fetchCompaniesData({commit}) {
        globalAxios.get('/companies')
            .then(res => {
                
                const data = res.data.data.data
                data.forEach(item => {
                    item.created_at = new Date(item.created_at).toISOString().substr(0, 10)
                    if(item.logo == ''){
                        item.logo = '/images/image1.jpg'
                    }
                });
                commit('SET_COMPANIES', data)
            })
            .catch(error => console.log(error))
    },
    createCompany({commit}, companyData) {
        // console.log(companyData)
        var formData = new FormData();
        for(let key in companyData){
            formData.append(key, companyData[key])
        }
        let config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        globalAxios.post('/companies', formData, config)
            .then((res) => {
                console.log(res.data.data)
                // dispatch('fetchCompaniesData')
                commit('UPDATE_COMPANIES', res.data.data)
                router.replace('/companies')
            })
            .catch(error => console.log(error))
    }
}

const getters = {
    companies(state) {
        return state.companies
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}