<template>
    <v-tabs 
        vertical
        background-color="white"
        active-class="grey--text text--darken-3"
        slider-size="5"
        v-model="tab"
        fixed-tabs>
        <v-tabs-slider color="rgba(96, 125, 139, 0.5)"></v-tabs-slider>
        <template v-for="item in items">
            <v-tab :key="item.tab" @click="changeComponent(item.component)">
                <v-icon left>{{ item.tab }}</v-icon>
                {{ item.content }}
            </v-tab>
            <!-- <v-tab-item :key="item.tab">{{ item.component }}</v-tab-item> -->
        </template>
    </v-tabs>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            items: [
                { tab: 'far fa-building',  content: 'Companies', component: 'app-companies'},
                { tab: 'far fa-user', content: 'Users', component: 'app-users' },
                { tab: 'far fa-calendar-alt', content: 'Schedule', component: 'app-schedule' },
            ]
        }
    },
    methods: {
        changeComponent(component) {
            this.$emit('componentChanged', component)
        }
    }
}
</script>

<style scoped>
    .v-tabs--vertical > .v-tabs-bar .v-tab {
        height: 100px
    }
    .v-tab {
        justify-content: left;
    }
</style>