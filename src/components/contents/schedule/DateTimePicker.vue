<template>
    <div>
        <v-text-field 
            v-model="date"
            type="date"
            @input="displayInput"
            :label="'Event ' + label + ' Date'"
            :error-messages="errorSet"
        ></v-text-field>
        <v-text-field 
            v-model="time"
            type="time"
            @input="displayInput"
            :label="'Event ' + label + ' Time'"
            :error-messages="errorSet"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: null,
            time: null
        }
    },
    props: ['value', 'label', 'errorSet'],
    methods: {
        displayInput() {
            this.$emit('input', this.date + ' ' + this.time)
        }
    }

}
</script>