import globalAxios from 'axios'
// import router from '../../router'

const state = {
    users: [],
    currentPage: 1,
    perPage: 5,
    last: null
}

const mutations = {
    'SET_USERS' (state, usersData) {
        state.users = usersData
    },
    'SET_PAGINATE' (state, paginateData) {
        state.currentPage = paginateData.current
        state.perPage = paginateData.size
        state.last = paginateData.last
    },
    'CHANGE_CURRENT_PAGE' (state, page) {
        state.currentPage = page
    },
    'CLEAR_USERS' (state) {
        state.users = []
        state.currentPage = 1
        state.perPage = 5
        state.last = null
    }
}

const actions = {
    fetchUsersData({commit, state}) {
        globalAxios.get('/admin/users?page='+state.currentPage)
        .then(res => {
            // console.log(res.data.data)
            let data = res.data.data
            commit('SET_USERS', data.data)
            commit('SET_PAGINATE', data.pagination)
        })
        .catch(error => console.log(error))
    },
    changeCurrentPage({commit, dispatch}, page) {
        commit('CHANGE_CURRENT_PAGE', page)

        dispatch('fetchUsersData')
    },
    modifyUserData({dispatch}, modifyData) {
        // console.log(modifyData)
        var formData = new FormData();
        for(let key in modifyData){
            formData.append(key, modifyData[key])
        }
        let config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        config.headers['X-HTTP-Method-Override'] = 'PUT';
        globalAxios.post('/admin/users/' + modifyData.id, formData, config)
            .then(() => {
                // console.log(res)
                dispatch('fetchUsersData')
            })
            .catch(error => console.log(error))
    },
    deleteUser({dispatch}, deleteData) {
        
        globalAxios.delete('/admin/users/' + deleteData.id)
            .then(() => {
                // console.log(res)
                dispatch('fetchUsersData')
            })
            .catch(error => console.log(error))
    }
}

const getters = {
    users(state) {
        return state.users
    },
    paginate(state) {
        return {
            currentPage: state.currentPage,
            perPage: state.perPage,
            last: state.last
        }
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}