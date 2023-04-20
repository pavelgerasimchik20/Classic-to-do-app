<template>
    <v-card
        :loading="isLoading"
        class="mx-auto"
        >
        <v-sheet
            v-if="tasksLength = 0">
            You have no tasks
        </v-sheet>
        <v-list v-else lines="one">
            <div v-for="item in tasks" :key="item.task_id" >
                <div class="task__details">
                    <div
                        v-if="item.task_id != editing.id"
                        >{{ item.name }}</div>
                    <v-text-field 
                        v-else
                        class="edit_task" 
                        v-model = editing.text autofocus
                        ></v-text-field>
                    <EditBTN 
                        v-if="item.task_id != editing.id" 
                        @edit-task="editTask(item.task_id, item.name)" />
                    <SaveBTN 
                        v-else 
                        @save-task="saveTask(item.name)" />
                    <DeleteBTN 
                        @delete-task="deleteTask(item.task_id)"  />
                </div>
            </div>
        </v-list>
    </v-card>
</template>
 
<script>
import state from '../store/index' 
import DeleteBTN from './Buttons/DeleteBTN.vue'
import EditBTN from './Buttons/EditBTN.vue'
import SaveBTN from './Buttons/SaveBTN.vue'

export default {

components: {
    DeleteBTN,
    EditBTN,
    SaveBTN
},

data: () => ({
        editing: {
            id: '',
            text: '',
        }
}), 

methods: {
    async deleteTask(taskId){
        await state.dispatch('deleteTask', taskId)
        state.dispatch('fetchTasks')
    },

    editTask(taskId, text){
            this.editing.id = taskId
            this.editing.text = text
    },

    async saveTask(originTask){
        if(originTask != this.editing.text) {
            await state.dispatch('changeTask', this.editing)
            await state.dispatch('fetchTasks')
            this._emptyEditing()
        }
        this._emptyEditing()
    },
    _emptyEditing(){
        this.editing.id = ''
        this.editing.text = ''
    }
},

computed: {
    tasks(){
        return state.getters.allTasks
    },
    tasksLength(){
        return state.getters.allTasks.length()
    },
    isLoading(){
        return state.getters.isLoadingStatus
    }
},

mounted() {
    state.dispatch('fetchTasks')
}

}
</script>

<style>
.task__details{
    display: grid;
    grid-template-columns: 3fr 70px 70px;
    grid-template-rows: 70px;
    padding: 0 0 0 20px;
    align-items:center;
    font-size: x-large;
}

.task__details:hover {
    background-color: rgb(214, 214, 214);
    border-radius: 10px;
}

.edit_task {
    margin: 22px 20px 0 0;
}
</style>
