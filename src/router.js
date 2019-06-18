import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/page/user/Login'
import UserRegistrationList from './components/loginPage/UserRegistrationList'
import AddCustomer from './components/page/customer/AddCustomer'
import ListCustomer from './components/page/customer/ListCustomer'
import UpdateCustomer from './components/page/customer/UpdateCustomer'
import AddInvoice from './components/page/invoice/CreateInvoice'
import InvoiceList from './components/page/invoice/ListInvoice'
import UpdateInvoice from './components/page/invoice/UpdateInvoice'
import CreateUser from './components/page/user/CreateUser'
import {store} from './store/store'


Vue.use(VueRouter);

const routes =[
    {path:"/login", component :Login},
    {path:"/", component :Login},
    {path:"/create-user" , component:CreateUser},
    {path :"/userList" ,component:UserRegistrationList,
    beforeEnter(to,from,next){
        if(store.getters.isAuthenticated){
            next()
        }else{
            next("/login")
        }
    }},
    {path :"/customer" ,component:AddCustomer,
        beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }},
    {path :"/create-user" ,component:CreateUser},
    {path :"/list-customer" ,component:ListCustomer,beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }},
    {path:"/update-customer" ,component:UpdateCustomer,beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }},
    {path:"/add-invoice" ,component:AddInvoice,beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }},
    {path:"/list-invoice",component:InvoiceList,beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }},
    {path:"/update-invoice",component:UpdateInvoice,beforeEnter(to,from,next){
            if(store.getters.isAuthenticated){
                next()
            }else{
                next("/login")
            }
        }}


];

export const router =  new VueRouter({
 mode:"history",
    routes
});