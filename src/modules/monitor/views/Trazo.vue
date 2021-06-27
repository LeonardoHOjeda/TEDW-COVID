<template>
  <div>
    <div class="mt-3">
      <router-link to="/monitor/Trazabilidad" class="btn btn-primary">
        <i class="fas fa-long-arrow-alt-left"></i> Regresar
      </router-link>
    </div>
    <Titulos titulo="Evidencia" subtitulo />
    <h3
      class="font-weight-light text-center"
    >Aqui podras observar los usuarios que se alertaron en la instancia de trazabilidad con el id: {{$route.params.id}}</h3>
    <br />
    <h5 class>
      <span class="badge badge-info">Fecha de envio:</span>
      {{$route.params.fecha}}
    </h5>
    <br />
    <b-table striped hover :items="items" :fields="fields" class="text-center">
      <template v-slot:cell(informacion)>
        <b-button variant="outline-info" size="sm">
          Ver usuarios informados
          <i class="far fa-eye"></i>
        </b-button>
      </template>
    </b-table>
    <div class="text-center">
      <b-spinner v-if="cargando"></b-spinner>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <h6
      class="font-weight-light text-center"
    >(Recuerda que no se informa quien fue la persona afectada por razones de privacidad)</h6>
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
        selected: '0',
        moment: moment,
        fecha_deteccion: '',
        cargando: false,
        medico: '',
        tipo_prueba: '',
        fields: [
          { key: 'id_usuario', sortable: false },
          { key: 'correo', sortable: false },
        ],
        items: [],
      };
    },
    computed: {
      ...mapState(['usuario', 'token']),
    },
    created() {
      this.llenar();
    },
    methods: {
      llenar() {
        this.cargando = true;
        let config = { headers: { Authorization: `Bearer ${this.token}` } };
        this.axios
          .get('/trazabilidad', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              if (
                moment(res.data[i].fecha).calendar() ==
                  this.$route.params.fecha &&
                res.data[i].usuario.usuario_id == this.$route.params.id
              ) {
                this.items.push({
                  id_usuario: res.data[i].contacto.usuario_id,
                  correo: res.data[i].contacto.email,
                });
              }
            }
            this.cargando = false;
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