<template>
  <div>
    <b-container class="profile-col">
      <br>
      <div class="text-center" v-show="welcomePage">
        <h1>Welcome to your page</h1>
        <br>
      </div>
      <div class="text-center" v-show="welcomePage">
        <p>Your Profile</p>
        <p>{{this.$route.params.Email}}</p>
        <b-button variant="success" @click="getByManagerId()">Details</b-button>
        <b-button variant="warning" @click="Logout()">Logout</b-button>
      </div>
    </b-container>
    <b-container>
      <!-- <div v-show="showTable">
        <table class="table">
          <thead v-show="showTable">
            <tr>
              <th>Project Id</th>
              <th>Project Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="value in arr" :key="value.projectId">
              <td>{{value.projectId}}</td>
              <td>{{value.projectName}}</td>
              <td>
                <b-button variant="warning" @click="getByManagerId(value.projectId)">Manager Details</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>-->
    </b-container>
    <b-container>
      <div v-show="showManagerTable">
        <table class="table">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>ManagerId</th>
              <th>Manager Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in arr" :key="item.ManagerId">
              <td>{{item.projectId}}</td>
              <td>{{item.ManagerId}}</td>
              <td>{{item.Name}}</td>
              <td>{{item.Email}}</td>
              <td>
                <b-button variant="info" @click="getByEmployeeId(item.ManagerId)">EmployeeDetails</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-container>
    <b-container>
      <div v-show="showEmployeeTable">
        <table class="table">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>MobileNo</th>
              <th>projectId</th>
              <th>ManagerId</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in arr" :key="form.ManagerId">
              <td>{{form.EmployeeId}}</td>
              <td>{{form.Name}}</td>
              <td>{{form.Role}}</td>
              <td>{{form.MobileNo}}</td>
              <td>{{form.projectId}}</td>
              <td>{{form.ManagerId}}</td>
            </tr>
          </tbody>
        </table>
        <b-button variant="success" style="float: right" @click="pageshowfn()">Back</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      arr: [],
      welcomePage: true,
      showTable: false,
      showManagerTable: false,
      showEmployeeTable: false,
      value: {
        projectId: "",
        projectName: "",
        Name: "",
        ManagerId: ""
      },
      item: {
        projectId: "",
        projectName: "",
        Name: "",
        ManagerId: ""
      },
      form: {
        ManagerId: "",
        EmpId: "",
        EmployeeName: "",
        Role: "",
        EmployeeEmail: "",
        PreOrganization: ""
      }
    };
  },

  methods: {
    getByManagerId: function() {
      this.welcomePage = false;
      this.showTable = false;
      this.showManagerTable = true;
      this.showEmployeeTable = false;
      const Email = this.$route.params.Email;
      axios({
        method: "GET",
        url: `http://localhost:5000/api/getManager?Email=${Email}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(
        response => {
          console.log(response);
          this.arr = response.data;
        },
        error => {
          this.changePass = false;
          console.log(error.response.data.message);
          alert(error.response.data.message);
          this.$router.go(-1);
        }
      );
    },
    getByEmployeeId: function(ManagerId) {
      console.log(ManagerId)
      this.welcomePage = false;
      this.showTable = false;
      this.showManagerTable = false;
      this.showEmployeeTable = true;
      axios({
        method: "GET",
        url: `http://localhost:5000/api/getManagerId?ManagerId=${ManagerId}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(
        response => {
          console.log(response);
          this.arr = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    Logout: function() {
      //this.$router.go();
      this.$store.commit("removeToken");
      this.$router.go(-1);
    },
    pageshowfn: function() {
      this.welcomePage = true;
      this.showTable = false;
      this.showManagerTable = false;
      this.showEmployeeTable = false;
    }
  }
};
</script>

<style>
</style>