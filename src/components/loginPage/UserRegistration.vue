<template>
    <div class="container">
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="row">
            <div class="col-6 offset-3 pt-3 card mt-5 shadow">
                <div class="card-body">
                    <h3>Kayıt İşlemleri</h3>
                    <hr>
                    <div class="form-group">
                        <label> Adınız ve Soyadınız</label>
                        <input type="text" v-model="user.name" class="form-control" placeholder="Adınızı giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Kullanıcı Adı</label>
                        <input type="text" v-model="user.lastName" class="form-control"
                               placeholder="Soyadınızı giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Emailiniz</label>
                        <input type="text" v-model="user.email" class="form-control" placeholder="Emalinizi giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input type="password" v-model="user.password" class="form-control"
                               placeholder="Şifrenizi  giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Şifre Tekrarı</label>
                        <input type="password" v-model="againPassword" class="form-control"
                               placeholder="Şifrenizi  giriniz..">
                    </div>
                    <p v-if="checkPassword">Şifreleriniz Örtüşmüyor Lütfen Şifrelerinizi Kontrol Ederek Tekrar Giriniz
                        !!!</p>
                    <hr>
                    <router-link to="/login" exact>
                        <a class="login">Kullanıcı Giriş</a>
                    </router-link>
                    <button class="btn btn-primary" :disabled="saveEnabled" @click="saveUser">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: "",
                    username: "",
                    email: "",
                    password: ""
                },
                againPassword:"",
                saveButtonClicked: false
            }
        },
        methods: {
            saveUser() {
                console.log(this.user);
                this.$store.dispatch("saveUser", this.user);

                this.user = {
                    name: "",
                    lastName: "",
                    email: "",
                    password: ""
                };
                    this.againPassword="";
                    this.saveButtonClicked=true;

            }
        },
        computed: {
            checkPassword() {
                if ((this.user.password === this.againPassword) && (this.user.password.length > 0 && this.againPassword.length > 0)) {
                    return false;
                } else if (this.user.password.length > 0 && this.againPassword.length > 0) {
                    return true;
                }
            },
            saveEnabled() {
                if (this.user.email.length > 0 && this.user.password.length > 0 && this.againPassword.length > 0 && this.user.name.length > 0 && this.user.lastName.length > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            isLoading(){
                if(this.saveButtonClicked){
                    return {
                        display:"block"
                    }
                }else{
                    return {
                        display : "none"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    /** css dosyalarini eklemek icin bu yapi kullanilir.*/
    @import url("../../assets/loading.css");
    .login {
        margin-right: 100px;
    }
</style>