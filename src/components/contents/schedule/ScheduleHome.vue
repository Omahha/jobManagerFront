<template>
    <v-card tile min-width="650">
        <v-card-title>My Schedule</v-card-title>

        <v-card-text>
            <v-row class="fill-height">
                <v-col>
                <v-sheet height="64">
                    <v-toolbar flat color="white">
                    <v-btn color="primary" class="mr-4" dark tile
                        @click="dialog=true">
                        New Event
                    </v-btn>
                    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday" tile>
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev" tile>
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next" class="mr-4" tile>
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                        <v-btn tile
                            outlined
                            color="grey darken-2"
                            v-on="on"
                        >
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                        </template>
                        <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-toolbar>
                </v-sheet>

                <!-- Add Event Dialog -->
                <v-dialog v-model="dialog" max-width="500">
                    <v-card tile class="py-4">
                        <v-container>
                            <v-row justify="center">
                                <h2>Create Event</h2>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="10">
                                    <v-form>
                                        <v-text-field 
                                            v-model="data.name" 
                                            type="text" 
                                            label="Event name"
                                            @blur="$v.data.name.$touch()"
                                            :error-messages="nameErrors"
                                        ></v-text-field>
                                        
                                        <v-text-field 
                                            v-model="data.detail" 
                                            type="text" 
                                            label="Event detail"
                                            @blur="$v.data.detail.$touch()"
                                            :error-messages="detailErrors"
                                        ></v-text-field>

                                        <v-text-field 
                                            v-model="data.place" 
                                            type="text" 
                                            label="Event place"
                                            @blur="$v.data.place.$touch()"
                                            :error-messages="placeErrors"
                                        ></v-text-field>
                                            
                                        <v-select
                                            v-model="data.company_id"
                                            :items="companyList"
                                            @blur="$v.data.company_id.$touch()"
                                            :error-messages="companyErrors"
                                        ></v-select>

                                        <app-date-time-picker 
                                            v-model="data.start"
                                            :label="'Start'"
                                            :errorSet="!$v.setEnd.compare && typeof(setEnd) == 'string' ? 'Start time error' : ''"
                                            @blur="$v.data.start.$touch()"
                                            :class="{invalid: !$v.setEnd.compare && typeof(setEnd) == 'string'}"
                                        ></app-date-time-picker>

                                        <app-date-time-picker 
                                            v-model="data.end" 
                                            :label="'End'"
                                            :errorSet="!$v.setEnd.compare && typeof(setEnd) == 'string' ? 'End time error' : ''"
                                            @blur="$v.data.end.$touch()"
                                        ></app-date-time-picker>
                                        <p v-if="!$v.setEnd.compare && typeof(setEnd) == 'string'" class="red--text font-italic"><small>End Date/Time must be later than start Date/Time.</small></p>

                                        <v-row justify="space-between">
                                            <v-col>
                                                <v-text-field 
                                                    v-model="data.color" 
                                                    type="color" 
                                                    label="Event color"
                                                    class="mb-0 pb-0"
                                                ></v-text-field>
                                                <div class="sampleColor" :style="{backgroundColor: data.color}" @click="clickColor"></div>
                                            </v-col>
                                        </v-row>
                                        

                                        <v-btn tile
                                            type="submit"
                                            color="primary"
                                            class="mr-4"
                                            @click.prevent="addEvent"
                                            :disabled="$v.$invalid">
                                            Create Event
                                        </v-btn>
                                    </v-form>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                    </v-card>
                </v-dialog>

                <v-sheet height="600">
                    <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :now="today"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                    ></v-calendar>
                    <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                    >
                        <v-card
                            color="grey lighten-4"
                            min-width="350px"
                            flat
                        >
                            <v-toolbar
                            :color="selectedEvent.color"
                            dark
                            >
                                <v-btn @click="deleteEvent(selectedEvent)" icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <form v-if="currentlyEditing !== selectedEvent.id">
                                    {{ selectedEvent.detail }}
                                </form>
                                <form v-else>
                                    <textarea-autosize
                                        v-model="selectedEvent.detail"
                                        type="text"
                                        style="width:100%"
                                        :min-height="100"
                                        placeholder="add note"
                                    ></textarea-autosize>
                                </form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    text
                                    color="secondary"
                                    @click="selectedOpen = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    text
                                    v-if="currentlyEditing !== selectedEvent.id"
                                    @click.prevent="editEvent(selectedEvent)"
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    text
                                    v-else
                                    @click.prevent="updateEvent(selectedEvent)"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
                </v-col>
            </v-row>
        </v-card-text>

    </v-card>
</template>

<script>
import DateTimePicker from './DateTimePicker.vue'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { handleErrorsMixin } from '../../../formCheckMixin.js'
import { mapGetters } from 'vuex'

const compare = function(value, vm) {
    let from = new Date(vm.setStart).getTime()
    let to = new Date(value).getTime()
    return from < to
}

