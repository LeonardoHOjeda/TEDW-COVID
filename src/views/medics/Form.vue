<template>
  <div>
    <Titulos titulo="Respuestas Formulario" subtitulo="Aqui podras observar las respuestas de cada formulario que se ha respondido" />
    <div>
      <p>Filtrado por: <b>{{sortBy}}</b></p>
    </div>
    <b-table :sort-by.sync="sortBy" striped hover :items="items" :fields="fields" class="text-center">
      <template #cell(acciones)>
        <b-button variant="outline-info" size="sm" :to="`./Form/${items[2].id}`">Ver respuestas <i class="far fa-eye"></i></b-button>
          <!-- <button class="btn btn-warning btn-sm">Ver respuestas <i class="far fa-eye"></i></button> -->
      </template>
    </b-table>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
export default {
  components: {
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
            key: 'sintomas',
            label: '¿Tiene sintomas?',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
          },
          {
            key: 'acciones'
          }
        ],
        items: [
          { isActive: true, sintomas: 'Si', nombre_usuario: 'Dickerson', id: '1' },
          { isActive: false, sintomas: 'Si', nombre_usuario: 'Larsen', id: '2' },
          { isActive: false, sintomas: 'No', nombre_usuario: 'Geneva', id: '3' },
          { isActive: true, sintomas: 'Si', nombre_usuario: 'Jami', id: '4' }
        ]
      }
    }
  }
</script>

<style>

</style>