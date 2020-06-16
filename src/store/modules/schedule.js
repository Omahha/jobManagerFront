import globalAxios from 'axios'
// import router from '../../router'

const state = {
    events: []
}

const mutations = {
    'SET_EVENTS' (state, events) {
        state.events = events
    },
    'UPDATE_EVENTS' (state, event) {
        state.events.push(event)
    },
    'CLEAR_EVENTS' (state) {
        state.events = []
    }
}

const actions = {
    fetchEventsData({commit, rootState}) {
        globalAxios.get('/user/' + rootState.userId + '/action')
            .then(res => {
                const data = res.data.data.data
                commit('SET_EVENTS', data)
            })
            .catch(error => console.log(error))
    },
    createEvent({commit, rootState}, eventData) {
        // console.log(eventData)
        var formData = new FormData();
        for(let key in eventData){
            formData.append(key, eventData[key])
        }
        let config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        globalAxios.post('/user/' + rootState.userId + '/action', formData, config)
            .then((res) => {
                
                // dispatch('fetchCompaniesData')
                let data = res.data.data
                data.start = new Date(data.start).toISOString().replace('T', ' ').substr(0, 19)
                data.end = new Date(data.end).toISOString().replace('T', ' ').substr(0, 19)
                console.log(data)
                commit('UPDATE_EVENTS', data)
                // router.replace('/companies')
            })
            .catch(error => console.log(error))
    },
    editEvent({commit, rootState}, editData) {
        var formData = new FormData();
        for(let key in editData){
        formData.append(key, editData[key])
        }
        let config = {
            headers: {
            'content-type': 'multipart/form-data',
            },
        };
        config.headers['X-HTTP-Method-Override'] = 'PUT';
        globalAxios.post('/user/' + rootState.userId + '/action/' + editData.id, formData, config)
            .then(res => {
                console.log(res.data)
                commit('SET_EVENTS', res.data.data.data)
            })
            .catch(error => console.log(error))
    },
    deleteEvent({commit, rootState}, deleteData) {
        globalAxios.delete('/user/' + rootState.userId + '/action/' + deleteData)
            .then(res => {
                console.log(res)
                commit('SET_EVENTS', res.data.data.data)
            })
            .catch(error => console.log(error))
    }
}

const getters = {
    events(state) {
        return state.events
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}