export default {
    mixins: [ handleErrorsMixin ],
    data() {
        return {
            today: new Date().toISOString().substr(0, 10),
            focus: new Date().toISOString().substr(0, 10),
            type: 'month',
            setStart: null,
            setEnd: null,
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days'
            },
            data: {
                name: null,
                detail: null,
                place: null,
                start: null,
                end: null,
                color: '#ff0000',
                company_id: null
            },
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            companyList: [],
            
            // events: [
            // {
            //     id: 1,
            //     name: 'Weekly Meeting',
            //     detail: 'event1 detail',
            //     start: '2020-06-07 09:00',
            //     end: '2020-06-07 10:00',
            //     color: 'red'
            // },
            // {
            //     id:2,
            //     name: 'Thomas\' Birthday',
            //     detail: 'event2 detail',
            //     start: '2020-06-20',
            //     end: '2020-06-22',
            //     color: 'green'
            // },
            // {
            //     id: 3,
            //     name: 'Mash Potatoes',
            //     detail: 'event3 detail',
            //     start: '2020-06-09 12:30',
            //     end: '2020-06-09 15:30',
            //     color: 'blue'
            // },
        // ],
            dialog: false,
        }
    },
    validations: {
        setEnd: {
            compare
        },
        data: {
            name: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(20)
            },
            detail: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(100)
            },
            place: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(100)
            },
            company_id: {
                required
            },
            start: {
                typeCheck: val => {
                    if(typeof(val) === 'object'){
                        return false
                    }
                    if(typeof(val) === 'string'){
                        if(!val.includes('null')){
                            return true
                        }else{
                            return false
                        }
                    }
                }
            },
            end: {
                typeCheck: val => {
                    if(typeof(val) === 'object'){
                        return false
                    }
                    if(typeof(val) === 'string'){
                        if(!val.includes('null')){
                            return true
                        }else{
                            return false
                        }
                    }
                },
            },
            color: {
                required
            }
        }
        
    },
    components: {
        appDateTimePicker: DateTimePicker
    },
    watch: {
        'data.start': function(newVal){
            this.setStart = newVal
        },
        'data.end': function(newVal){
            this.setEnd = newVal
        },
        companies() {
            let companiesData = []
            this.companies.forEach((item) => {
                // console.log(item)
                let companyData = {}
                companyData.text = item.name
                companyData.value =item.id
                companiesData.push(companyData)
            })
            this.companyList = companiesData
            
        }
        
    },
    computed: {
        title () {
            const { start, end } = this
            if (!start || !end) {
                return ''
            }

            const startMonth = this.monthFormatter(start)
            const endMonth = this.monthFormatter(end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = start.year
            const endYear = end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = start.day + this.nth(start.day)
            const endDay = end.day + this.nth(end.day)

            switch (this.type) {
                case 'month':
                return `${startMonth} ${startYear}`
                case 'week':
                case '4day':
                return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                case 'day':
                return `${startMonth} ${startDay} ${startYear}`
            }
            return ''
        },
        monthFormatter () {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC', month: 'long',
            })
        },
        nameErrors() {
            return this.handleErrors('name')
        },
        detailErrors() {
            return this.handleErrors('detail')
        },
        placeErrors() {
            return this.handleErrors('place')
        },
        companyErrors() {
            return this.handleErrors('company_id')
        },
        startErrors() {
            return this.handleErrors('start')
        },
        endErrors() {
            return this.handleErrors('end')
        },
        colorErrors() {
            return this.handleErrors('color')
        },
        ...mapGetters([
            'events', 'companies'
        ])
    },
    // mounted () {
    //     this.$refs.calendar.checkChange()
    // },
    beforeCreate() {
        this.$store.dispatch('fetchEventsData')
        this.$store.dispatch('fetchCompaniesData')
    },
    created() {
        this.data.start = new Date().toISOString().substr(0, 10) + ' ' + new Date().toLocaleTimeString(['en-gb'],
                { hour: '2-digit', minute: '2-digit' })
        this.data.end = new Date().toISOString().substr(0, 10) + ' ' + new Date().toLocaleTimeString(['en-gb'],
                { hour: '2-digit', minute: '2-digit' })

        let events = this.$store.getters.events
        if(events){
            this.events = events
        }
    },
    methods: {
        addEvent() {
            this.dialog=false

            let event = {
                name: this.data.name,
                detail: this.data.detail,
                place: this.data.place,
                start: this.data.start,
                end: this.data.end,
                color: this.data.color,
                company_id: this.data.company_id
            }
            // console.log(event)
            this.$store.dispatch('createEvent', event)

        },
        updateEvent(ev) {
            // console.log(ev)
            this.$store.dispatch('editEvent', ev)

            this.selectedOpen = false
            this.currentlyEditing = null
        },
        deleteEvent(ev) {
            // console.log(ev.id+' delete')
            this.$store.dispatch('deleteEvent', ev.id)
            this.selectedOpen = false
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = this.today
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        editEvent(ev) {
            this.currentlyEditing = ev.id
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
            this.data.start = start
            this.data.end = end
        },
        nth (d) {
        return d > 3 && d < 21
            ? 'th'
            : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
        },
        clickColor(e) {
            e.target.previousSibling.getElementsByTagName('input')[0].click()
        }
    }
}
</script>

<style>
.v-dialog {
    border-radius: 0px;
}
.sampleColor {
    height: 70px;
    width: 100%;
    border: 1px solid #888;
    position: relative;
    top: -15px;
    transition: all 0.4s;
}
.sampleColor:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px #888;
}

input[type=color] {
    opacity: 0;
    max-height: 0;
}
</style>