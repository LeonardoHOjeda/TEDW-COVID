<template>
  <div class="container">
    <br />
    <div v-if="$route.params.enviado === true" class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      Se han enviado las alertas a todos los usuarios!
    </div>

    <Titulos
      titulo="Trazabilidad"
      subtitulo="Aqui podras llevar control de las personas con las que alguna persona infectada/contagiada haya tenido contacto"
    />
    <b-button :to="`./Trazar`" block variant="info">
      Trazar usuario
      <i class="fas fa-search"></i>
    </b-button>
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
      <template v-slot:cell(informacion)="data">
        <b-button
          variant="outline-info"
          size="sm"
          @click="trazar(data.item.usuario_id, data.item.fecha_de_contacto, data.item.usuario)"
        >
          Usuarios con los que tuvo contacto
          <i class="far fa-eye"></i>
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
          {
            key: 'fecha_de_contacto',
            label: 'Fecha de contacto',
            sortable: false,
          },
          { key: 'usuario', sortable: false },
          { key: 'email', sortable: false },
          { key: 'informacion' },
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
          .get('/trazabilidad', config)
          .then((res) => {
            const data = res.data;
            data.forEach((t) => {
              if (
                !this.items.find(
                  (item) =>
                    item.usuario_id === t.usuario_id &&
                    item.fecha_de_contacto === moment(t.fecha).format('LL')
                )
              ) {
                this.items.push({
                  fecha_de_contacto: moment(t.fecha).format('LL'),
                  usuario_id: t.usuario_id,
                  usuario: t.usuario,
                  email: t.usuario_email,
                  id_trazo: t.trazabilidad_id,
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
      trazar(usuario_id, id_fecha, usuario) {
        this.$router.push({
          name: 'Trazo',
          params: {
            id: usuario_id,
            fecha: id_fecha,
            usuario: usuario,
          },
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

  .search {
    padding: 6px;
    padding-left: 15px;
    border: 1px solid #e1e1e1;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
    border-radius: 20px;
    outline: none;
  }

  .search:focus {
    border: 1px solid #e1e1e1;
    background-color: white;
    border-radius: 20px;
  }
</style>