<template>
  <div class="card shadow mt-2" style="border-radius: 20px">
    <div class="card-body">
      <img :src="getImgUrl(icon)" class="card-img-top" />
      <h5 class="card-title mt-2">{{name}}</h5>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: { type: String, required: true },
      name: { type: String, required: true },
    },
    methods: {
      getImgUrl(pic) {
        return require('../../../assets/' + pic);
      },
    },
  };
</script>

<style scoped>
  .card-img-top {
    width: 100px;
    max-width: 100%;
  }
</style>