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
    >Este es un listado de todos los usuarios que han tenido contacto con: {{$route.params.usuario}}</h3>
    <br />
    <h5 class>
      <span class="badge badge-info">Fecha del contacto:</span>
      {{$route.params.fecha}}
    </h5>
    <br />
    <b-table striped hover :items="items" :fields="fields" class="text-center" responsive="sm"></b-table>
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
          { key: 'correo', sortable: true },
          { key: 'nombre', sortable: true },
          {
            key: 'carrera_dept',
            label: 'Carrera o Departamento',
            sortable: true,
          },
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
        this.axios
          .get(`/trazabilidad/${this.$route.params.id}`)
          .then((res) => {
            const data = res.data;
            console.log(data);
            data.forEach((t) => {
              if (moment(t.fecha).format('LL') === this.$route.params.fecha) {
                this.items.push({
                  id_usuario: t.usuario.usuario_id,
                  correo: t.contacto_email,
                  nombre: t.contacto,
                  carrera_dept: t.carrera || t.departamento,
                });
              }
            });
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