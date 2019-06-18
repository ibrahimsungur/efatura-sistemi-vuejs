<template>
    <div class="container">
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-5">
                <form>
                    <h3 class="text-center mt-3">Fatura Bilgileri Güncelleme</h3>
                    <hr>
                    <div class="form-row">
                        <div class="form-group col-md-6"   v-for="inv in findInvoice(this.$store.state.invoiceId)">

                            <label for="ettn">Ettn</label>
                            <input
                                    v-if="invoice.ettn ==='' ? invoice.ettn=inv.ettn : invoice.ettn"
                                    v-model="invoice.title" type="text" class="form-control"
                                    id="ettn" disabled placeholder="">
                            <small v-if="!$v.invoice.ettn.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>



                            <label for="invoiceNo">Fatura Numarası</label>
                            <input @blur="$v.invoice.invoiceNumber.$touch()"
                                   v-if="invoice.invoiceNumber ==='' ? invoice.invoiceNumber=inv.invoiceNumber : invoice.invoiceNumber"
                                   v-model="invoice.invoiceNumber" type="text" class="form-control" id="invoiceNo"
                                   disabled placeholder="">
                            <small v-if="!$v.invoice.invoiceNumber.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                            <label for="inputEmail4">Email</label>
                            <input @blur="$v.customer.email.$touch()"
                                   v-if="customer.email ==='' ? customer.email=cust.email :customer.email"
                                   type="email"  v-model="customer.email"
                                   class="form-control" id="inputEmail4"
                                   placeholder="Email Giriniz">
                            <small v-if="!$v.customer.email.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            <small v-if="!$v.customer.email.email" class="form-text text-danger mt-1">Lütfen Geçerli Bir E-Posta Giriniz..!</small>

                            <label for="phone">Telefon </label>
                            <input @blur="$v.customer.phoneNumber.$touch() || focusOut"
                                   v-if="customer.phoneNumber ==='' ? customer.phoneNumber=cust.phoneNumber :customer.phoneNumber"
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

                        <div class="form-group col-md-6" v-for="cust in findCustomer(this.$store.state.customerId)">
                            <label for="address">Adres</label>
                            <input @blur="$v.customer.address.$touch()"
                                   v-if="customer.address ==='' ? customer.address=cust.address :customer.address"
                                   v-model="customer.address" type="text"
                                   class="form-control" id="address" placeholder="Adres Giriniz">
                            <small v-if="!$v.customer.address.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..</small>


                            <small v-if="!$v.customer.city.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                            <label for="customerStates">Müşteri Durumu</label>
                            <small v-if="!$v.customer.status.required"
                                   class="form-text text-danger mt-1">Bu Alan Zorunludur..</small>
                            <select id="customerStates" class="form-control"
                                    v-model="customer.status"
                                    v-if="customer.status ==='' ? customer.status=cust.status :customer.status">
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
    import {router} from "../../../router";

    import {required, email, numeric, minLength, maxLength} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'
    import customer from "../../../store/modules/customer";

    export default {
        data() {
            return {
                invoice: {
                    id:this.$store.state.customerId,
                    ettn: "",
                    invoiceNumber: "",
                    invoiceType: "",
                    invoiceDirection: "",
                    moneyUnit: "",
                    sender: "",
                    receiver: "",
                    status: "",
                    createDate: "",
                    createUser:"",
                    updateDate:"",
                    productName: "",
                    productPrice: 0,
                    productCount: 0,
                    vatRate: "",
                    totalVatAmount: "",
                    totalAmount: ""
                },
                situations: ["Yeni", "Aktif", "Pasif", "Kısıtlanmış", "İptal Edilmiş"],
                newDistricts: [],
                index: 0,
                phoneValue: 0,
                preventNextIteration: false,
                countries: ["Türkiye", "Almanya", "İspanya", "Fransa", "ABD", "Mısır", "Brezilya"],
                saveButtonClicked: false,
                customers:[]

            }
        },
        methods: {
            updateCustomer() {

                let id=this.$store.state.invoiceId;
                this.$store.dispatch("updateInvoice",{...this.customer},id);

                this.invoice= {
                        ettn: "",
                        invoiceNumber: "",
                        invoiceType: "",
                        invoiceDirection: "",
                        moneyUnit: "",
                        sender: "",
                        receiver: "",
                        status: "",
                        createDate: "",
                        createUser:"",
                        updateDate:"",
                        productName: "",
                        productPrice: 0,
                        productCount: 0,
                        vatRate: "",
                        totalVatAmount: "",
                        totalAmount: ""
                    },


                this.saveButtonClicked = true;

                setTimeout(() => {
                    this.saveButtonClicked = false
                }, 800);

                //alert("Müşteri Başarılı Bir Şekilde Oluşturulmuştur.")

                // console.log(this.customer)
            },
            listCustomer() {
                router.replace("/list-invoice");

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
            invoice: {

                invoiceType: {
                    required
                },
                invoiceDirection: {
                    required

                },
                moneyUnit: {
                    required
                },
                sender: {
                    required
                },
                receiver: {
                    required
                },
                status: {
                    required
                },
                productName: {
                    required
                },
                productCount: {
                    required,
                    numeric
                },
                productPrice: {
                    required,
                    numeric
                },
                vatRate: {
                    required,
                },

            }
        },

        computed: {
            ...mapGetters([
                "findInvoice"
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
            }
        }

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