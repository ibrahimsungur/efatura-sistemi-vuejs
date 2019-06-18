import axios from 'axios'
import {router} from '../../router'

const state ={
    usernames:[],
    token:""
};
const getters={
  getUsers({commit}){
  },
    isAuthenticated(state) {
        return state.token !== ""
    }
};

const mutations={
    updateUserList(state,user){
       state.usernames.push(user)
    },
    setToken(state, accessToken) {
      //  console.log("accessToken:" + accessToken);
        state.token = accessToken
    },
    clearToken(state) {
        state.token = ""
    }
};
const actions ={
    initApp({commit,dispatch}){
        let token=localStorage.getItem("token");
        if(token){
            commit("setToken",token);
            router.push("/customer")
        }else{
            router.push("/login");
            return false;
        }
    },
    saveUser({commit},user){
    axios.post("http://localhost:9000/api/auth/signup",user)
        .then(response=>{
          // commit("updateUserList",response.data);
           // console.log(response)
        })

    },
    login({commit},user){
      //  console.log("User : ",user);

        axios.post("http://localhost:9000/api/auth/signin",{
            usernameOrEmail: user.email, password: user.password
        })
            .then(response=>{
               // console.log(response.data.accessToken)
                commit("setToken", response.data.accessToken);
                localStorage.setItem("token", response.data.accessToken);
                router.push("/customer");

            })
    },

    logout({commit, state, dispatch}) {
        commit("clearToken");
        localStorage.removeItem("token");
        router.push("/")
    }

};


export default {
    state,
    getters,
    mutations,
    actions
}