<template>
  <div class="mt-5">
    <footer class="page-footer">
      <p>TECNM en Celaya ©</p>
      <p>Antonio García Cubas 600, Fovissste, 38010 Celaya, Gto.</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style scoped>
  .page-footer {
    text-align: center;
    padding: 2rem 0 0.5rem 0;
    background-color: whitesmoke;
  }

  .page-footer p {
    margin: 0;
  }

  .footer-link:hover {
    color: rgb(6, 210, 6);
  }
</style>