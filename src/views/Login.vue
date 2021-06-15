<template>
  <div class="c-app flex-row align-items-center">
    <div class="col-6 mx-auto d-flex login align-center elevation-5 pa-0 mt-8" >
      <div class="col-6 d-flex align-center" align="center" justify="center">
        <v-btn
          align="center"
          justify="center"
          class="success iranSansBold mx-auto"
          @click="$oidc.signIn()"
          >اتصال به آیدال</v-btn
        >
      </div>
      <div class="col-6 indigo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
<style >
  .login,.login .col-6{
    min-height: 200px;
  }
</style>
