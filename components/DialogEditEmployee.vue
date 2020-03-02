<template>
  <v-dialog
    v-model="edit_employee" max-width="750" @click:outside="setVuexEditEmployee(false)">
    <v-card>
      <h2>Edit Employee details</h2>
      <CreateEmployeeForm :edit-mode="true"></CreateEmployeeForm>
    </v-card>
  </v-dialog>
</template>

<script>
  import CreateEmployeeForm from "./CreateEmployeeForm";
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "DialogEditEmployee",
    components: {CreateEmployeeForm},
    computed: {
      ...mapState(["edit_employee"])
    },
    methods: {
      ...mapMutations(["setVuexEditEmployee"]),
    }
  }
</script>

<style scoped lang="sass">
  h2
    padding: 15px
</style>
