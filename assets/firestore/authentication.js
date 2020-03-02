/**
 *
 * Written by vlad on 09/01/2019
 */

import {Firebase} from './firebaseConf';
import 'firebase/auth';

/**
 * @class Authentication
 */
export default class Authentication {

  /**
   * @static
   * @return {firebase.auth.Auth | *}
   */
  static auth() {
    return Firebase.auth();
  }

  /**
   * @static
   * @param {string} email
   * @param {string} password
   * @return {Promise<firebase.auth.UserCredential>}
   */
  static async signup(email, password) {
    return await Authentication.auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Firebase login method
   * @param {string} email
   * @param {string} password
   * @return {Promise<firebase.auth.UserCredential>}
   */
  static async login(email, password) {
    return await Authentication.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * @static
   * @return {Promise<void>}
   */
  static async logout() {
    return await Authentication.auth().signOut();
  }

  /**
   * @static
   * @param email
   * @return {Promise<void>}
   */
  static async sendResetPasswordRequest(email) {
    return await Authentication.auth().sendPasswordResetEmail(email);
  }

  /**
   * @static
   * @return {Promise<void>}
   */
  static async sendUserEmailVerification() {
    return await Authentication.auth().currentUser.sendEmailVerification();
  }

  /**
   * @static
   * @return {Promise<firebase.User>}
   */
  static async currentUser() {
    return Authentication.auth().currentUser;
  }

  /**
   * @static
   * @return {Promise<void>}
   */
  static async isLoggedIn() {
    Authentication.auth().onAuthStateChanged(user => user);
  }
}
