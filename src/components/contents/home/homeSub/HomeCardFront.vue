<template>
    
        <v-card 
            class="mx-2 my-2" 
            width="250"
            height="560"
            tile
            >
            <v-img 
                class="white--text align-end" 
                height="530px"
                :src='logo'
                :gradient="gradient">
                <v-card-title class="headline font-weight-bold" :class="titleClass"><slot name="title"></slot></v-card-title>
            </v-img>

            <v-divider></v-divider>
            <div class="text-right font-weight-thin font-italic my-2 mr-2 caption">
                <slot name="updated_at"></slot>
            </div>
        </v-card>
    
</template>

<script>
export default {
    props: {
        logo: String,
        gradient: String,
        titleClass: String
    }
}
</script>

<style scoped>
.v-card__title {
    transform:rotateZ(-90deg);
    position: relative;
    top: -450px;
    left: -80px
}
.myPageTitle {
    top: -478px;
    left: -80px
}
.companyTitle {
    top: -450px;
    left: -80px
}
.usersTitle {
    top: -510px;
    left: -80px
}
.scheduleTitle {
    top: -472px;
    left: -80px
}

</style>