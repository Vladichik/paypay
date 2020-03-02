<template>
  <div class="pp-view-setup">
    <CreateEmployeeForm></CreateEmployeeForm>
    <section class="pp-emp-list-admin">
      <h2>All Employees</h2>
      <v-list :two-line="true"  :rounded="true">
        <v-list-item
          v-for="(emp, i) in employeesData"
          :key="i">
          <v-list-item-title>{{emp.firstName}} {{emp.lastName}}</v-list-item-title>
          <v-list-item-subtitle>Email: {{emp.email}}</v-list-item-subtitle>
          <div class="pp-row-buttons">
            <button title="Edit Employee" @click="editEmployee(emp)">
              <v-icon>mdi-pencil-outline</v-icon>
            </button>
            <button title="Delete Employee" @click="confirmDeleteEmployee(emp)">
              <v-icon>mdi-delete-forever</v-icon>
            </button>
          </div>
        </v-list-item>
      </v-list>
    </section>
    <DialogDeleteEmployee :employee="empToDelete"></DialogDeleteEmployee>
    <DialogEditEmployee></DialogEditEmployee>
  </div>
</template>

<script>
  import CreateEmployeeForm from "../components/CreateEmployeeForm";
  import {Firestore} from "../assets/firestore/firebaseConf";
  import {Constants} from "../assets/scripts/Constants";
  import DialogDeleteEmployee from "../components/DialogDeleteEmployee";
  import DialogEditEmployee from "../components/DialogEditEmployee";
  import {mapMutations} from "vuex";

  export default {
    components: {
      CreateEmployeeForm,
      DialogDeleteEmployee,
      DialogEditEmployee
    },
    data: () => ({
      employeesListener: null,
      employeesData: [],
      empToDelete: {}
    }),
    created() {
      const self = this;
      this.employeesListener = Firestore.collection(`${Constants.FIRE_S_EMPLOYEES}`).onSnapshot((data) => {
        if (data.size) {
          self.employeesData = [];
          data.forEach(function (doc) {
            self.employeesData.push(doc.data());
          });
        }
      });
    },
    beforeDestroy() {
      // Clearing live db listener when exiting the view
      this.employeesListener();
    },
    methods: {
      ...mapMutations(["setVuexConfirmDelete", "setVuexEditEmployee"]),
      confirmDeleteEmployee(emp) {
        this.empToDelete = emp;
        this.setVuexConfirmDelete(true);
      },

      editEmployee(emp) {
        this.setVuexEditEmployee(true);
        // Small workaround for Vuetify
        setTimeout(() => {
          this.$bus.emit(Constants.BUS_EDIT_EMP, emp);
        }, 100);
      }
    }
  }
</script>

<style lang="sass">
  @import "assets/styles/variables"
  .pp-view-setup
    +setGridAuto(auto, 30px, "rows")

  .pp-row-buttons
    +setGridAuto(auto, 15px, "columns")

  .pp-emp-list-admin
    padding: 0 15px

</style>
