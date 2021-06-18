<template>
  <div class="mt-5">
    <footer class="page-footer font-small bg-secondary text-white pt-4">
      <div class="container-fluid text-center text-md-left">
        <div class="row">
          <div class="col-md-6 mt-md-0 mt-3"> <!--Grid column-->
          <div class="text-center">
            <h4 class="text-uppercase font-weight-bold text-center">Obtener este proyecto</h4>
            <h5><i class="fab fa-github"></i><a class="footer-link" href="https://github.com/LeonardoHOjeda/TEDW-COVID" target="_blank"> Repositorio FrontEnd</a></h5>
            <h5><i class="fab fa-github"></i><a class="footer-link" href="https://github.com/FernandoAcTr/covid-itc" target="_blank"> Repositorio Backend</a></h5>
            <h5><i class="fas fa-globe"></i><a class="footer-link" href="https://covid-itc.netlify.app/" target="_blank"> Proyecto en Netlify</a></h5>
          </div>
          </div>
          <hr class="clearfix w-100 d-md-none pb-3">
          <div class="col-md-6 mb-md-0 mb-3">
            <!-- Content -->
            <h5 class="text-uppercase font-weight-bold text-center">Footer text 2</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio deserunt fuga perferendis modi earum
              commodi aperiam temporibus quod nulla nesciunt aliquid debitis ullam omnis quos ipsam, aspernatur id
              excepturi hic.</p>
          </div>
        </div>
      </div>
      <!-- Copyright -->
      <div class="bg-dark text-white text-center py-3">© 2021 Copyright:
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