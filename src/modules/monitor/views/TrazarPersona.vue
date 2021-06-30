<template>
  <div class="container">
    <br />
    <Titulos
      titulo="Trazar 'Culpable'"
      subtitulo="Ahora selecciona quién es el contagiado, para llevar un control de su trazabilidad"
    />
    <br />
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
      <template v-slot:cell(infectado)="data">
        <b-button variant="outline-info" size="sm" @click="guardar(data.item.id)">
          Seleccionar
          <i class="fas fa-thumbtack"></i>
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
          { key: 'id', sortable: false },
          { key: 'email', sortable: false },
          { key: 'nombre', sortable: true },
          { key: 'infectado' },
        ],
        items: [],
        por_enviar: [],
        por_enviar_temp: [],
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
        this.por_enviar = [];
        this.cargando = true;
        this.listar();
      },
    },
    methods: {
      listar() {
        let config = { headers: { Authorization: `Bearer ${this.token}` } };
        this.axios
          .get('/usuarios', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              let error = false;

              for (let j = 0; j < this.$route.params.ids.length; j++) {
                if (res.data[i].usuario_id == this.$route.params.ids[j].id) {
                  error = true;
                }
              }

              if (error == false) {
                if (res.data[i].medico) {
                  this.items.push({
                    id: res.data[i].usuario_id,
                    email: res.data[i].email,
                    nombre:
                      res.data[i].medico.nombre +
                      ' ' +
                      res.data[i].medico.a_paterno +
                      ' ' +
                      res.data[i].medico.a_materno,
                  });
                } else if (res.data[i].estudiante) {
                  this.items.push({
                    id: res.data[i].usuario_id,
                    email: res.data[i].email,
                    nombre:
                      res.data[i].estudiante.nombre +
                      ' ' +
                      res.data[i].estudiante.a_paterno +
                      ' ' +
                      res.data[i].estudiante.a_materno,
                  });
                } else if (res.data[i].personal) {
                  this.items.push({
                    id: res.data[i].usuario_id,
                    email: res.data[i].email,
                    nombre:
                      res.data[i].personal.nombre +
                      ' ' +
                      res.data[i].personal.a_paterno +
                      ' ' +
                      res.data[i].personal.a_materno,
                  });
                }
              }
              this.cargando = false;
            }
          })
          .catch((err) => {
            console.log(err.response);
            this.cargando = false;
          });
      },
      async guardar(id) {
        for (let i = 0; i < this.$route.params.ids.length; i++) {
          let enviarDatos = {
            usuario_id: id,
            contacto_id: this.$route.params.ids[i].id,
            fecha: moment().format(),
          };

          try {
            await this.axios.post(`/trazabilidad`, enviarDatos);
            await this.axios.post(`/alertas`, {
              usuario_id: enviarDatos.contacto_id,
              alerta:
                'Usted ha tenido contacto con una persona contagiada en los últimos días. Mantenga sus precauciones.',
            });
          } catch (error) {
            console.log(error.response.data);
          }
        }

        this.$router.push({
          name: 'Trazabilidad',
          params: {
            enviado: true,
          },
        });
      },
    },
  };
</script>

<style>
  .alert {
    padding: 20px;
    background-color: #aa1f1f;
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