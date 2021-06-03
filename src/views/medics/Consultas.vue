<template>
  <div>
    <Titulos titulo="Solicitudes de Consultas" subtitulo="Aqui podras observar las solicitudes de consultas"/>
    <div>
      <p>Filtrado por: <b>{{sortBy}}</b></p>
    </div>
    <b-table :sort-by.sync="sortBy" striped hover :items="items" :fields="fields" class="text-center">
      <template #cell(acciones)>
        <b-button variant="outline-success" size="sm" :to="`./Consultas/${items[2].id}`">Atender cita <i class="fas fa-book-medical"></i></b-button>
          <!-- <button class="btn btn-warning btn-sm">Ver respuestas <i class="far fa-eye"></i></button> -->
      </template>
    </b-table>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
export default {
  components:{
    Titulos
  },
  data() {
      return {
        sortBy: 'id',
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'id',
            label: 'ID',
            sortable: false
          },
          {
            key: 'nombre_usuario',
            sortable: true
          },
          {
            key: 'modalidad',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
          },
          {
            key: 'acciones'
          }
        ],
        items: [
          { isActive: true, modalidad: 'Virtual', nombre_usuario: 'Dickerson', id: '1' },
          { isActive: false, modalidad: 'Virtual', nombre_usuario: 'Larsen', id: '2' },
          { isActive: false, modalidad: 'Presencial', nombre_usuario: 'Geneva', id: '3' },
          { isActive: true, modalidad: 'Virtual', nombre_usuario: 'Jami', id: '4' }
        ]
      }
    }
}
</script>

<style>

</style>