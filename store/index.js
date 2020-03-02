/**
 *
 * Written by vlad
 */

export const state = () => ({
  confirm_delete: false,
  edit_employee: false,
});

export const mutations = {
  setVuexConfirmDelete(state, flag) {
    state.confirm_delete = flag;
  },

  setVuexEditEmployee(state, flag) {
    state.edit_employee = flag;
  }
};
