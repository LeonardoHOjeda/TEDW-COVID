<template>
  <div class="mt-5">
    <footer class="page-footer font-small bg-secondary text-white pt-4">
      <!-- Copyright -->
      <div class="bg-dark text-white text-center py-3">© Antonio Garcia Cubas
        <a href="#">Link</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  footer {
  position: relative;
  /* negative value of footer height*/
  bottom: 0;
  height: 180px;
  clear: both;
  background-color: red;
  }

  .footer-link {
    color: white;
  }

  .footer-link:hover{
    color: rgb(6, 210, 6);
  }
</style>