import ApiService from "@/api/api.service";
const api = new ApiService()

const user = {

  state: {
    userId : 0,
    user   : {},
    users  : [],
    userFiles : [],
    errors : [],
    // selectUserId : 0,
    // selectUser   : {},
  },

  mutations: {

    setUsers(state, data) {
      state.users = data
    },

    setUser(state, data) {
      state.user = data
      state.userId = data.user_id
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

        if(!userId) {
          context.commit('setUser', []);
          return false;
        }

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

      setUserInfo(context, data) {
         context.commit('setUser', data)
      },

      clearUserInfo(context) {
          context.state.userId = 0
          context.state.user = {}
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

      getUsersList: state => {
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
