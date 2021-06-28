<template>
  <div>
    <br />
    <div v-if="$route.params.enviado === true" class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      La alerta se ha enviado correctamente!
    </div>

    <Titulos
      titulo="Alertas"
      subtitulo="Aqui podras mandar alertas a las personas que se encuentren infectadas/contagiadas"
    />
    <b-table
      :sort-by.sync="sortBy"
      striped
      hover
      :items="items"
      :fields="fields"
      class="text-center"
      responsive="sm"
      :filter="search"
    >
      <template #thead-top>
        <b-tr>
          <b-th colspan="4">
            <p class="h6 text-right">
              Buscar
              <input type="search" class="search" v-model="search" />
            </p>
          </b-th>
        </b-tr>
      </template>
      <template v-slot:cell(prueba)="data">
        <b-button variant="outline-info" size="sm" :to="`./Orden/${data.item.id_orden}`">
          Ver resultados
          <i class="far fa-eye"></i>
        </b-button>
      </template>
      <template v-slot:cell(mandar_alerta)="data">
        <b-button variant="outline-danger" size="sm" :to="`./Enviar/${data.item.id_orden}`">
          Enviar
          <i class="fas fa-exclamation-triangle"></i>
        </b-button>
      </template>
    </b-table>
    <div class="text-center">
      <b-spinner :variant="variant" :key="variant" v-if="cargando"></b-spinner>
    </div>
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
        sortBy: 'usuario',
        moment: moment,
        search: '',
        fields: [
          { key: 'usuario', sortable: false },
          { key: 'fecha_aplicacion', sortable: false },
          { key: 'prueba' },
          { key: 'mandar_alerta' },
        ],
        items: [],
      };
    },
    computed: {
      ...mapState(['usuario', 'token']),
    },
    created() {
      this.listar();
    },
    watch: {
      checked: function () {
        this.items = [];
        this.cargando = true;
        this.listar();
      },
    },
    methods: {
      listar() {
        let config = { headers: { Authorization: `Bearer ${this.token}` } };
        this.axios
          .get('/ordenes', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              if (
                res.data[i].resultado == 'POSITIVO' &&
                res.data[i].alerta_enviada == false
              ) {
                this.items.push({
                  usuario: res.data[i].usuario.email,
                  fecha_aplicacion: moment(
                    res.data[i].fecha_aplicacion
                  ).calendar(),
                  id_orden: res.data[i].orden_id,
                });
              }
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
  .alert {
    padding: 20px;
    background-color: #1faa42;
    color: white;
    margin-bottom: 15px;
  }

  .closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closebtn:hover {
    color: black;
  }
</style>