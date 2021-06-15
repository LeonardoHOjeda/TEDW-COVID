<template>
  <div>
    <Titulos titulo="Solicitudes de Consultas" subtitulo="Aqui podras observar las solicitudes de consultas"/>
    <div>
      <p>Filtrado por: <b>{{sortBy}}</b></p>
    </div>
    <b-table :sort-by.sync="sortBy" striped hover :items="items" :fields="fields" class="text-center">
      <template v-slot:cell(acciones)="data" #cell(acciones)>
        <b-button variant="outline-success" size="sm" :to="`./Consultas/${data.item.solicitud_id}`">Atender cita <i class="fas fa-book-medical"></i></b-button>
          <!-- <button class="btn btn-warning btn-sm">Ver respuestas <i class="far fa-eye"></i></button> -->
      </template>
    </b-table>
    <div class="text-center">
      <b-spinner
        :variant="variant"
        :key="variant"
        v-if="cargando"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
import moment from 'moment';
import {mapState} from 'vuex'
export default {
  components:{
    Titulos
  },
  data() {
      return {
        variant: 'info',
        cargando: true,
        consultas: [],
        moment: moment,
        sortBy: 'solicitud_id',
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          { key: 'modalidad', sortable: false },
          { key: 'fecha_solicitud', sortable: true },
          { key: 'sintomas', sortable: true,
            // Variant applies to the whole column, including the header and footer
          },
          {
            key: 'acciones'
          }
        ],
        items: [
          // { isActive: true, modalidad: 'Virtual', nombre_usuario: 'Dickerson', id: '1' },
          // { isActive: false, modalidad: 'Virtual', nombre_usuario: 'Larsen', id: '2' },
          // { isActive: false, modalidad: 'Presencial', nombre_usuario: 'Geneva', id: '3' },
          // { isActive: true, modalidad: 'Virtual', nombre_usuario: 'Jami', id: '4' }
        ]
      }
    },
    computed: {
      ...mapState(['usuario','token'])
    },
    created(){
      this.listarConsultas()
    },
    methods: {
      listarConsultas(){
        let config = {headers:{'Authorization': `Bearer ${this.token}`}}
        this.axios.get('/consultas?atendidas=0', config)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.items.push({
                solicitud_id: res.data[i].solicitud_id,
                modalidad: res.data[i].modalidad,
                fecha_solicitud: moment(res.data[i].fecha_solicitud).calendar(),
                sintomas: res.data[i].sintomas
              })
            }
            this.cargando = false
            console.log(res.data);
            console.log(this.items);
          }).catch((err) => {
            console.log(err);
            this.cargando = false
          });
      }
    }
}
</script>

<style>

</style>