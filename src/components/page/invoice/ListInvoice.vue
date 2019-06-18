<template>
    <div class="flux">
        <div class="loading" :style="isLoading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 ">

                <br><br>
                <table class="table  table-striped table-light" >
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Ettn</th>
                        <th scope="col">Fatura Numarası</th>
                        <th scope="col">Fatura Tipi</th>
                        <th scope="col">Fatura Yönü</th>
                        <th scope="col">Para Birimi</th>
                        <th scope="col">Gönderici</th>
                        <th scope="col">Alıcı</th>
                        <th scope="col">Ürün Adı</th>
                        <th scope="col">Ürün Adedi</th>
                        <th scope="col">Ürün Fiyatı</th>
                        <th scope="col">Kdv Oranı</th>
                        <th scope="col">Toplam Kdv Tutarı</th>
                        <th scope="col">Toplam Tutar</th>
                        <th scope="col">Oluşturan Kullanıcı</th>
                        <th scope="col">Oluşturulma Tarih</th>
                        <th scope="col">Güncelleme Tarih</th>
                        <th scope="col">Güncelleme</th>
                        <th scope="col">Sil</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="invoice.id" v-for="invoice in getInvoices">
                        <th scope="row">{{invoice.id}}</th>
                        <td>{{invoice.ettn}}</td>
                        <td>{{invoice.invoiceNumber}}</td>
                        <td>{{invoice.invoiceType}}</td>
                        <td>{{invoice.invoiceDirection}}</td>
                        <td>{{invoice.moneyUnit}}</td>
                        <td>{{invoice.sender}}</td>
                        <td>{{invoice.receiver}}</td>
                        <td>{{invoice.productName}}</td>
                        <td>{{invoice.productCount}}</td>
                        <td>{{invoice.productPrice |currency}}</td>
                        <td>{{invoice.vatRate}}</td>
                        <td>{{invoice.totalVatAmount |currency}}</td>
                        <td>{{invoice.totalAmount |currency}}</td>
                        <td>{{invoice.createUser  }}</td>
                        <td>{{invoice.createDate | moment("DD/ MM / YYYY, HH:mm:ss ")}}</td>
                        <td>{{invoice.updateDate}}</td>
                        <th><button class="btn btn-success"  @click="updateInvoice(invoice.id)">Güncelle</button></th>
                        <th><button class="btn btn-danger"  @click="deleteInvoice(invoice.id)">Sil</button></th>
                    </tr>


                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex'
    import {router} from "../../../router";
    export default {
        data(){
            return {
                saveButtonClicked: false
            }
        },
        methods:{
            deleteInvoice(value) {
                if (confirm("Bu Müşteriyi Silmek İstediğinize Emin misiniz ?")) {
                    this.$store.dispatch("deleteInvoice",value);
                }
                this.saveButtonClicked=true;
                setTimeout(()=>{
                    this.saveButtonClicked=false
                },800);
                // alert("Müşteri Başarılı Bir Şekilde Silindi");
            },
            updateInvoice(value){
                this.$store.state.customerId=value;
                router.replace("/update-Invoice")
            }
        },

        computed:{
            ...mapGetters([
                "getInvoices",
            ]),
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

<style scoped>
    @import url("../../../assets/loading.css");
    .flux{
        margin-bottom: 50px;
        margin-top: -10px;
    }
</style>