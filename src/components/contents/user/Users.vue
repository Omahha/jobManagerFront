<template>
    <div>
        <v-row>
            <h2>User List</h2>
        </v-row>
        <v-row justify="center">
            <app-users-modify-confirm-modal></app-users-modify-confirm-modal>
            <app-users-delete-confirm-modal></app-users-delete-confirm-modal>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Created at</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>
                            <v-img
                                :src="user.avatar ? user.avatar : '/images/image3.jpg'"
                                width="50"
                                height="50"
                            ></v-img>
                        </td>
                        <td>{{ user.email }}</td>
                        <td>
                            <v-select
                                :items="dropdown_status"
                                v-model="defaultStatusSelected[index]"
                                dense
                            ></v-select>
                        </td>
                        <td>
                            <v-select
                                :items="dropdown_role"
                                v-model="defaultRoleSelected[index]"
                                dense
                            ></v-select>
                        </td>
                        <td>{{ user.created_at }}</td>
                        <td>
                            <v-btn
                                tile
                                color="yellow"
                                x-small
                                @click="toggleModify(index)">
                                Apply Change
                            </v-btn>
                        </td>
                        <td>
                            <v-btn 
                                tile
                                color="red darken-3" 
                                class="white--text"
                                x-small
                                @click="toggleDelete(index)">
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
        <v-row>
            <v-pagination
                v-model="paginate.currentPage"
                :length="paginate.last"
                :total-visible="paginationSetting.totalVisible"
                :color="paginationSetting.color"
                @input="gotoPage"
            ></v-pagination>
        </v-row>
    </div>
</template>

<script>
import UsersModifyConfirmModal from './modal/UsersModifyConfirmModal'
import UsersDeleteConfirmModal from './modal/UsersDeleteConfirmModal'
import { eventBus } from '../../../main.js'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            dropdown_status: [
                {text: 'Active', value: 1},
                {text: 'Disabled', value: 2}
            ],
            defaultStatusSelected: [],
            dropdown_role: [
                {text: 'admin', value: 1},
                {text: 'user', value: 2}
            ],
            defaultRoleSelected: [],
            paginationSetting: {
                page: 1,
                pageLength: 0,
                totalVisible: 5,
                color: 'blue-grey darken-3'
            },
            dialog: {
                modifyToggle: false,
                deleteToggle: false
            },
        }
    },
    components: {
        appUsersModifyConfirmModal: UsersModifyConfirmModal,
        appUsersDeleteConfirmModal: UsersDeleteConfirmModal
    },
    beforeCreate() {
        this.$store.dispatch('fetchUsersData')
    },
    computed: {
        ...mapGetters([
            'users', 'paginate'
        ])
    },
    watch: {
        users() {
            this.setSelect()
        }
    },
    methods: {
        toggleModify(index) {
            this.dialog.modifyToggle = true
            eventBus.$emit('modifyDialog', this.dialog.modifyToggle)

            let modifyData = {}
            modifyData.id = this.users[index].id
            modifyData.status_id = this.defaultStatusSelected[index]
            modifyData.role_id = this.defaultRoleSelected[index]
            eventBus.$emit('modifyData', modifyData)
        },
        toggleDelete(index) {
            this.dialog.deleteToggle = true
            eventBus.$emit('deleteDialog', this.dialog.deleteToggle)

            let deleteData = {}
            deleteData.id = this.users[index].id
            eventBus.$emit('deleteData', deleteData)
        },
        gotoPage(e){
            // console.log(e)
            this.$store.dispatch('changeCurrentPage', e)
        },
        setSelect() {
            this.users.forEach((value)=>{
                
                this.defaultStatusSelected.push(value.status_id);
                
                this.defaultRoleSelected.push(value.role_id);
            })
        }
    }
    
}
</script>