<template>
  <section class="pp-all-employees-split">
    <aside>
      <v-list>
        <v-list-item
          v-for="(emp, i) in employeesData"
          :key="i">
          <v-btn @click="setActiveEmployee(emp)">{{emp.firstName}} {{emp.lastName}}</v-btn>
        </v-list-item>
      </v-list>
    </aside>
    <aside v-if="activeEmployee" class="pp-feedbacks-view">
      <v-form v-model="valid">
        <v-textarea
          v-model="feedback"
          :label="`Feedback text for ${this.activeEmployee.firstName} ${this.activeEmployee.lastName}`"
          :no-resize="true"
          :rules="feedRules"
          :counter="1000"
          required
        ></v-textarea>
        <v-col cols="12" md="2" class="my-2">
          <v-btn color="primary" :disabled="!valid" @click="addNewFeedback()" :loading="creating">
            Add Feedback
          </v-btn>
        </v-col>
      </v-form>
      <h3>{{`All feedbacks for ${activeEmployee.firstName} ${activeEmployee.lastName}`}}</h3>
      <v-list>
        <v-list-item
          two-line
          v-for="(feed, i) in feedbackData" :key="i">
          <v-list-item-content>
            <v-list-item-title>Created: {{feed.created_at | moment("from", "now", true)}}</v-list-item-title>
            <v-spacer></v-spacer>
            <v-list-item-subtitle>{{feed.text}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <preloader message="Loading feedbacks" v-if="loadingFeedBacks"></preloader>
      </v-list>
    </aside>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue';
  import VuetifyLogo from '~/components/VuetifyLogo.vue';
  import CFC from "../assets/firestore/CommonFirestoreCaller";
  import {Constants} from "../assets/scripts/Constants";
  import {uuid} from "vue-uuid";
  import {Firestore} from "../assets/firestore/firebaseConf";
  import Preloader from "@/components/Preloader";

  export default {
    components: {
      Logo,
      VuetifyLogo,
      Preloader
    },
    data: () => ({
      employeesData: [],
      feedbackData: [],
      feedback: "",
      creating: false,
      valid: false,
      activeEmployee: "",
      feedbackListener: null,
      loadingFeedBacks: false,
      feedRules: [
        v => !!v || 'Feedback is required',
        v => v.length <= 1000 || 'Feedback must be less than 1000 characters',
      ]
    }),
    created() {
      CFC.getDataForCollection(Constants.FIRE_S_EMPLOYEES).then(data => {
        this.employeesData = data
      });
    },
    beforeDestroy() {
      // Clearing live db listener when exiting the view
      if (this.feedbackListener) {
        this.feedbackListener();
      }
    },
    methods: {
      /**
       * Function that is called on every employee button press.
       * It fetches relevant feedback per employee.
       * @param emp - pressed employee
       */
      setActiveEmployee(emp) {
        const self = this;
        this.activeEmployee = emp;
        this.feedbackData = [];
        this.loadingFeedBacks = true;
        //Clearing existing feedbackListener before initiating the new one
        if (this.feedbackListener) {
          this.feedbackListener();
        }

        this.feedbackListener = Firestore
          .collection(`${Constants.FIRE_S_FEEDBACKS}/${emp.uid}/fb/`)
          .orderBy("created_at", "desc")
          .onSnapshot((data) => {
            self.feedbackData = [];
            if (data.size) {
              data.forEach(function (doc) {
                self.feedbackData.push(doc.data());
              });
            }
            self.loadingFeedBacks = false;
          });
      },
      /**
       * Function that constructs new feedback and saves it in database.
       */
      addNewFeedback() {
        this.creating = true;
        const feedBack = {
          uid: uuid.v4(),
          created_at: new Date().getTime(),
          text: this.feedback
        };

        CFC.addNewFeedBack(this.activeEmployee.uid, feedBack).then(() => {
          this.creating = false;
          this.feedback = "";
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "assets/styles/variables"
  .v-list
    position: relative
  .pp-feedbacks-view
    padding: 0 15px
    +setGrid(null, null, auto auto 1fr, null, "rows")

  .pp-all-employees-split
    height: 100%
    +setGrid(1fr 3fr, null, null, null, "columns")

    aside:first-child
      background: #1E1E1E

  h3
    margin: 20px 0 0 0

  .v-list-item__subtitle
    color: cornflowerblue !important

  .spacer
    margin-top: 5px

  .v-btn.v-btn--contained
    width: 100%

</style>
