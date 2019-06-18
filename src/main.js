import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import {store} from './store/store'
import Vuelidate from 'vuelidate'



Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(require('vue-moment'));




Vue.filter("currency",(value)=>{
    return parseFloat(value).toLocaleString(undefined,{minimumFractionDigits:2} );
});


 new Vue({
  render: h => h(App),
    router,
    store,
}).$mount('#app');
