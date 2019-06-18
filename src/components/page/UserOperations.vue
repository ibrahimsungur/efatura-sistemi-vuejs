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
                    <h3 class="text-center mt-3">Kullanıcı İşlemleri</h3>
                    <hr>
                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="name">Adı</label>
                            <input type="text" class="form-control" id="name" placeholder="Adınızı Giriniz">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email Giriniz">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="surname">Soyadı</label>
                            <input type="text" class="form-control" id="surname" placeholder="Soyadınız Giriniz">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="phone">Telefon </label>
                            <input type="text" class="form-control" id="phone" placeholder="Telefon Numarası Giriniz">
                        </div>


                        <div class="form-group col-md-6">
                            <label for="customerStates">Müşteri Durumu</label>
                            <select id="customerStates" class="form-control">
                                <option disabled>Durumu Seçiniz</option>
                                <option>Aktif</option>
                            </select>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="input">Yetki Listesi</label>
                            <select id="input" class="form-control">
                                <option disabled>Yetkiyi Seçiniz</option>
                                <option>Fatura Oluşturma</option>
                            </select>
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
                    <button type="submit" class="btn btn-primary" @click.prevent="saveUser">Kaydet</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
    export default {

        methods:{
           saveUser(){

           }
        }
    }
</script>

<style scoped>

</style>