<template>
    <v-row justify="center">
        <v-col cols="10">
            <v-row class="mb-5">
                <h2>Company</h2>
            </v-row>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-col>
    </v-row>
</template>

<script>