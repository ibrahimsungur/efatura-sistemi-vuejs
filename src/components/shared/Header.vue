<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <router-link tag="li" to="/customer" class="nav-item" exact active-class="active">
                    <a class="nav-link">Müşteri İşlemleri</a>
                </router-link>

                <router-link tag="li" to="/create-user" class="nav-item" exact active-class="active">
                    <a class="nav-link">Kullanıcı İşlemleri</a>
                </router-link>


                <router-link tag="li" to="/add-invoice" class="nav-item" exact active-class="active">
                    <a class="nav-link">Fatura İşlemleri</a>
                </router-link>

                <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
                    <li class="nav-item">
                        <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
                    </li>
                </ul>

            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        methods:{
            logout(){
                this.$store.dispatch("logout")
            }
        },
        computed:{
            logoutClass() {
                return {
                    'd-none': !this.$store.getters.isAuthenticated
                }
            }
        }
    }
</script>

<style scoped>
 .my-2{
     margin-left: 1000px;
 }
</style>
