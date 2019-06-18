<template>
    <div class="container mb-3">
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-5">
                <form>
                    <h3 class="text-center mt-3">Müşteri Bilgileri</h3>
                    <hr>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="title">Ünvan</label>
                        <input @blur="$v.customer.title.$touch()" v-model="customer.title" type="text" class="form-control" id="title" placeholder="Üvanı Giriniz">
                        <small v-if="!$v.customer.title.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                    </div>

                        <div class="form-group col-md-6">
                            <label for="title">Adres</label>
                            <input @blur="$v.customer.address.$touch()" v-model="customer.address" type="text" class="form-control" id="title" placeholder="Adres Giriniz">
                            <small v-if="!$v.customer.address.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="title">Vergi Kimlik Numaası</label>
                            <input @blur="$v.customer.taxIdentificationNumber.$touch()" v-model="customer.taxIdentificationNumber" type="text" class="form-control" id="title" placeholder="Vergi Kimlik Numrasını Giriniz">
                            <small v-if="!$v.customer.taxIdentificationNumber.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.numeric" class="form-text text-danger mt-1">Lütfen Sadece Rakam Giriniz..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.maxLength" class="form-text text-danger mt-1">Lütfen Sadece {{$v.customer.taxIdentificationNumber.$params.maxLength.max}} Rakam Giriniz..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.minLength" class="form-text text-danger mt-1">Lütfen Sadece {{$v.customer.taxIdentificationNumber.$params.minLength.min}} Rakam Giriniz..!</small>


                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputCity">Şehir</label>
                            <select id="inputCity" v-model="customer.city" @change="citySelected" class="form-control">
                                <option value="" disabled>Şehir Seçiniz</option>
                                <option v-for="n in city">{{n}}</option>
                            </select>
                            <small v-if="!$v.customer.city.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Email</label>
                            <input @blur="$v.customer.email.$touch()" type="email" v-model="customer.email" class="form-control" id="inputEmail4"
                                   placeholder="Email Giriniz">
                            <small v-if="!$v.customer.email.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.email.email" class="form-text text-danger mt-1">Lütfen Geçerli Bir E-Posta Giriniz..!</small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="input">İlçe</label>
                            <select v-model="customer.district" id="input" class="form-control">
                                <option value="" disabled>İlçe Seçiniz</option>
                                <option v-for="district in newDistricts">{{district.ilce}}</option>
                            </select>
                            <small v-if="!$v.customer.district.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="phone">Telefon </label>
                            <input @blur="$v.customer.phoneNumber.$touch() || focusOut"
                                   @keyup="focusOut"
                                   v-model="customer.phoneNumber"
                                   type="text" class="form-control"
                                   id="phone"
                                   placeholder="Telefon Numarası Giriniz">
                            <small v-if="!$v.customer.phoneNumber.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.phoneNumber.minLength" class="form-text text-danger mt-1">Lütfen En Az {{$v.customer.phoneNumber.$params.minLength.min-2}} Rakam Giriniz(xxx-xxx-xxxx)..!</small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="country">Ülke</label>
                            <select @blur="$v.customer.country.$touch()" v-model="customer.country" id="country" class="form-control">
                                <option disabled>Ülke Giriniz</option>
                                <option v-for="index in countries">{{index}}</option>
                            </select>
                        </div>


                        <div class="form-group col-md-6">
                            <label for="title">Seri Ön Eki</label>
                            <input @blur="$v.customer.serialPrefix.$touch()"  v-model="customer.serialPrefix" type="text" class="form-control" id="title" placeholder="Seri Ön Eki Giriniz">
                            <small v-if="!$v.customer.serialPrefix.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                        </div>

                        <div class="form-group col-md-6">
                            <label for="customerStates">Müşteri Durumu</label>
                            <select id="customerStates" class="form-control" v-model="customer.status">
                                <option disabled>Durumu Seçiniz</option>
                                <option :key="i" v-for="i in situations">{{i}}</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="saveCustomer">Kaydet</button>
                    <button type="submit" class="btn btn-primary ml-2"  @click.prevent="customerList">Müşteri Listesi</button>

                </form>
            </div>

        </div>
    </div>
</template>

<script>
    import cities from './cities'
    import district from './district'
    import {router} from "../../../router";

    import {required,email,alpha,numeric,minLength,maxLength} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                customer: {
                    title: "",
                    taxIdentificationNumber:"1234567890",
                    email: "",
                    address :"",
                    phoneNumber: "",
                    status:"",
                    serialPrefix: "FYA",
                    createdUser: "",
                    createdDate:"",
                    city: "",
                    district:"",
                    country:""
                },
                situations: ["Yeni", "Aktif", "Pasif", "Kısıtlanmış", "İptal Edilmiş"],
                city: [],
                districts: [],
                newDistricts: [],
                index: 0,
                phoneValue: 0,
                preventNextIteration: false,
                countries:["Türkiye","Almanya","İspanya","Fransa","ABD","Mısır","Brezilya"],
                saveButtonClicked: false
            }
        },
        methods: {
            saveCustomer() {
              this.$store.dispatch("saveCustomer",{...this.customer});
                this.customer= {
                    title: "",
                        taxIdentificationNumber:"",
                        email: "",
                        address :"",
                        phoneNumber: "",
                        status:"",
                        serialPrefix: "",
                        createdUser: "",
                        createdDate: "",
                        city: "",
                        district:"",
                        country:""
                };

                this.saveButtonClicked=true;

                setTimeout(()=>{
                    this.saveButtonClicked=false
                },800);

               //alert("Müşteri Başarılı Bir Şekilde Oluşturulmuştur.")

               // console.log(this.customer)
            },
            customerList(){
                router.replace("/list-customer")
            },
            citySelected() {
                this.newDistricts = this.districts.filter(element => {

                    if (element.il === this.customer.city) {
                        //console.log("ilçe : ", element.ilce);
                        return element.ilce
                    }
                    return "";

                })

            }
            ,
            focusOut: function(event) {
                if (['Arrow', 'Backspace', 'Shift'].includes(event.key)) {
                    this.preventNextIteration = true;
                    return;
                }
                if (this.preventNextIteration) {
                    this.preventNextIteration = false;
                    return;
                }
                this.phoneValue = this.customer.phoneNumber.replace(/-/g, '').match(/(\d{1,10})/g)[0];

                // Format display value based on calculated currencyValue
                this.customer.phoneNumber = this.phoneValue.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/g, '$1-$2-$3');
            },

        },

        validations:{
            customer:{
                title:{
                 required
                },
                email:{
                    required,
                    email
                },
                phoneNumber: {
                    required,
                    minLength : minLength(12),
                },
                serialPrefix:{
                    required
                },
                city: {
                    required
                },
                district:{
                    required
                },
                taxIdentificationNumber:{
                    required,
                    numeric,
                    minLength : minLength(10),
                    maxLength : maxLength(10)
                },
                address:{
                    required
                },
                country: {
                    required
                }
            }
        },
        created() {
            for (this.i in cities) {
                this.city[this.i] = cities[this.i].il
            }
            for (this.i in district) {
                this.districts[this.i] = district[this.i]
            }
        },
        computed:{
            isLoading(){
                if(this.saveButtonClicked){
                    return {
                        display:"block"
                    }
                }else{
                    return {
                        display :"none"
                    }
                }
            }
        }
    }
</script>

<style scoped >
    @import url("../../../assets/loading.css");

    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 2s ease-out;
    }
    .fade-leave {}

    .fade-leave-active {
        transition: opacity 2s ease-out;
        opacity: 0;
    }
</style>