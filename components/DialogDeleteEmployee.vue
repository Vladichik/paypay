<template>
  <v-row justify="center">
    <v-dialog
      v-model="confirm_delete"
      @click:outside="setVuexConfirmDelete(false)"
      max-width="350">
      <v-card>
        <v-card-text>
          Please confirm employee delete
        </v-card-text>

        <v-card-title>
          {{employee.firstName}} {{employee.lastName}}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="setVuexConfirmDelete(false)">
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            @click="deleteEmployee()">
            Confirm Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import CFC from "../assets/firestore/CommonFirestoreCaller";
  export default {
    name: "DialogDeleteEmployee",
    props: ["employee"],
    computed: {
      ...mapState(["confirm_delete"])
    },
    methods: {
      ...mapMutations(["setVuexConfirmDelete"]),
      deleteEmployee() {
        this.setVuexConfirmDelete(false);
        CFC.deleteEmployee(this.employee.uid)
      }
    }
  }
</script>

<style scoped lang="sass">
  .v-dialog > .v-card > .v-card__text
    padding: 20px 20px 0 20px
</style>
