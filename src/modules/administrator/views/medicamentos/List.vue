<template>
  <b-container class="mt-4">
    <b-alert v-if="error!=null" show variant="danger" dismissible fade>{{error.message}}</b-alert>

    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Medicamentos Registrados</h3>
      <router-link to="/admin/medicamentos/add" class="btn btn-sm btn-success">
        <i class="fas fa-plus mr-2"></i>Agregar
      </router-link>
    </div>
    <b-row>
      <b-col cols="12">
        <b-table
          striped
          hover
          :items="medicamentos"
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
              <b-th colspan="4">
                <p class="h6 text-right">
                  Buscar
                  <input type="search" class="search" v-model="search" />
                </p>
              </b-th>
            </b-tr>
          </template>

          <template #cell(acciones)="row">
            <div>
              <b-btn size="sm" variant="danger" @click="confirmDelete(row.item.medicamento_id)">
                <i class="fas fa-trash"></i>
              </b-btn>
              <router-link
                :to="`/admin/medicamentos/update/${row.item.medicamento_id}`"
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
          :total-rows="medicamentos.length"
          :per-page="perPage"
          align="fill"
          size="sm"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'MedicamentosList',
    data: () => ({
      search: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'medicamento_id', label: 'ID', sortable: true },
        { key: 'descripcion', sortable: true },
        { key: 'acciones', sortable: false },
      ],
      pageOptions: [5, 10, 15],
      bussy: false,
    }),
    computed: {
      ...mapState('admin/medicamentos', ['medicamentos', 'error']),
    },
    methods: {
      ...mapActions('admin/medicamentos', [
        'fetchMedicamentos',
        'deleteMedicamento',
      ]),
      async confirmDelete(id) {
        const result = await this.$swal({
          title: 'Eliminar',
          text: '¿Estas seguro? Estas acción no se puede deshacer',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, Eliminar',
        });
        if (result.isConfirmed) {
          this.bussy = true;
          await this.deleteMedicamento(id);
          this.bussy = false;
        }
      },
    },
    created() {
      this.fetchMedicamentos();
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