<template>
  <div class="main">
    <div v-show="userhide">
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
              <b-button style="float:left" variant="info" @click="EdtData(),value=x">Edit</b-button>
              <b-button style="float:left" variant="dark" @click="hideuser()">Change Password</b-button>
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
    <div v-show="changepassword">
      <b-container>
        <br>
        <br>
        <div class="text-center">
          <b-row>
            <b-col sm="3">
              <label>Password:</label>
            </b-col>
            <b-col sm="7">
              <b-input
                :type="'password'"
                name="Password"
                v-model="Password"
                v-validate="'required'"
                ref="Password"
                placeholder="Enter password"
              ></b-input>
              <span>{{ errors.first('Password') }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <label>ConfirmPassword:</label>
            </b-col>
            <b-col sm="7">
              <b-input
                :type="'password'"
                name="ConfirmPassword"
                ref="ConfirmPassword"
                id="ConfirmPassword"
                v-model="ConfirmPassword"
                v-validate="'required|confirmed:Password'"
                placeholder="Enter Confirmpassword"
              ></b-input>
              <span>{{ errors.first('ConfirmPassword') }}</span>
            </b-col>
          </b-row>
          <!-- <b-row class="my-1">
            <b-col sm="4">
              <label for="input-default">Password:</label>
            </b-col>
            <b-col sm="5">
              <b-form-input
                :type="'password'"
                id="Password"
                v-validate="'required'"
                ref="Password"
                v-model="item.Password"
                name="Password"
                required
                placeholder="Enter your Password"
              ></b-form-input>
              <span>{{ errors.first('Password') }}</span>
            </b-col>
            <b-col sm="0">
              <b-button variant="info" @click="showPassword()">Show</b-button>
            </b-col>
          </b-row>
          <b-row v-show="cnfmpass">
            <b-col sm="4">
              <label for="input-default">Confirm Password:</label>
            </b-col>
            <b-col sm="5">
              <b-form-input
                :type="'password'"
                id="ConfirmPassword"
                v-validate="'required|confirmed:Password'"
                ref="ConfirmPassword"
                v-model="item.ComfirmPassword"
                name="ConfirmPassword"
                required
                placeholder="Enter your ConfirmPassword"
              ></b-form-input>
              <span>{{ errors.first('ConfirmPassword') }}</span>
            </b-col>
            <b-col sm="0">
              <b-button variant="info" v-show="inputhide" @click="showPassword()">Show</b-button>
            </b-col>
          </b-row>-->
          <br>
          <div class="text-center">
            <b-button style="float:center" variant="primary" @click="changepasswordfn()">Submit</b-button>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Store } from "vuex";
import Vue from "vue";

Vue.use("vuex");
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
      },
      userhide: true,
      changepassword: false,
      Password: "",
      ConfirmPassword: ""
    };
  },
  methods: {
    getData: function() {
      const Email = this.$route.params.Email;
      console.log("get token  " + this.$store.state.token);
      axios({
        method: "GET",
        url: `http://localhost:5000/api/get?Email=${Email}`,
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }).then(
        response => {
          console.log(response);
          console.log(this.$store.state.token);
          this.arr = response.data;
          this.edtbtn = true;
        },
        err => {
          //console.log(err.response.data.message);
          alert(err.response.data.message);
          this.$router.go(-1);
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
      console.log(Email);
      console.log(data);
      console.log("put token   :" + this.$store.state.token);
      axios({
        method: "PUT",
        url: `http://localhost:5000/api/put?Email=${Email}`,
        data,
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      })
        // .put(`http://localhost:5000/api/put?Email=${Email}`, data, {
        //   Authorization: `Bearer ${this.$store.state.token}`
        // })
        .then(response => {
          console.log("result  :" + response);
          alert("Update successfully");
          // this.$router.go();
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
    logout: function() {
      this.$router.go(-1);
      this.$store.commit("removeToken");
    },
    changepasswordfn: function() {
      if (this.Password === this.ConfirmPassword) {
        const data = {
          Password: this.Password
        };
        axios({
          method: "PUT",
          url: `http://localhost:5000/api/changepassword?Email=${
            this.$route.params.Email
          }`,
          data,
          headers: { Authorization: `Bearer ${this.$store.state.token}` }
        })
          .then(response => {
            console.log(response);
            this.userhide = true;
            this.changepassword = false;
            this.$store.commit("removeToken");
            this.$router.go();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("password is not match");
      }
    },
    hideuser: function() {
      this.userhide = false;
      this.changepassword = true;
    }
  }
};
</script>

<style>
</style>
