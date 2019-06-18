<template>
    <div class="container">
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-5"  v-for="cust in findCustomer($store.state.customerId)">
                <form>
                    <h3 class="text-center mt-3">Müşteri Bilgileri Güncelleme</h3>
                    <hr>
                    <div class="form-row">
                        <div class="form-group col-md-6">

                            <label for="title">Ünvan</label>
                            <input

                            v-model="customer.title" type="text" class="form-control"
                                   id="title" placeholder="Ünvanı Giriniz">
                            <small v-if="!$v.customer.title.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>


                            <label for="taxIdentificationNumber">Vergi Kimlik Numaası</label>
                            <input @blur="$v.customer.taxIdentificationNumber.$touch()"
                                      v-model="customer.taxIdentificationNumber" type="text" class="form-control" id="taxIdentificationNumber"
                                   placeholder="Vergi Kimlik Numrasını Giriniz">
                            <small v-if="!$v.customer.taxIdentificationNumber.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.numeric" class="form-text text-danger mt-1">Lütfen Sadece Rakam Giriniz..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.maxLength" class="form-text text-danger mt-1">Lütfen Sadece {{$v.customer.taxIdentificationNumber.$params.maxLength.max}} Rakam Giriniz..!</small>
                            <small v-if="!$v.customer.taxIdentificationNumber.minLength" class="form-text text-danger mt-1">Lütfen Sadece {{$v.customer.taxIdentificationNumber.$params.minLength.min}} Rakam Giriniz..!</small>


                            <label for="inputEmail4">Email</label>
                            <input @blur="$v.customer.email.$touch()"
                                   type="email"  v-model="customer.email"
                                   class="form-control" id="inputEmail4"
                                   placeholder="Email Giriniz">
                            <small v-if="!$v.customer.email.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.email.email" class="form-text text-danger mt-1">Lütfen Geçerli Bir E-Posta Giriniz..!</small>

                            <label for="phone">Telefon </label>
                            <input @blur="$v.customer.phoneNumber.$touch() || focusOut"
                                   @keyup="focusOut"
                                   v-model="customer.phoneNumber"
                                   type="text" class="form-control"
                                   id="phone"
                                   placeholder="Telefon Numarası Giriniz">
                            <small v-if="!$v.customer.phoneNumber.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.phoneNumber.minLength" class="form-text text-danger mt-1">Lütfen
                                En Az {{$v.customer.phoneNumber.$params.minLength.min-2}} Rakam Giriniz(xxx-xxx-xxxx)..!
                            </small>

                            <label for="serialPrefix">Seri Ön Eki</label>
                            <input @blur="$v.customer.serialPrefix.$touch()"
                                   v-if="customer.serialPrefix ==='' ? customer.serialPrefix=cust.serialPrefix :customer.serialPrefix"
                                   v-model="customer.serialPrefix" type="text"
                                   class="form-control" id="serialPrefix" placeholder="Seri Ön Eki Giriniz">
                            <small v-if="!$v.customer.serialPrefix.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                        </div>

                        <div class="form-group col-md-6" v-for="cust in findCustomer($store.state.customerId)">
                            <label for="address">Adres</label>
                            <input @blur="$v.customer.address.$touch()"
                                   v-model="customer.address" type="text"
                                   class="form-control" id="address" placeholder="Adres Giriniz">
                            <small v-if="!$v.customer.address.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..</small>


                            <label for="inputCity">Şehir</label>
                            <select id="inputCity"
                                    v-model="customer.city"
                                    @change="citySelected"
                                    class="form-control">
                                <option  >{{customer.city}}</option>
                                <option  v-for="n in cities">{{n}}</option>
                            </select>
                            <small v-if="!$v.customer.city.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                            <label for="input">İlçe</label>
                            <select  v-model="customer.district"
                                     v-if="customer.district ==='' ? customer.district=cust.district :customer.district"
                                     @click="citySelected"
                                     id="input" class="form-control">
                                <option >{{customer.district}}</option>
                                <option  v-for="district in newDistricts">{{district.ilce}}</option>
                            </select>
                            <small v-if="!$v.customer.district.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                            <label for="country">Ülke</label>
                            <select @blur="$v.customer.country.$touch()"
                                    v-model="customer.country"
                                    id="country" class="form-control">
                                <option v-for="index in countries">{{index}}</option>
                            </select>

                            <label for="customerStates">Müşteri Durumu</label>
                            <small v-if="!$v.customer.status.required"
                                   class="form-text text-danger mt-1">Bu Alan Zorunludur..</small>
                            <select id="customerStates" class="form-control"
                                    v-model="customer.status">
                                <option disabled>Durumu Seçiniz</option>
                                <option :key="i" v-for="i in situations">{{i}}</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="updateCustomer">Güncelleme</button>
                    <button type="submit" class="btn btn-primary ml-2" @click.prevent="listCustomer">Müşteri Listesi
                    </button>

                </form>
            </div>

        </div>
    </div>
