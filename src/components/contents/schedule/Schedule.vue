<template>
    <v-row justify="center">
        <v-col cols="10">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-col>
    </v-row>
</template>