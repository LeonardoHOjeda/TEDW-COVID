<template>
  <div class="mt-4">
    <b-alert v-if="error!=null" show variant="danger" dismissible fade>{{error.message}}</b-alert>

    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Estudiantes</h3>
      <router-link to="/admin/estudiantes/add" class="btn btn-sm btn-success">
        <i class="fas fa-plus mr-2"></i>Dar de Alta
      </router-link>
    </div>
    <b-row>
      <b-col cols="12">
        <b-table
          striped
          hover
          :items="estudiantes"
          :fields="fields"
          :filter="search"
          :per-page="perPage"
          :current-page="currentPage"
          responsive="sm"
          :busy="bussy"
        >
          <template #thead-top>
            <b-tr>
              <b-th>
                <div class="d-flex">
                  <p class="mr-2 h6 align-self-center">Mostar:</p>
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="sm"
                  ></b-form-select>
                </div>
              </b-th>
              <b-th colspan="5">
                <p class="h6 text-right">
                  Buscar
                  <input type="search" class="search" v-model="search" />
                </p>
              </b-th>
            </b-tr>
          </template>

          <template #cell(carrera)="row">
            <div>{{row.item.carrera.carrera}}</div>
          </template>

          <template #cell(usuario)="row">
            <div>
              <button class="btn btn-sm btn-primary" @click="row.toggleDetails">Ver Usuario</button>
            </div>
          </template>

          <template #row-details="row">
            <b-card>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: {{ row.item.usuario.usuario_id }}</li>
                <li class="list-group-item">Email: {{ row.item.usuario.email }}</li>
                <li class="list-group-item">
                  Habilitado:
                  <span
                    class="badge badge-primary"
                  >{{ row.item.usuario.habilitado ? 'SI' :'NO' }}</span>
                </li>
                <li class="list-group-item">
                  Sospechoso:
                  <span
                    class="badge badge-primary"
                  >{{ row.item.usuario.sospechoso ? 'SI' :'NO' }}</span>
                </li>
                <li class="list-group-item">
                  Requiere Encuesta:
                  <p class="badge badge-primary">{{ row.item.usuario.requireSurvey ? 'SI' :'NO'}}</p>
                </li>
              </ul>
            </b-card>
          </template>

          <template #cell(acciones)="row">
            <div>
              <router-link
                :to="`/admin/estudiantes/update/${row.item.estudiante_id}`"
                size="sm"
                class="btn btn-sm btn-warning text-white btn-edit"
              >
                <i class="fas fa-pen"></i>
              </router-link>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="pagination">
      <b-col cols="3">
        <b-pagination
          v-model="currentPage"
          :total-rows="estudiantes.length"
          :per-page="perPage"
          align="fill"
          size="sm"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'EstudiantesList',
    data: () => ({
      search: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'nombre', sortable: true },
        { key: 'a_paterno', label: 'Apellido Paterno', sortable: true },
        { key: 'a_materno', label: 'Apellido Materno', sortable: true },
        { key: 'carrera', sortable: true },
        { key: 'usuario', sortable: true },
        { key: 'acciones', sortable: false },
      ],
      pageOptions: [5, 10, 15],
      bussy: false,
    }),
    computed: {
      ...mapState('admin/estudiantes', ['estudiantes', 'error']),
    },
    methods: {
      ...mapActions('admin/estudiantes', ['fetchEstudiantes']),
    },
    created() {
      this.fetchEstudiantes();
    },
  };
</script>

<style scoped>
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

  a.fab {
    text-decoration: none;
  }

  .pagination {
    justify-content: flex-end;
  }

  .btn-edit {
    margin-top: 10px;
  }
  @media (min-width: 982px) {
    .btn-edit {
      margin-top: 0;
      margin-left: 10px;
    }
  }
</style>