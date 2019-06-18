import axios from 'axios'
import {router} from '../../router'



const state={
    customers:[],
    customerId:"",
    selectedCustomer:{}
};
const getters={
    getCustomers(state){
        return state.customers
    },
    /*
    findCustomer:(state)=>(id)=>{
       return state.customers.find(element =>element.id ===id)
    }
    */
    findCustomer :(state)=>(id)=>{
        return state.customers.filter(element=>{
           if(element.id===id){
              state.selectedCustomer=element;
               return  element;
           }
        });
    },
      getSelectedCustomer(state){
        return state.selectedCustomer;
    }

};
const mutations ={
    updateCustomerList(state,customer){
     state.customers.push(customer)
    },
    /*
    updateListForDeletedCustomer(state){
       return  state.customers.splice(0,state.customers.length)
    }*/

    updateListForDeletedCustomer(state,customerId){
        let customer =state.customers.find((customer)=>{
            if(customer.id===customerId){
                return customer;
            }
        });
        let index = state.customers.indexOf(customer);
        return state.customers.splice(index,1);
    },
    updateForDeleteCustomer(state,value){
       return state.customers.splice(0,state.customers.filter(value)
       )
    }
};
const actions={

    initApp({commit}){
        axios.get("http://localhost:9000/customer/customerList")
            .then((response)=>{
                let data=response.data;
                for (let key in data){
                    commit("updateCustomerList",data[key])
                }

               //console.log("Response Data : ",response.data)
            })
    },
   saveCustomer({commit},customer){
     // console.log(customer);
       axios.post("http://localhost:9000/api/auth/saveCustomer",customer)
           .then((response)=>{
               //console.log("post Response",response.data);
               commit("updateCustomerList",response.data);
           });


   },
    deleteCustomer({commit,dispatch},customerId){
        axios.delete("http://localhost:9000/customers/"+customerId)
            .then((response)=>{
                commit("updateListForDeletedCustomer",customerId);
                //dispatch("initApp")
            });
        router.replace("/list-customer")
    },
    updateCustomer({commit,state},customer){
      axios.put("http://localhost:9000/customer/"+customer.id,customer)
          .then((response)=>{
              console.log(response.data);
              commit("updateListForDeletedCustomer",customer.id);
              commit("updateCustomerList",response.data)
          })

    }
};


export default {
    state,
    getters,
    mutations,
    actions
}