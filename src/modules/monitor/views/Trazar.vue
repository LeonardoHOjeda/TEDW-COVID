<template>
  <div>
    <br />
    <Titulos
      titulo="Trazar"
      subtitulo="Selecciona a los usuarios que quieres alertar por haber tenido contacto con alguien contagiado"
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
    >
      <template v-slot:cell(avisar)="data">
        <b-form-group>
          <input @input="enviarAlertas(data)" type="checkbox" v-model="data.item.avisar" />
        </b-form-group>
      </template>
    </b-table>
    <div class="text-center">
      <b-spinner :variant="variant" :key="variant" v-if="cargando"></b-spinner>
    </div>
    <b-button @click="enviar" variant="danger">
      Siguiente
      <i class="far fa-share-square"></i>
    </b-button>
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
        fields: [
          { key: 'id', sortable: false },
          { key: 'email', sortable: false },
          { key: 'nombre', sortable: true },
          { key: 'avisar' },
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
              this.cargando = false;
            }
          })
          .catch((err) => {
            console.log(err.response);
            this.cargando = false;
          });
      },
      enviarAlertas(data) {
        let metio_temp = 0;
        let uso_temp = false;
        this.por_enviar_temp = [];

        for (let i = 0; i < this.por_enviar.length - metio_temp; i++) {
          if (this.por_enviar[i].id == data.item.id) {
            uso_temp = true;
          } else {
            this.por_enviar_temp.push({
              id: this.por_enviar[i].id,
            });
          }
        }

        if (uso_temp == true) {
          this.por_enviar = this.por_enviar_temp;
        } else {
          this.por_enviar.push({
            id: data.item.id,
          });
        }

        for (let i = 0; i < this.por_enviar.length; i++) {
          console.log(this.por_enviar[i].id);
        }
      },
      enviar() {
        this.$router.push({
          name: 'TrazarPersona',
          params: {
            ids: this.por_enviar,
          },
        });
      },
    },
  };
</script>

<style>
</style>