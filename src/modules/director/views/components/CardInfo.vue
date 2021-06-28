<template>
  <div class="small-box shadow" :class="bg">
    <div class="inner">
      <h3>{{number}}</h3>

      <p>{{description}}</p>
    </div>
    <div class="icon">
      <i :class="icon"></i>
    </div>
    <a href="#" class="small-box-footer"></a>
  </div>
</template>

<script>
  export default {
    name: 'CardInfo',
    props: ['number', 'description', 'icon', 'bg'],
  };
</script>

<style scoped>
  .small-box {
    border-radius: 0.25rem;
    box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
    display: block;
    margin-bottom: 20px;
    position: relative;
    color: white;
  }
  .small-box > .inner {
    padding: 10px;
  }
  .small-box > .small-box-footer {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.8);
    display: block;
    padding: 3px 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    z-index: 10;
    min-height: 25px;
  }
  .small-box .icon {
    color: rgba(0, 0, 0, 0.15);
    z-index: 0;
  }

  .small-box .icon > i {
    font-size: 70px;
    top: 20px;
    position: absolute;
    right: 15px;
    transition: -webkit-transform 0.3s linear;
    transition: transform 0.3s linear;
    transition: transform 0.3s linear, -webkit-transform 0.3s linear;
  }
</style>