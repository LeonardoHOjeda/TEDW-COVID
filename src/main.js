import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Bootstrap Vue (icons & styles)
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

//Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//SweetAlert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options)

//Moment JS
const moment = require('moment')
require('moment/locale/es');

Vue.use(require('vue-moment'), { moment })

//Video JS
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'

Vue.use(VueAxios, axios)

// Agregamos la URL base de la API
axios.defaults.baseURL = 'https://covid19-itc.herokuapp.com' //Sujeto a cambios dependiendo del puerto en el que se encuentra alojado

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')