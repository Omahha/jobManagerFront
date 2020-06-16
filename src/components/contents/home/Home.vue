<template>
        <v-row justify="space-around">
            <div 
                @mouseover="componentList[index].name=homeMenu[index].backComp"
                @mouseleave="componentList[index].name=homeMenu[index].frontComp"
                @click="changePage(pageList[index].name)"
                v-for="(item, index) in homeMenu" :key="item.title"
                style="width:200px; padding:0; margin:0;"
                >
                <router-link :to="route[index]" tag="span">
                    <transition name="flip" mode="out-in">
                    
                        <component 
                            :is="componentList[index].name" 
                            :logo="item.logo"
                            :gradient="item.gradient"
                            :titleClass="item.titleClass">
                            <template v-slot:title><span>{{ item.title }}</span></template>
                            <template v-slot:description><span>{{ item.description }}</span></template>
                            <template v-slot:updated_at><span>{{ item.updated_at }}</span></template>
                            <template v-slot:description_long><span>{{ item.description_long }}</span></template>
                        </component>
                    
                    </transition>
                </router-link>
            </div>
        </v-row>
</template>

<script>
import HomeCardFront from './homeSub/HomeCardFront'
import HomeCardBack from './homeSub/HomeCardBack'
export default {
    data() {
        return {
            homeMenu: [
                {
                    title: 'My Page', 
                    description: 'My registered data',
                    description_long: 'Your registered personal data will be listed here. You can manage and update your data anytime.',
                    updated_at: '02/06/2020', 
                    logo: '/images/home.jpg',
                    gradient: 'to right, rgba(26, 0, 0, 0.9), rgba(255, 153, 153, 0.6)',
                    titleClass: 'myPageTitle',
                    frontComp: 'app-user-card-front',
                    backComp: 'app-user-card-back',
                    route: {name: 'user', params: {id: 1}}
                },
                { 
                    title: 'Companies', 
                    description: 'My registered company List',
                    description_long: 'Your registered companies are listed here. You can also manage your registered companiese here too. Adding, Edit and also Delete!!',
                    updated_at: '02/06/2020', 
                    logo: '/images/create-section1.jpg',
                    gradient: 'to right, rgba(26, 19, 0, 0.9), rgba(255, 236, 179, 0.6)',
                    titleClass: 'companiesTitle',
                    frontComp: 'app-company-card-front',
                    backComp: 'app-company-card-back',
                    route: '/companies'
                },
                { 
                    title: 'Users', 
                    description: 'All registered user List', 
                    description_long: 'As an Admin, Youcan manage users registered in this application which includes changing status and roles of user, also deleting users.',
                    updated_at: '02/06/2020', 
                    logo: '/images/explore-section1.jpg',
                    gradient: 'to right, rgba(0, 0, 26, 0.9), rgba(102, 102, 255, 0.6)',
                    titleClass: 'usersTitle',
                    frontComp: 'app-users-card-front',
                    backComp: 'app-users-card-back',
                    route: '/users'
                },
                { 
                    title: 'Schedule', 
                    description: 'My registered company List', 
                    description_long: 'Check and manage your schedule for each of your registered companies',
                    updated_at: '02/06/2020', 
                    logo: '/images/home.jpeg',
                    gradient: 'to right, rgba(0, 26, 9, 0.9), rgba(153, 255, 189, 0.6)',
                    titleClass: 'scheduleTitle',
                    frontComp: 'app-schedule-card-front',
                    backComp: 'app-schedule-card-back',
                    route: '/user/1/schedule'
                },
            ],
            componentList: [
                { name: 'app-user-card-front' },
                { name: 'app-company-card-front' }, 
                { name: 'app-users-card-front' },
                { name: 'app-schedule-card-front' }
            ],
            pageList: [
                { name: 'app-user' },
                { name: 'app-companies' },
                { name: 'app-users' },
                { name: 'app-schedule'}
            ]
            
        }
    },
    components: {
        appUserCardFront: HomeCardFront,
        appUserCardBack: HomeCardBack,
        appCompanyCardFront: HomeCardFront,
        appCompanyCardBack: HomeCardBack,
        appUsersCardFront: HomeCardFront,
        appUsersCardBack: HomeCardBack,
        appScheduleCardFront: HomeCardFront,
        appScheduleCardBack: HomeCardBack,
    },
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated
        },
        admin() {
            return this.$store.getters.isAdmin
        },
        route() {
            return [
                {name: 'user', params: {id: this.$store.getters.userId}},
                '/companies',
                '/users',
                {name: 'user_schedule', params: {id: this.$store.getters.userId}}
            ]
        }
    },
    created() {
        
    },
    methods: {
        getImg() {
            return `/images/create-section1.jpg`
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
}
</script>

<style>

.flip-enter-active {
    animation: flip-in .4s forwards;
}
.flip-leave-active {
    animation: flip-out .4s forwards;
}
@keyframes flip-out {
    0% {
        transform: rotateY(0deg);
        opacity: 1;
    }
    100% {
        transform: rotateY(90deg);
        opacity: .3;
    }
}
@keyframes flip-in {
    0% {
        transform: rotateY(90deg);
        opacity: .3;
    }
    100% {
        transform: rotateY(0deg);
        opacity: 1;
    }
}

.fade-enter-active {
    animation: forwards fade-in .5s;
}
.fade-leave-active {
    animation: forwards fade-out .5s;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>