<template>
  <div>
    <Titulos 
      titulo="Historial de recetas"
      subtitulo="En esta seccion podras imprimir las recetas medicas de las consultas que ya fueron atendidas"
      />
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">ID CITA</th>
            <th scope="col">Last</th>
            <th scope="col">DESCARGAR RECETA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Otto</td>
            <td><a href="">Descargar </a><i class="far fa-file-pdf"></i></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Thornton</td>
            <td><a href="">Descargar </a><i class="far fa-file-pdf"></i></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>the Bird</td>
            <td><a href="">Descargar </a><i class="far fa-file-pdf"></i></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
export default {
  components: {
    Titulos
  }
}
</script>

<style>

</style>