</template>

<script>
    import cities from './cities'
    import district from './district'
    import {router} from "../../../router";

    import {required, email, numeric, minLength, maxLength} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'
    import customer from "../../../store/modules/customer";

    export default {
        data() {
            return {
                changeList:this.$store.getters.findCustomer(this.$store.state.customerId),
                customer: {
                    id:this.$store.state.customerId,
                    title:this.$store.getters.getSelectedCustomer.title,//this.$store.state.findCustomer,
                    taxIdentificationNumber: this.$store.getters.getSelectedCustomer.taxIdentificationNumber,
                    email: this.$store.getters.getSelectedCustomer.email,
                    address: this.$store.getters.getSelectedCustomer.address,
                    phoneNumber: this.$store.getters.getSelectedCustomer.phoneNumber,
                    status: this.$store.getters.getSelectedCustomer.status,
                    serialPrefix: this.$store.getters.getSelectedCustomer.serialPrefix,
                    createdUser: "",
                    createdDate: "",
                    city: this.$store.getters.getSelectedCustomer.city,
                    district: this.$store.getters.getSelectedCustomer.district,
                    country: this.$store.getters.getSelectedCustomer.country
                },
                situations: ["Yeni", "Aktif", "Pasif", "Kısıtlanmış", "İptal Edilmiş"],
                cities: [],
                districts: [],
                newDistricts: [],
                index: 0,
                phoneValue: 0,
                preventNextIteration: false,
                countries: ["Türkiye", "Almanya", "İspanya", "Fransa", "ABD", "Mısır", "Brezilya"],
                saveButtonClicked: false,
            }
        },
        methods: {
            updateCustomer() {
                let id=this.$store.state.customerId;
                this.$store.dispatch("updateCustomer",{...this.customer},id);
                 // console.log("customer"+this.$store.state.selectedCustomer)
               // console.log(this.$store.getters.findCustomer(this.$store.state.customerId).title);

                this.customer = {
                    title: "",
                    taxIdentificationNumber: "",
                    email: "",
                    address: "",
                    phoneNumber: "",
                    status: "",
                    serialPrefix: "",
                    createdUser: "",
                    createdDate: "",
                    city: "",
                    district: "",
                    country: ""
                };

                this.saveButtonClicked = true;

                setTimeout(() => {
                    this.saveButtonClicked = false
                }, 800);

                router.replace("/list-customer");
                //alert("Müşteri Başarılı Bir Şekilde Oluşturulmuştur.")

                // console.log(this.customer)
            },
            listCustomer() {
                router.replace("/list-customer");
                this.customer = {
                    title: "",
                    taxIdentificationNumber: "",
                    email: "",
                    address: "",
                    phoneNumber: "",
                    status: "",
                    serialPrefix: "",
                    createdUser: "",
                    createdDate: "",
                    city: "",
                    district: "",
                    country: ""
                };

            },
            citySelected() {
                this.newDistricts = this.districts.filter(element => {
                    if (element.il === this.customer.city) {
                       // console.log("ilçe : ", element.ilce);
                        return element.ilce
                    }
                    return "";

                })

            }
            ,
            focusOut: function (event) {
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


        validations: {
            customer: {
                title: {
                    required
                },
                email: {
                    required,
                    email
                },
                phoneNumber: {
                    required,
                    minLength: minLength(12),
                },
                serialPrefix: {
                    required
                },
                city: {
                    required
                },
                district: {
                    required
                },
                taxIdentificationNumber: {
                    required,
                    numeric,
                    minLength: minLength(10),
                    maxLength: maxLength(10)
                },
                address: {
                    required
                },
                country: {
                    required
                },
                status:{
                    required
                }
            }
        },

        created() {
            for (this.i in cities) {
                this.cities[this.i] = cities[this.i].il
            }
            for (this.i in district) {
                this.districts[this.i] = district[this.i]
            }


        },
        computed: {
            ...mapGetters([
                "findCustomer",
            ]),
            isLoading() {
                if (this.saveButtonClicked) {
                    return {
                        display: "block"
                    }
                } else {
                    return {
                        display: "none"
                    }
                }
            },
        },

    }
</script>

<style scoped>
    @import url("../../../assets/loading.css");

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 2s ease-out;
    }

    .fade-leave {
    }

    .fade-leave-active {
        transition: opacity 2s ease-out;
        opacity: 0;
    }
</style>