import Vue from 'vue'
import Vuex from 'vuex'
import username from './modules/username'
import customer from './modules/customer'
import invoice from './modules/invoices'

Vue.use(Vuex);


export const store = new Vuex.Store({
    modules:{
        username,
        customer,
        invoice
    }
});