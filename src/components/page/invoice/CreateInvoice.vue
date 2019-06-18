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
                    <h3 class="text-center mt-3">Fatura Oluşturma</h3>
                    <hr>
                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="invoiceType">Fatura Tipi</label>
                            <select id="invoiceType" class="form-control" v-model="invoice.invoiceType">
                                <option disabled>Fatura Tipini Seçiniz</option>
                                <option :key="index" v-for="(invoiceType,index) in invoiceTypes">{{invoiceType}}
                                </option>
                            </select>
                            <small v-if="!$v.invoice.invoiceType.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="invoiceDirection">Fatura Yönü</label>
                            <select id="invoiceDirection" class="form-control" v-model="invoice.invoiceDirection">
                                <option selected disabled>Durumu Seçiniz</option>
                                <option :key="index" v-for="(invoiceDirection,index) in invoiceDirections">
                                    {{invoiceDirection}}
                                </option>
                            </select>
                            <small v-if="!$v.invoice.invoiceDirection.required" class="form-text text-danger mt-1">Bu
                                Alan Zorunludur..!
                            </small>
                        </div>


                        <div class="form-group col-md-6">
                            <label for="invoiceDirection">Para Birimi</label>
                            <select id="invoiceDirection" class="form-control" v-model="invoice.moneyUnit">
                                <option selected disabled>Param Birimin Seçiniz</option>
                                <option :key="index" v-for="(moneyUnit,index) in moneyUnits">{{moneyUnit}}</option>
                            </select>
                            <small v-if="!$v.invoice.moneyUnit.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="title">Gönderici</label>
                            <input @blur="$v.invoice.sender.$touch()" v-model="invoice.sender" type="text"
                                   class="form-control" id="title" placeholder="Göndericiyi Giriniz">
                            <small v-if="!$v.invoice.sender.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="invoiceDirection">Durumu</label>
                            <select id="invoiceDirection" class="form-control" v-model="invoice.status">
                                <option selected disabled>Param Birimin Seçiniz</option>
                                <option :key="index" v-for="(status,index) in situations">{{status}}</option>
                            </select>
                            <small v-if="!$v.invoice.moneyUnit.required" class="form-text text-danger mt-1">Bu Alan
                                Zorunludur..!
                            </small>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="title">Alıcı</label>
                            <input @blur="$v.invoice.receiver.$touch()" v-model="invoice.receiver" type="text"
                                   class="form-control" id="title" placeholder="Göndericiyi Giriniz">
                            <small v-if="!$v.invoice.receiver.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                        </div>

                        <div class="form-group row rowCount" >
                            <div class="form-group col-md-2 ">
                                <label for="title">Ürün Adı</label>
                                <input @blur="$v.invoice.productName.$touch()" v-model="invoice.productName" type="text"  class="form-control">
                                <small v-if="!$v.invoice.productName.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>

                            </div>
                            <div class="form-group col-md-2 ">
                                <label for="title">Ürün Adedi</label>
                                <input @blur="$v.invoice.productCount.$touch()" v-model="invoice.productCount"
                                       @change="calculateProduct" type="text"  class="form-control">
                                <small v-if="!$v.invoice.productCount.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                                <small v-if="!$v.invoice.productCount.numeric" class="form-text text-danger mt-1">Lütfen Sadece Rakam Giriniz..!</small>

                            </div>
                            <div class="form-group col-md-2 ">
                                <label for="title">Ürün Fiyatı</label>
                                <input @blur="$v.invoice.productName.$touch()" v-model="invoice.productPrice"
                                       @change="calculateProduct" type="text"  class="form-control">
                            </div>
                            <div class="form-group col-md-1 ">
                                <label for="vatRate">Kdv </label>
                                <select id="vatRate" @change="calculateProduct" class="form-control" v-model="invoice.vatRate">
                                    <option selected disabled>Kdv Oranını Seçiniz</option>
                                    <option :key="index" v-for="(vatRate,index) in vatRates">{{vatRate}}</option>
                                </select>
                                <small v-if="!$v.invoice.vatRate.required" class="form-text text-danger mt-1">Bu Alan Zorunludur..!</small>
                            </div>
                            <div class="form-group col-md-2 ">
                                <label for="title">Toplam Kdv Tutarı</label>
                                <input v-model="invoice.totalVatAmount"  disabled type="text"  class="form-control">
                            </div>

                            <div class="form-group col-md-2 ">
                                <label for="title">Toplam Tutarı</label>
                                <input v-model="invoice.totalAmount" disabled type="text"  class="form-control">
                            </div>

                        </div>

                        <button type="submit" class="btn btn-primary mb-5" :disabled="$v.$invalid" @click.prevent="saveInvoice">Kaydet</button>
                        <button type="submit" class="btn btn-primary ml-2 mb-5" @click.prevent="invoiceList">Fatura Listesi</button>
                   </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>

    import {router} from "../../../router";

    import {required, numeric, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                invoice: {
                    ettn: "",
                    invoiceNumber: "",
                    invoiceType: "",
                    invoiceDirection: "",
                    moneyUnit: "",
                    sender: "urn:mail:defaultpk@sungur.com",
                    receiver: "urn:mail:defaultpk@sungur.com",
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
                saveButtonClicked: false,
                invoiceTypes: ["Satış", "İade", "İhracat"],
                invoiceDirections: ["OUT", "IN"],
                moneyUnits: ["TL", "USD", "EUR"],
                situations: ["Aktif", "Pasif", "Aktiflenmemiş"],
                index: "1",
                vatRates: ["0", "1", "8", "18"]
            }
        },
        methods: {
            saveInvoice() {
                this.$store.dispatch("saveInvoice", {...this.invoice});

                this.saveButtonClicked = true;

                setTimeout(() => {
                    this.saveButtonClicked = false
                }, 800);

                //alert("Müşteri Başarılı Bir Şekilde Oluşturulmuştur.")
                // console.log(this.customer)
            },
            invoiceList() {
            router.replace("/list-invoice")
            },
            calculateProduct(){

            let kdvAmaount= (this.invoice.productCount*this.invoice.productPrice)*(this.invoice.vatRate)/100;
            this.invoice.totalVatAmount=kdvAmaount;
            let totalPrice =(this.invoice.productCount*this.invoice.productPrice)+kdvAmaount;
            this.invoice.totalAmount=totalPrice;
        },
            createInvoiceNumber(){
                let seri ="001";
                let year=new Date().getFullYear();
                let number="000000001";
                let invoiceNumber=seri+year+number;
                this.invoice.invoiceNumber=invoiceNumber;
            }
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