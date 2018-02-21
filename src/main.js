import Vue from 'vue'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import BootstrapVue from 'bootstrap-vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import Projects from './components/Projects.vue'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3200/graphql'
  }),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

const router = new VueRouter({
  routes: [
    {
      name: 'projects',
      path: '/:projectId?',
      component: Projects
    }
  ]
});

Vue.use(VueRouter)

// Fix for compatibility issue with Vue 2.5.1
// https://github.com/bootstrap-vue/bootstrap-vue/issues/1201
let originalVueComponent = Vue.component
Vue.component = function(name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
Vue.use(BootstrapVue)
Vue.component = originalVueComponent

new Vue({
  el: '#app',
  apolloProvider,
  router,
  render: h => h(App)
})
