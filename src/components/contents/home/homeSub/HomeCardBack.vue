<template>
    
    <v-card 
        class="mx-2 my-2" 
        width="250"
        height="560"
        tile
        >
        <v-img 
            class="white--text align-end" 
            height="150px"
            :src='logo'
            :gradient="gradient">
        </v-img>
        <v-card-text>
            <v-card-title><slot name="title"></slot></v-card-title>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text--primary">
            <slot name="description_long"></slot>
        </v-card-text>
        <v-row justify="center">
            <v-card-text>
                <div class="text-center font-weight-bold font-italic my-2 mr-2 caption">
                    Click to enter!!
                </div>
            </v-card-text>
        </v-row>
    </v-card>
    
</template>

<script>
export default {
    props: {
        logo: String,
        gradient: String
    }
}
</script>