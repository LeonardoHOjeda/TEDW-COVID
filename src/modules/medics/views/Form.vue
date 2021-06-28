<template>
  <div>
    <Titulos
      titulo="Respuestas Formulario"
      subtitulo="Aqui podras observar las respuestas de cada formulario que se ha respondido"
    />
    <div>
      <b-form-checkbox size="lg" v-model="checked" name="check-button" switch>
        <b class="badge badge-dark">Filtrar por sintomas:</b>
        <span v-if="checked" :class="checked ? 'badge badge-success' : ''">Si</span>
        <span v-else :class="!checked ? 'badge badge-danger' : ''">No</span>
      </b-form-checkbox>
    </div>
    <div>
      <p>
        Filtrado por:
        <b>{{sortBy}}</b>
      </p>
    </div>
    <b-table
      :busy="cargando"
      :sort-by.sync="sortBy"
      striped
      hover
      :items="items"
      :fields="fields"
      class="text-center"
      responsive="sm"
    >
      <template v-slot:cell(acciones)="data">
        <b-button variant="outline-info" size="sm" :to="`./Form/${data.item.id_encuesta}`">
          Ver respuestas
          <i class="far fa-eye"></i>
        </b-button>
        <!-- <button class="btn btn-warning btn-sm">Ver respuestas <i class="far fa-eye"></i></button> -->
      </template>
      <template #table-busy>
        <div class="text-center text-info my-2">
          <b-spinner :variant="variant" :key="variant" class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Titulos from '../../../components/Titulos';
  import moment from 'moment';
  export default {
    components: {
      Titulos,
    },
    data() {
      return {
        checked: false,
        variant: 'info',
        cargando: true,
        sortBy: 'otros_sintomas',
        moment: moment,
        fields: [
          { key: 'id_encuesta', label: 'ID', sortable: false },
          { key: 'usuario', sortable: false },
          { key: 'fecha_aplicacion', sortable: true },
          { key: 'otros_sintomas', label: 'Sintomas', sortable: false },
          { key: 'acciones' },
        ],
        items: [],
      };
    },
    computed: {
      ...mapState(['usuario', 'token']),
    },
    created() {
      this.listarRespuestas();
    },
    watch: {
      checked: function (newVal) {
        this.items = [];
        this.cargando = true;
        if (!newVal) {
          this.listarRespuestas();
        } else {
          this.filtroSoloSintomas();
        }
      },
    },
    methods: {
      listarRespuestas() {
        let config = { headers: { Authorization: `Bearer ${this.token}` } };
        this.axios
          .get('/encuesta', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.items.push({
                id_encuesta: res.data[i].encuesta_id,
                fecha_aplicacion: moment(res.data[i].fecha_aplicacion).calendar(),
                otros_sintomas: res.data[i].otros_sintomas,
                usuario: res.data[i].usuario.email,
              });
              this.cargando = false;
            }
          })
          .catch((err) => {
            console.log(err.response);
            this.cargando = false;
          });
      },
      filtroSoloSintomas() {
        let config = { headers: { Authorization: `Bearer ${this.token}` } };
        this.axios
          .get('/encuesta?sintomas=1', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.items.push({
                id_encuesta: res.data[i].encuesta_id,
                fecha_aplicacion: moment(res.data[i].fecha_aplicacion).calendar(),
                otros_sintomas: res.data[i].otros_sintomas,
                usuario: res.data[i].usuario.email,
              });
              this.cargando = false;
            }
          })
          .catch((err) => {
            console.log(err.response);
            this.cargando = false;
          });
      },
    },
  };
</script>

<style>
</style>