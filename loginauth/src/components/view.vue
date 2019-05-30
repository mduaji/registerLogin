<template>
  <div class="main">
    <b-container class="profile-col">
      <div class="text-right">
        <p>Profile</p>
        <p>{{this.$route.params.Email}}</p>
        <b-button variant="success" @click="getData()">Details</b-button>
        <b-button variant="primary" @click="logout()">logout</b-button>
      </div>
      <div class="text-center">
        <h1>Welcome</h1>
      </div>
    </b-container>
    <b-container class="table-row-col">
      <div>
        <div v-for="x in arr" :key="x.Email">
          <b-row>
            <b-button style="float:left" varieny="info" @click="EdtData(),value=x">Edit</b-button>
          </b-row>
          <b-row>
            <ul>
              <li v-show="lableShow">Name :{{x.Name}}</li>
              <li v-show="inputShow">
                Name :
                <input
                  v-model="value.Name"
                  type="text"
                  class="form-control"
                  placeholder="Enter Name"
                >
              </li>
            </ul>
          </b-row>
          <!-- <b-row>
            <ul>
              <li v-show="lableShow">Email :{{x.Email}}</li>
              <li v-show="inputShow">
                Email :
                <input
                  v-model="value.Email"
                  type="text"
                  class="form-control"
                  placeholder="Enter Email"
                >
              </li>
            </ul>
          </b-row>-->
          <b-row>
            <ul>
              <li v-show="lableShow">Mobile No:{{x.MobileNo}}</li>
              <li v-show="inputShow">
                Mobile No:
                <input
                  v-model="value.MobileNo"
                  type="text"
                  class="form-control"
                  placeholder="Enter MobileNo"
                >
              </li>
            </ul>
          </b-row>
          <b-row>
            <ul>
              <li v-show="lableShow">Age :{{x.Age}}</li>
              <li v-show="inputShow">
                Age :
                <input
                  v-model="value.Age"
                  type="text"
                  class="form-control"
                  placeholder="Enter Age"
                >
              </li>
            </ul>
          </b-row>
          <b-row>
            <ul>
              <li v-show="lableShow">Address :{{x.Address}}</li>
              <li v-show="inputShow">
                Address :
                <input
                  v-model="value.Address"
                  type="text"
                  class="form-control"
                  placeholder="Enter Address"
                >
              </li>
            </ul>
          </b-row>
        </div>
        <b-button v-show="savebtn" varieny="primary" @click="putData()">Save</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      savebtn: false,
      inputShow: false,
      lableShow: true,
      edtbtn: false,
      value: {
        Name: "",
        Email: "",
        MobileNo: "",
        Age: "",
        Address: ""
      }
    };
  },
  methods: {
    getData: function() {
      const Email = this.$route.params.Email;
      axios({
        method: "GET",
        url: `http://localhost:5000/api/get?Email=${Email}`
      }).then(
        response => {
          console.log(response);
          this.arr = response.data;
          this.edtbtn = true;
        },
        error => {
          console.log(error);
        }
      );
    },
    putData: function() {
      var Email = this.value.Email;
      var data = {
        Name: this.value.Name,
        MobileNo: this.value.MobileNo,
        Age: this.value.Age,
        Address: this.value.Address
      };
      console.log(data);
      return axios
        .put(
          `http://localhost:5000/api/put?Email=${Email}`,
          data
          //   headers: {
          //     "Content-type": "application/json"
          //   }
        )
        .then(response => {
          console.log("result  :" + response);
          alert("Update successfully");
          this.$router.go();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    EdtData: function() {
      this.savebtn = true;
      this.inputShow = true;
      this.lableShow = false;
    },
    logout:function(){
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
