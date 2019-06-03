<template>
  <div>
    <b-container>
      <br>
      <br>
      <br>
      <div v-show="OTPhide" class="text-center">
        <b-row>
          <b-col sm="3">
            <label for="input-default">Enter OTP:</label>
          </b-col>
          <b-col sm="5">
            <b-input v-model="OTPvalue" placeholder="Enter OTP"></b-input>
          </b-col>
        </b-row>
        <br>
        <b-button styl="float:center" variant="primary" @click="OTPCheck()">Submit</b-button>
      </div>
    </b-container>
    <div v-show="hideall">
      <div class="text-center">
        <h2>LOGIN</h2>
      </div>
      <b-container>
        <div class="text-center">
          <b-row class="my-4" v-show="inputhide">
            <b-col sm="4">
              <label for="input-default">Email:</label>
            </b-col>
            <b-col sm="5">
              <b-form-input
                id="Email"
                v-validate="'required'"
                v-model="item.Email"
                type="email"
                name="Email"
                required
                placeholder="Enter email"
              ></b-form-input>
              <span>{{ errors.first('Email') }}</span>
            </b-col>
          </b-row>
          <b-row class="my-1">
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
          </b-row>
        </div>
        <br>
        <div class="text-center">
          <b-row>
            <b-col>
              <b-button
                variant="success"
                v-show="inputhide"
                @click="loginData()"
                style="float:center"
              >Signup</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button
                v-show="inputhide"
                variant="info"
                @click="forgetPassword()"
                style="float:center"
              >forget Password</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button
                v-b-modal.modal-scoped
                variant="primary"
                v-show="inputhide"
                style="float:center"
              >Register</b-button>
            </b-col>
          </b-row>
        </div>
        <div class="text-center" v-show="passSubmit">
          <b-row>
            <b-col>
              <b-button variant="info" @click="updatepassword()" style="float:center">Submit</b-button>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <template>
        <b-modal id="modal-scoped">
          <p>Registration Form</p>
          <template slot="modal-footer">
            <!-- <template> -->
            <b-container class="w-50.5">
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default">Name:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="name"
                    v-validate="'alpha|min:3|required'"
                    v-model="form.Name"
                    name="Name"
                    required
                    placeholder="Enter name"
                  ></b-form-input>
                  <span>{{ errors.first('Name') }}</span>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default" description="We'll never share your email.">Email:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="Email"
                    v-validate="'required'"
                    v-model="form.Email"
                    type="email"
                    name="Email"
                    required
                    placeholder="Email"
                  ></b-form-input>
                  <span>{{ errors.first('Email') }}</span>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default">MobileNo:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="MobileNo"
                    v-validate="'digits:10|required'"
                    v-model="form.MobileNo"
                    type="number"
                    name="MobileNo"
                    required
                    placeholder="MobileNo"
                  ></b-form-input>
                  <span>{{ errors.first('MobileNo') }}</span>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default">Age:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="Age"
                    v-validate="'numeric|required'"
                    v-model="form.Age"
                    name="Age"
                    required
                    placeholder="Age"
                  ></b-form-input>
                  <span>{{ errors.first('Age') }}</span>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default">Address:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="Address"
                    v-validate="'alpha|required'"
                    v-model="form.Address"
                    name="Address"
                    required
                    placeholder="Address"
                  ></b-form-input>
                  <span>{{ errors.first('Address') }}</span>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-default">Password:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input
                    id="Password"
                    v-validate="'required'"
                    ref="Password"
                    v-model="form.Password"
                    type="password"
                    name="Password"
                    required
                    placeholder="Password"
                  ></b-form-input>
                  <span>{{ errors.first('Password') }}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button size="sm" variant="success" @click="registerData()">OK</b-button>
                  <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
                </b-col>
              </b-row>
            </b-container>
          </template>
          <!-- </template> -->
        </b-modal>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { constants } from "crypto";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      //arr: [],
      item: {
        Email: "",
        Password: "",
        ComfirmPassword: "",
        token: ""
      },
      form: {
        Name: "",
        Email: "",
        MobileNo: "",
        Age: "",
        Address: "",
        Password: ""
      },
      inputhide: true,
      cnfmpass: false,
      hideall: true,
      OTPhide: false,
      OTPvalue: "",
      passSubmit: false
      // LoggedIn: false
    };
  },
  mounted: function() {
    this.token = localStorage.getItem("token");
    this.$store.commit("setToken", this.token);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    loginData: function() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            //alert("error Enter the All Details");
            return;
          }
        })
        .catch(() => {});
      const data = {
        Email: this.item.Email,
        Password: this.item.Password
      };
      console.log(data);
      if (data.Email === "") {
        alert("Enter Email and Password");
      } else {
        axios({
          method: "POST",
          url: "http://localhost:5000/api/login",
          data
        })
          .then(response => {
            // this.arr.push(response);
            console.log("result:" + response.data.token);
            const token = response.data.token;
            this.$store.commit("setToken", token);
            alert("logged in successfully");
            this.$router.push(`/viewList/${data.Email}`);
          })
          .catch(e => {
            console.log(e);
            if (e.response.status == 500) {
              alert(e.response.data);
            } else {
              alert(e.response.data);
            }
          });
        //);
      }
    },
    // addData() {
    //   const payload = {
    //     Email: this.item.Email,
    //     Password: this.item.Password
    //   };
    //   //console.log("adddata>>>>>" + payload);
    //   this.$store.dispatch("postData", payload);
    //   console.log(this.$store.state);
    //   console.log(this.$store.state.token.length);
    //   console.log(this.$store.state.resErr.length);
    //   if (this.$store.state.token == "" || !this.$store.state.resErr == "") {
    //     alert("empty");
    //   } else {
    //     alert("correct");
    //   }
    //   //if(this.$store.state.err)
    //   // this.$router.push(`/viewList/${payload.Email}`);
    // },
    registerData: function() {
      this.$bvModal.hide("modal-scoped");
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            //alert("error Enter the All Details");
            return;
          }
        })
        .catch(() => {});
      const data = {
        Name: this.form.Name,
        Email: this.form.Email,
        MobileNo: this.form.MobileNo,
        Age: this.form.Age,
        Address: this.form.Address,
        Password: this.form.Password
      };
      axios({
        method: "POST",
        url: "http://localhost:5000/api/register",
        data,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          this.arr.push(response);
          alert("registered successfully");
          this.$router.go();
        })
        .catch(e => {
          console.log(e.response);
          alert(e.response.data.Error);
        });
    },
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
    },
    showPassword: function() {
      var x = document.getElementById("Password");
      var y = document.getElementById("ConfirmPassword");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    forgetPassword: function() {
      console.log("formate");
      return axios
        .get(
          `http://localhost:5000/api/forgetPassword?Email=${this.item.Email}`
        )
        .then(response => {
          console.log(response);
          this.hideall = false;
          this.OTPhide = true;
          this.inputhide = false;
          this.cnfmpass = true;
        })
        .catch(err => {
          alert("Email Id Not Found");
        });
    },
    OTPCheck: function() {
      return axios
        .get(`http://localhost:5000/api/getOTP?OTPvl=${this.OTPvalue}`)
        .then(response => {
          console.log(response);
          this.hideall = true;
          this.OTPhide = false;
          this.inputhide = false;
          this.cnfmpass = true;
          this.passSubmit = true;
        })
        .catch(err => {
          console.log(err);
          alert("Enter Correct OTP");
        });
    },
    updatepassword: function() {
      if (this.item.Password === this.item.ComfirmPassword) {
        const data = {
          Password: this.item.Password
        };
        return axios
          .put(
            `http://localhost:5000/api/putpass?Email=${this.item.Email}`,
            data
          )
          .then(response => {
            console.log(response);
            this.$router.go();
          })
          .catch(err => {
            console.log(err);
          });
      }else{
        alert("the Password not match")
      }
    }
  }
};
</script>

<style scoped>
</style>