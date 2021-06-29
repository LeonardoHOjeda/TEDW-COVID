<template>
  <b-container class="mt-3">

    <div>
      <Titulos titulo="Ordenes" subtitulo="Aqui podras observar todas las ordenes que se han solicitado a los usuarios" />
      <div>
        <b-table
          :busy="cargando"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :tbody-tr-class="rowClass"
          class="text-center"
          responsive="md"
          striped
          hover
        >
        <template v-slot:cell(acciones)="data">
          <div :class="data.item.resultado !== '-------' ? 'noEdit' : ''">
            <router-link :to="`./Ordenes/${data.item.id}`" :class="data.item.resultado !== '-------' ? 'disabled' : ''" class="btn btn-outline-dark">Modificar Orden <i class="fas fa-pen"></i></router-link>
          </div>
          <!-- <b-button :class="data.item.resultado !== null ? 'noEdit' : ''" variant="outline-dark" size="sm" :to="`./Ordenes/${data.item.id}`">Modificar Orden <i class="fas fa-pen"></i></b-button> -->
            <!-- <button class="btn btn-warning btn-sm">Ver respuestas <i class="far fa-eye"></i></button> -->
        </template>
          <template #table-busy>
            <div class="text-center text-info my-2">
              <b-spinner
                :variant="variant"
                :key="variant"
                class="align-middle"
              ></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Titulos from '../../../components/Titulos'
import moment from 'moment';

export default {
  data(){
    return {
      ordenes: [],
      cargando: true,
      variant: 'info',
      moment: moment,
      sortBy: 'usuario',
      sortDesc: false,
      fields: [
        { key: 'usuario', label: 'Usuario', sortable: false},
        { key: 'prueba', label: 'Prueba', sortable: true },
        { key: 'resultado', label: 'Resultado', sortable: true },
        { key: 'fecha_deteccion', label: 'Fecha deteccion', sortable: true },
        { key: 'medico', label: 'Medico', sortable: false },
        { key: 'acciones'}
      ],
      items: [
        // { isActive: true, age: 40, usuario: 'Dickerson', prueba: 'Macdonald', resultado: 'POSITIVO', medico: 'Juan Perez' },
        // { isActive: false, age: 21, usuario: 'Larsen', prueba: 'Shaw', resultado: 'POSITIVO', medico: 'Juan Perez' },
        // { isActive: false, age: 89, usuario: 'Geneva', prueba: 'Wilson', resultado: 'POSITIVO', medico: 'Juan Perez' },
        // { isActive: true, age: 38, usuario: 'Jami', prueba: 'Carney', resultado: 'POSITIVO', medico: 'Juan Perez' }
      ]
    }
  },
  components: {
    Titulos
  },
  computed: {
    ...mapState(['usuario','token'])
  },
  methods: {
    listarOrdenes(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      let resultado = ''
      this.axios.get('/ordenes', config)
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            switch (res.data[i].resultado) {
              case 'POSITIVO':
                resultado = 'POSITIVO'
                break;
              case 'NEGATIVO':
                resultado = 'NEGATIVO'
                break;
              default:
                resultado = '-------'
                break;
            }
            this.items.push({
              usuario: res.data[i].usuario.email,
              prueba: res.data[i].tipo.descripcion,
              // resultado: res.data[i].resultado,
              resultado: resultado,
              fecha_deteccion: moment(res.data[i].fecha_deteccion).calendar(),
              medico: res.data[i].medico.nombre,
              status: resultado,
              id: res.data[i].orden_id
            })
          }
          this.cargando = false
        }).catch((err) => {
          console.log(err.response);
        });
    },
    rowClass(item, type){
      if (!item || type !== 'row') return
      if(item.status === 'POSITIVO') return 'table-danger'
      if(item.status === 'NEGATIVO') return 'table-success'
      // else if (item.status === 'NEGATIVE') {
      //   return 'table-success'
      // }
    }
  },
  created(){
    this.listarOrdenes()
  }
}
</script>

<style>
.noEdit {
  cursor: not-allowed!important;
}
</style>