<template>
    <div>
            <appHeader></appHeader>
            <router-view></router-view>
            <appFooter></appFooter>

    </div>
</template>

<script>
    import Header from './components/shared/Header'
    import Footer from './components/shared/Footer'
    import Login from './components/page/user/Login'

    export default {
        components: {
            appHeader: Header,
            appFooter: Footer,
            appLogin:Login
        },
        created() {
            this.$store.dispatch("initApp");
           // this.$store.dispatch("initAppInvoice")
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
