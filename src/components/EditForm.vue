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
                        Edit Komik
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="updateKomikById">
                            <div class="row">
                                <label class="col-sm-2 col-form-label">nama komik:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="nama" class="form-control" id="inputKomik">
                                </div> 
                            </div>
                            <div class="row mt-3">
                                <label class="col-sm-2 col-form-label">nama penerbit:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="penerbit" class="form-control" id="inputPenerbit">
                                </div> 
                            </div>
                            <div class="row mt-3">
                                <label class="col-sm-2 col-form-label">nama penulis:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="penulis" class="form-control" id="inputPenulis">
                                </div> 
                            </div>
                            <button class="btn btn-primary mt-3">Ubah</button>
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
    name: "EditForm",
    data(){
        return{
            nama: null,
            penerbit: null,
            penulis: null,
            errors: []
        };
    },
    created(){
        this.getKomikById();
    },
    methods:{
        async getKomikById(){
            try {
                const response = await axios.get(`http://localhost:8080/komik/${this.$route.params.id}`);
                (this.nama = response.data.nama),
                (this.penerbit = response.data.penerbit),
                (this.penulis = response.data.penulis),
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            // axios.get(`http://localhost:8080/komik/${this.$route.params.id}`)
            // .then((response) => {
            //     nama = response.data.nama,
            //     penerbit = response.data.penerbit,
            //     penulis = response.data.penulis,
            //     console.log(nama);
            //     // console.log(this.edit);
            // }).catch(error => {
            //     console.log(error.response)
            // });
        },

        async updateKomikById(){
            if(this.nama && this.penerbit && this.penulis){
                try {
                    await axios.put(`http://localhost:8080/komik/${this.$route.params.id}`,{
                        nama: this.nama,
                        penerbit: this.penerbit,
                        penulis: this.penulis,
                    });
                    this.$router.push({
                        name: 'komik.index'
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            // if(this.add.nama && this.add.penerbit && this.add.penulis){
            //     axios.put(`http://localhost:8080/komik${this.$route.params.id}`, this.add)
            //     .then(() =>{
            //         this.$router.push({
            //             name: 'komik.index'
            //         });
            //     }).catch(error => {
            //         console.log(error.response);
            //     });
            // }

            this.errors = [];

            if(!this.penulis){
                this.errors.push('masukkan nama komik');
            }
            else if(!this.penerbit){
                this.errors.push('masukkan nama penerbit');
            }
            else if(!this.penulis){
                this.errors.push('masukkan nama penulis');
            }
        }
    }
    
    
}
</script>