<template>
  <div class="recomendacion col-md-4">
    <div class="card">
      <div class="card-img-top mt-3">
        <img :src="getImgUrl(icon)" width="50%" />
      </div>
      <div class="card-body">
        <p>{{recomendacion}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: { type: String, required: true },
      recomendacion: { type: String, required: true },
    },
    methods: {
      getImgUrl(pic) {
        return require('../../../assets/' + pic);
      },
    },
  };
</script>

<style scoped>
  .recomendacion .card {
    min-height: 15rem;
    background-color: #17a2b8;
    min-height: 20rem;
    color: white;
  }
</style>