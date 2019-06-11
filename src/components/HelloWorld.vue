<template>
  <b-container>
    <div class="text-center">
      <h1>DashBoard</h1>
      <b-button @click="pageredirect()">Login</b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  methods: {
    pageredirect: function() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
