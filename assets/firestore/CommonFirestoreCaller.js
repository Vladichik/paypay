/**
 *
 * Written by vlad on 06/09/2019
 */
import {Firestore} from "./firebaseConf";
import {Constants} from "../scripts/Constants";

export default class FirestoreCaller {
  /**
   * This function creates new or saves changed employee data in database
   * @param employee - Employee data that should be set in database
   * @returns {Promise<void>}
   */
  static createNewEmployee(employee) {
    return Firestore.doc(`${Constants.FIRE_S_EMPLOYEES}/${employee.uid}`).set(employee, {merge: true});
  }

  /**
   * Function that receives employee ID as a param and erases him from DataBase
   * @param empId - employee id
   * @return {Promise<void>}
   */
  static deleteEmployee(empId) {
    return  Firestore.doc(`${Constants.FIRE_S_EMPLOYEES}/${empId}`).delete();
  }

  /**
   * Function that reeceives relevant data to create new feedback in database
   * @param emId - employee id, required to store the new feedback under correct collection
   * @param feedback - object with relevant feedback data
   * @return {Promise<void>}
   */
  static addNewFeedBack(emId, feedback) {
    return Firestore.doc(`${Constants.FIRE_S_FEEDBACKS}/${emId}/fb/${feedback.uid}`).set(feedback);
  }

  /**
   * Function receives relevant collection url and fetches collection data from firebase
   * then it converts received data into comfortable array structure
   * @param url - collection url to fetch data from
   * @return {Promise<firebase.firestore.QuerySnapshot>}
   */
  static getDataForCollection(url) {
    return Firestore.collection(url).get().then(data => {
      if (data.size) {
        const dArray = [];
        data.forEach(function (doc) {
          dArray.push(doc.data());
        });
        return dArray;
      }
    })
  }
}
