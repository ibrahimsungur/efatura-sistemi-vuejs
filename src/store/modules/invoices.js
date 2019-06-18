import axios from 'axios'

const state={
    invoices:[],
    invoiceId:""
};
const getters={
    getInvoices(state){
       return state.invoices
    },
    findInvoice :(state)=>(id)=>{
        return state.invoices.filter(element=>{
            if(element.id===id){
                return element;
            }
        });
    },
};
const mutations={
    updateInvoiceList(state,invoice){
        state.invoices.push(invoice);
    },

    updateListForDeletedInvoice(state,value){

       let invoice =state.invoices.find((invoice)=>{
             if(invoice.id===value){
                 return invoice;
             }
       });
       let index = state.invoices.indexOf(invoice);
        return state.invoices.splice(index,1);
    }
};
const actions={

    initAppInvoice({commit}){
        axios.get("http://localhost:9000/invoice/invoiceList")
            .then((response)=>{
                let data=response.data;
                for (let key in data){
                    commit("updateInvoiceList",data[key])
                }
            })
    },
   saveInvoice({commit,dispatch},invoiceId){
       axios.post("http://localhost:9000/invoice/saveInvoice",invoiceId)
           .then((response)=>{
               console.log(response);
               //commit("updateInvoiceList",invoice);
               dispatch("initAppInvoice")
           })
   },
    deleteInvoice({commit},invoiceId){

        axios.delete("http://localhost:9000/invoice/invoices/"+invoiceId)
            .then((response)=>{
              commit("updateListForDeletedInvoice",invoiceId);
            })


    }
};

export default {

    state,
    getters,
    mutations,
    actions
}