export const handleErrorsMixin = {
    methods: {
        handleErrors(fieldName) {
            const errors = []
            if(!this.$v.data[fieldName].$dirty) return errors

            if('required' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].required && errors.push('This field is required.')
            }

            if('minLen' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].minLen && errors.push('The input is too short.')
            }

            if('maxLen' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].maxLen && errors.push('The input is too long.')
            }

            if('imgSize' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].imgSize && errors.push('The image is too big.')
            }

            if('email' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].email && errors.push('The input must be an email.')
            }

            if('same' in this.$v.data[fieldName]){
                !this.$v.data[fieldName].same && errors.push('Confirm password must be the same as Password.')
            }

            return errors
        },
    }
}

export const onFileChangeMixin = {
    data() {
        return {
            previewUrl: null
        }
    },
    methods: {
        onFileChange(e) {
            if(this.data.photo){
                this. previewUrl = URL.createObjectURL(e)
            }
        },
    }
}