<template>
  <v-form v-model="valid">
      <v-row>
        <v-col
          cols="12"
          md="4">
          <v-text-field
            v-model="firstName"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4">
          <v-text-field
            v-model="lastName"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    <div class="pp-create-form-footer">
      <div class="my-2" v-if="editMode">
        <v-btn color="error" @click="setVuexEditEmployee(false)">Cancel</v-btn>
      </div>
      <div class="my-2">
        <v-btn color="primary" :disabled="!valid" @click="createNewEmployee()" :loading="creating">
          {{editMode ? 'Save Changes' : 'Create Employee'}}
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
  import {uuid} from "vue-uuid";
  import CFC from "@/assets/firestore/CommonFirestoreCaller";
  import {mapMutations} from "vuex";
  import {Constants} from "../assets/scripts/Constants";

  export default {
    name: "CreateEmployeeForm",
    props: ["editMode"],
    data: () => ({
      valid: false,
      firstName: "",
      lastName: "",
      email: "",
      uid: "",
      creating: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    created() {
      if (this.editMode) {
        this.$bus.off(Constants.BUS_EDIT_EMP);
        this.$bus.on(Constants.BUS_EDIT_EMP, this.setEmployeeForEdit);
      }
    },
    methods: {
      ...mapMutations(["setVuexEditEmployee"]),
      /**
       * This function fires event of Creating new employee
       */
      createNewEmployee() {
        if (this.valid) {
          this.creating = true;
          const newEmp = {};
          newEmp.uid = this.editMode ? this.uid : uuid.v4();
          newEmp.created_at = new Date().getTime();
          newEmp.firstName = this.firstName;
          newEmp.lastName = this.lastName;
          newEmp.email = this.email;
          CFC.createNewEmployee(newEmp).then(() => {
            this.creating = false;
            this.resetForm();
            if (this.editMode) {
              this.setVuexEditEmployee(false);
            }
          })
        }
      },

      /**
       * Function that resets form fields after new employee has been created
       */
      resetForm() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
      },

      /**
       * This function updates employee form with empoyee details
       * when EDIT EMPLOYEE DIALOG shows up
       */
      setEmployeeForEdit(emp) {
        this.firstName = emp.firstName;
        this.lastName = emp.lastName;
        this.email = emp.email;
        this.uid = emp.uid;
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "assets/styles/variables"
  .v-form
    padding: 0 15px

  .pp-create-form-footer
    padding: 15px 0
    justify-content: flex-start
    +setGridAuto(auto, 15px, "columns")

</style>
