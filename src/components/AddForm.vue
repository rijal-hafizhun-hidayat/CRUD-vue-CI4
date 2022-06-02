<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-sm-8">
                <div v-if="errors.length">
                    <div v-for="error in errors" :key="error.index" class="alert alert-danger mt-1" role="alert">
                        {{ error }}
                    </div>
                </div>
                <div class="card mt-5">
                    <div class="card-header">
                        Tambah Komik
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="createKomik">
                            <div class="row">
                                <label class="col-sm-2 col-form-label">nama komik:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="add.nama" class="form-control" id="inputKomik">
                                </div> 
                            </div>
                            <div class="row mt-3">
                                <label class="col-sm-2 col-form-label">nama penerbit:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="add.penerbit" class="form-control" id="inputPenerbit">
                                </div> 
                            </div>
                            <div class="row mt-3">
                                <label class="col-sm-2 col-form-label">nama penulis:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="add.penulis" class="form-control" id="inputPenulis">
                                </div> 
                            </div>
                            <button class="btn btn-primary mt-3">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "AddForm",
    data(){
        return{
            add: {},
            errors: []
        };
    },
    methods:{
        createKomik(e){
            if(this.add.nama && this.add.penerbit && this.add.penulis){
                axios.post('http://localhost:8080/komik', this.add)
                .then(() =>{
                    this.$router.push({
                        name: 'komik.index'
                    });
                }).catch(error => {
                    console.log(error.response);
                });
            }

            this.errors = [];

            if(!this.add.nama){
                this.errors.push('masukkan nama komik');
            }
            else if(!this.add.penerbit){
                this.errors.push('masukkan nama penerbit');
            }
            else if(!this.add.penulis){
                this.errors.push('masukkan nama penulis');
            }
            // try {
            //     await axios.post('http://localhost:8080/komik', this.add);
            //     this.$router.push({
            //         name: 'komik.index'
            //     });
            // } catch (error) {
            //     console.log(error.response);
            // }

            e.preventDefault();
        }
    }
}
</script>