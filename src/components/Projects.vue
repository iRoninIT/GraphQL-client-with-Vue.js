<template>
  <b-row>
    <b-col cols="4">
      <b-list-group>
        <b-list-group-item  v-for="project in projects"
          :key="project.id"
          :to="{ name: 'projects', params: { projectId: project.id } }">
          {{ project.name }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col>
      <p v-if="!selectedProjectId">Select project on the sidebar see its best candidates</p>
      <div v-else>
        <p>
          <strong>Required skills:</strong>
          {{ selectedProject.skills }}
        </p>
        <candidates :projectId="selectedProjectId" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import gql from 'graphql-tag'
import candidates from './Candidates.vue'

const query = gql`
  query projects {
    projects {
      id,
      name,
      skills
    }
  }
`

export default {
  components: {
    candidates
  },
  apollo: {
    projects: query
  },
  data() {
    return {
      projects: []
    }
  },
  computed: {
    selectedProject() {
      return this.projects.find(({ id }) => id === this.selectedProjectId) || {}
    },
    selectedProjectId() {
      return this.$route.params.projectId
    }
  }
}
</script>
