const user = {
  state: {

    user: {},
    users : [],
    userFiles : []

  },

  mutations: {

    setUser(state, data) {
      state.user = data
    }

  },

  actions: {

      async getUser(context, payload) {
          //let {data} = await axios.get('http://yourwebsite.com/api/todo');
          //context.commit('setUser', data);
      },

  },

  getters: {
      getUser: state => {
        return state.user
      },
  },

}

export default user
