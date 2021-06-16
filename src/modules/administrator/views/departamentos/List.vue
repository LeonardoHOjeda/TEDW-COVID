<template>
  <div class="mt-5">
    <h3 class="mb-3">Departamentos</h3>
    <b-table
      striped
      hover
      :items="departments"
      :fields="fields"
      :filter="search"
      :per-page="perPage"
      :current-page="currentPage"
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

      <template #cell(actions)>
        <div>
          <b-btn class="btn-sm" variant="danger">
            <i class="fas fa-trash"></i>
          </b-btn>
          <router-link to="/admin/departamentos/" class="btn btn-sm btn-warning ml-2 text-white">
            <i class="fas fa-pen"></i>
          </router-link>
        </div>
      </template>
    </b-table>
    <b-row align-h="end">
      <b-col cols="3">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'DepartmentList',
    data: () => ({
      search: '',
      perPage: 5,
      totalRows: 10,
      currentPage: 1,
      fields: [
        { key: 'departamento_id', sortable: true },
        { key: 'departamento', sortable: true },
        'actions',
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
        },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
      pageOptions: [5, 10, 15, 20, 25, 50],
    }),
    computed: {
      ...mapState('admin/departments', ['departments']),
    },
    methods: {
      ...mapActions('admin/departments', ['fetchDepartments']),
    },
    created() {
      this.fetchDepartments();
    },
  };
</script>

<style>
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