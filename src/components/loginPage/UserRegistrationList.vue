<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mb-5 card mt-5 shadow">
                <div class="card-body">
                    <h3>Kullanıcı Listesi</h3>
                    <hr>
                    <table class="table table-hover table-striped table-bordered" >
                        <thead>
                        <th>id</th>
                        <th>Kullanıcı Adı</th>
                        <th>Password</th>
                        <th>Kullanıcı Pasifleme</th>
                        </thead>
                        <tbody>
                        <tr >
                            <td class="align-middle text-center"><span class="badge badge-info">  </span></td>
                            <td class="align-middle text-center">  </td>
                            <td class="align-middle text-center"> </td>
                            <td style="width: 120px;"></td>
                            <td class="align-middle"></td>
                            <td><button class="btn btn-success" >Delete</button></td>
                            <hr>

                        </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-warning" >
                        <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
                        <br>
                        <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>

<style scoped>

</style>