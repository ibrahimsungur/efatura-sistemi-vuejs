<template>
   <div class="container">
       <div class="row">
           <div class="col-6 offset-3 pt-3 card mt-5 shadow">
               <div class="card-body">
                   <h3>Giriş İşlemleri</h3>
                   <hr>
                   <div class="form-group">
                       <label>Email</label>
                       <input type="text" v-model="user.email" class="form-control"  placeholder="Kullanıcı adınızı giriniz..">
                   </div>
                   <div class="form-group">
                       <label>Şifre</label>
                       <input type="password" v-model="user.password" class="form-control"  placeholder="Şifrenizi  giriniz..">
                   </div>
                   <hr>
                   <router-link  to="/create-user" exact >
                       <a  class="createUser">Kullanıcı Kayıt</a>
                   </router-link>
                   <button class="btn btn-primary" :disabled="saveEnabled" @click="login">Giriş</button>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        data(){
            return{
                user:{
                    email:"",
                    password:""
                }
            }
        },
        methods:{
          login(){
              this.$store.dispatch("login",{...this.user})
          }
        },
        computed:{
            saveEnabled(){
                if(this.user.email.length>0 && this.user.password.length>0){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
.createUser{
    margin-right:100px;
    color:yellow;

}
</style>