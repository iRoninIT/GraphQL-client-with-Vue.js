<template>
  <div id="app">
    <header class="header">
      <b-navbar toggleable="md" type="light" variant="light">
        <b-container>
          <b-navbar-brand :to="{ name: 'projects' }">Talent Matcher</b-navbar-brand>
        </b-container>
      </b-navbar>
    </header>

    <main>
      <b-container>
        <router-view></router-view>
      </b-container>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.header {
  margin-bottom: 2rem;
}
</style>
