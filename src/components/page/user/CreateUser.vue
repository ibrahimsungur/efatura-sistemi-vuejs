<template>
    <div class="container">
        <!--
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        -->
        <div class="row">

            <div class="col-md-12 mb-5">

                <form>
                    <h3 class="text-center mt-3">Kullanıcı Ekleme</h3>
                    <hr>
                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="name">Ad Ve Soyad</label>
                            <input @blur="$v.user.name.$touch()" v-model="user.name" type="text" class="form-control"
                                   id="name" placeholder="Adınızı Giriniz">
                            <small v-if="!$v.user.name.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="email">Email</label>
                            <input @blur="$v.user.email.$touch()" v-model="user.email" type="email" class="form-control"
                                   id="email" placeholder="Email Giriniz">
                            <small v-if="!$v.user.email.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                            <small v-if="!$v.user.email.email" class="form-text text-danger mt-1">Lütfen Geçerli Bir
                                Email Giriniz..!
                            </small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="surname">Kullanıcı Adı</label>
                            <input @blur="$v.user.username.$touch()" v-model="user.username" type="text"
                                   class="form-control" id="surname" placeholder="Kullanıcı Adınızı Giriniz">
                            <small v-if="!$v.user.username.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="password">Password</label>
                            <input @blur="$v.user.password.$touch()" v-model="user.password" type="password"
                                   class="form-control" id="password" placeholder="Şifre Giriniz">
                            <small v-if="!$v.user.password.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>

                        </div>


                        <div class="form-group col-md-6">
                            <label for="phone">Telefon </label>
                            <input @blur="$v.user.phoneNumber.$touch()" v-model="user.phoneNumber" type="text"
                                   class="form-control" id="phone" placeholder="Telefon Numarası Giriniz">
                            <small v-if="!$v.user.phoneNumber.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="confirmPassword">Confirm Password</label>
                            <input @blur="$v.confirmPassword.$touch()" v-model="confirmPassword" type="password"
                                   class="form-control" id="confirmPassword" placeholder="Tekrar Şifre Giriniz">
                            <small v-if="!$v.confirmPassword.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                            <small v-if="!$v.confirmPassword.sameAs" class="form-text text-danger mt-1">Şifreler
                                Uyuşmuyor Lütfen Kontrol Ediniz..!
                            </small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="customerStates">Müşteri Durumu</label>
                            <select @blur="$v.user.email.$touch()" v-model="user.customerStatus" id="customerStates"
                                    class="form-control">
                                <option disabled>Durumu Seçiniz</option>
                                <option v-for="status in customerCases">{{status}}</option>
                                <small v-if="!$v.user.customerStatus.required" class="form-text text-danger mt-1">Bu
                                    Alan Zorunludur..!
                                </small>

                            </select>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="input">Yetki Listesi</label>
                            <select
                                    @blur="$v.user.authorityList.$touch()"
                                    v-model="user.authorityList" id="input" class="form-control">
                                <option disabled>Yetkiyi Seçiniz</option>
                                <option  v-for="authority in authorityLists">{{authority}}</option>
                            </select>
                            <small v-if="!$v.user.authorityList.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                        </div>


                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck">
                            <label class="form-check-label" for="gridCheck">
                                Check me out
                            </label>
                        </div>
                    </div>
                    <button type="submit" :disabled="$v.$invalid" class="btn btn-primary" @click.prevent="saveUser">Kaydet</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
    import {required, email, sameAs} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                user: {
                    name: "",
                    username: "",
                    password: "",
                    email: "",
                    phoneNumber: "",
                    customerStatus: "",
                    authorityList: [],
                    createdUser: "",
                    createdDate: "",
                },
                confirmPassword: "",
                customerCases: ["Aktif", "Pasif", "Aktiflenmemiş"],
                authorityLists: ["Fatura Oluşturma", "Fatura Gönderme", "Fatura İptal"],
                isLoading:false

            }
        },
        methods: {
            saveUser() {
               this.$store.dispatch("saveUser",{...this.user}),
                   this.user={
                   name:"",
                    username:"",
                    password:"",
                    phoneNumber:"",
                    email:"",
                    authorityList:""
                };
                   this.confirmPassword=""
            },

    },
    validations:{
        user:{
            name:{
                required
            }
        ,
            username: {
                required
            }
        ,
            email:{
                required,
                    email
            }
        ,
            password: {
                required,
            }
        ,
            phoneNumber: {
                required
            }
        ,
            customerStatus: {
                required
            }
        ,
            authorityList: {
                required
            }
        ,
        }
    ,
        confirmPassword: {
            required,
                //sameAs:sameAs('password')
                sameAs
        :
            sameAs(vm => {
                return vm.user.password
            })
        }
    }
    }

</script>

<style scoped>

</style>