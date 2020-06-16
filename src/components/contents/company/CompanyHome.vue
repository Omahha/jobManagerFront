<template>
    <v-row>
        <v-row justify="end" class="mb-5">
            <v-btn to="/companies/create" tile>
                <v-icon class="mr-2">fas fa-plus</v-icon>
                Add Company
            </v-btn>
        </v-row>
        <v-row>
            <template v-for="company in companies">
                <v-tooltip top :key="company.name">
                    <template v-slot:activator="{ on }">
                        <v-hover v-slot:default="{ hover }">
                            <v-card class="mx-2 my-2" max-width="280" :elevation="hover ? 24: 4" v-on="on" tile>
                                <v-img 
                                    class="white--text align-end" 
                                    height="120px"
                                    :src='getImg(company.logo)'>
                                    <v-card-title>{{ company.name }}</v-card-title>
                                </v-img>

                                <v-card-text class="text--primary">
                                    {{ company.address }}
                                </v-card-text>
                                <v-divider></v-divider>
                                <div class="text-right font-weight-thin font-italic my-2 mr-2 caption">
                                    {{ company.created_at }}
                                </div>
                            </v-card>
                        </v-hover>
                    </template>
                    <span>Click to edit this company</span>
                </v-tooltip>
            </template>
        </v-row>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'companies', 'user'
        ])
    },
    beforeCreate() {
        this.$store.dispatch('fetchCompaniesData')
    },
    methods: {
        getImg (path) {
            return `${path}`
        }
    }
}
</script>