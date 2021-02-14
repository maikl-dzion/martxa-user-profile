import ApiService from "@/api/api.service";
const api = new ApiService()

const user = {

  state: {
    userId : 0,
    user   : {},
    users  : [],
    userFiles : [],
    errors : [],
  },

  mutations: {

    setUsers(state, data) {
      state.users = data
    },

    setUser(state, data) {
      state.user = data
    },

    setError(state, data) {
       state.errors = data
    }

  },

  actions: {

      fetchUsers(context) {
        api.get("/get/users").then(data => {
            context.commit('setUsers', data);
          }).catch(response => {
            context.commit('setError', response);
          });
      },

      fetchUser(context, userId) {
        const url = '/get/user-by-id/' + userId
        api.get(url).then(data => {
           context.commit('setUser', data);
        }).catch(response => {
           context.commit('setError', response);
        });
      },

      setUserId(context, userId) {
         context.state.userId = userId
      },

  },

  getters: {

      getUser: state => {
        return state.user
      },

      userInfo: state => {
        return state.user
      },

      getUsers: state => {
        return state.users
      },

      getError: state => {
        return state.errors
      },

      getUserId: state => {
        return state.userId
      },
  },

}

export default user
