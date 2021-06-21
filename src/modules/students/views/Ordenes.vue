<template>
  <div>
    <Titulos titulo="Ordenes de pruebas" subtitulo="En esta seccion podras observar las ordenes que se te han solicitado que realices"/>
    <div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Resultado</th>
            <th scope="col">Fecha de deteccion</th>
            <th scope="col">Tipo de prueba</th>
            <th scope="col">Medico</th>
            <th scope="col">Descargar orden</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="item.resultado === 'POSITIVO' ? 'table-danger' : 'table-success'" v-for="(item, index) in ordenes" :key="index">
            <td scope="row" v-if="item.resultado !== null">{{item.resultado}}</td>
            <td v-else>Sin resultado</td>
            <td>{{moment(item.fecha_deteccion).calendar()}}</td>
            <td>{{item.tipo.descripcion}}</td>
            <td>{{item.medico.nombre}}</td>
            <td>
              <a class="badge badge-info" :href="`http://localhost:3000/ordenes/pdf/${item.orden_id}?token=${token}`" target="_blank">Descargar Orden <i class="fas fa-cloud-download-alt"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center">
        <b-spinner v-if="cargando" variant="danger" type="grow" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Titulos from '../../../components/Titulos.vue'
import moment from 'moment';
export default {
  data(){
    return {
      ordenes: [],
      cargando: true,
      moment: moment,
      
    }
  },
  components: {
    Titulos
  },
  created() {
    this.obtenerOrdenes();
  },
  methods: {
    obtenerOrdenes(){
      let config = {headers: {'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/ordenes/usuario/${this.usuario.usuario_id}`,config)
        .then((res) => {
          console.log(res);
          this.ordenes = res.data
          this.cargando = false
        }).catch((err) => {
          console.log(err.response);
          this.cargando = false
        });
    }
  },
  computed: {
    ...mapState(['usuario','token'])
  }
}
</script>

<style>

</style>