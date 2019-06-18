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
                    <thead  >
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Vergi Kimlik Numarası</th>
                        <th scope="col">E-Posta</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Durumu</th>
                        <th scope="col">Seri Ön Eki</th>
                        <th scope="col">Oluşturan Kullanıcı</th>
                        <th scope="col">Oluşturulma Tarih</th>
                        <th scope="col">Adres</th>
                        <th scope="col">Güncelleme</th>
                        <th scope="col">Silme</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="customer.id" v-for="customer in getCustomers">
                        <th scope="row">{{customer.id}}</th>
                        <td>{{customer.title}}</td>
                        <td>{{customer.taxIdentificationNumber}}</td>
                        <td>{{customer.email}}</td>
                        <td>{{customer.phoneNumber}}</td>
                        <td>{{customer.status}}</td>
                        <td>{{customer.serialPrefix}}</td>
                        <td>{{customer.createdUser}}</td>
                        <td>{{customer.createdDate | moment("DD/ MM / YYYY, HH:mm:ss ")}}</td>
                        <td>{{customer.address}} / {{customer.district}} / {{customer.city}} / {{customer.country}}</td>
                        <th><button class="btn btn-success"  @click="updateCustomer(customer.id)">Güncelle</button></th>
                        <th><button class="btn btn-danger"  @click="deleteCustomer(customer.id)">Sil</button></th>
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
            deleteCustomer(value) {
                if (confirm("Bu Müşteriyi Silmek İstediğinize Emin misiniz ?")) {
                    this.$store.dispatch("deleteCustomer",value);
                }
                this.saveButtonClicked=true;
                setTimeout(()=>{
                    this.saveButtonClicked=false
                },800);
               // alert("Müşteri Başarılı Bir Şekilde Silindi");
            },

            updateCustomer(value){
            this.$store.state.customerId=value;

             router.replace("/update-customer")
            }
        },

        computed:{
           ...mapGetters([
               "getCustomers",
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