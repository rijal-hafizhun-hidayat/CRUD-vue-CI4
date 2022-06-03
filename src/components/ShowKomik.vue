<template> 
    <div class="container mt-5">
        <loading 
            v-model:active="isLoading"
            :can-cancel="true"
            :is-full-page="fullPage"/>
        <div class="row justify-content-center">
            <div class="col-sm-8">
                <div class="d-flex justify-content-between">
                    <router-link :to="{name: 'komik.create'}" class="btn btn-primary">Add</router-link>
                    <input type="text" class="form-control" v-model="search" placeholder="pencarian">
                </div>
                
                <!-- <button class="btn btn-primary"> Add</button> -->
                <div class="card mt-5">
                    <div class="card-header">
                        Data Komik
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>nama</th>
                                    <th>penerbit</th>
                                    <th>penulis</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="komik in comic" :key="komik.id">
                                    <td>{{ komik.nama }}</td>
                                    <td>{{ komik.penerbit }}</td>
                                    <td>{{ komik.penulis }}</td>
                                    <div class="btn-group">
                                        <button class="btn btn-danger" @click="deleteComic(komik.id)">Hapus</button>
                                        <router-link :to="{name: 'komik.edit', params: {id: komik.id}}" class="btn btn-warning">Edit</router-link>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    name: "Show",
    data(){
        return{
            comic: [],
            search: null,
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    created(){
        this.getComic();
        this.filter();
    },
    methods:{
        async getComic(){
            try {
                this.isLoading = true;
                const response = await axios.get('http://localhost:8080/komik');
                this.comic = response.data;
                setTimeout(() => {
                    this.isLoading = false
                }, 1000)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteComic(id){
            try {
                this.isLoading = true;
                await axios.delete(`http://localhost:8080/komik/${id}`);
                this.getComic();
                setTimeout(() =>{
                    this.isLoading = false
                }, 1000)
            } catch (error) {
                console.log(error);
            }
        },
        filter(){
            if(this.search){

            }

        }
    },
};
</script>