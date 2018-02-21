<template>
  <b-table bordered hover :items="candidates" :fields="fields">
    <template slot="skills" slot-scope="data">
      {{data.item.matchedSkills}} ({{data.item.matchedSkillsNo}})
    </template>
  </b-table>
</template>

<script>
import gql from 'graphql-tag'

const query = gql`
  query projectCandidates($projectId: Int!) {
    candidates(projectId: $projectId) {
      id,
      fullName,
      matchedSkillsNo,
      matchedSkills,
      experience
    }
  }
`

export default {
  props: ['projectId'],
  apollo: {
    candidates: {
      query,
      variables() {
        return {
          projectId: this.projectId
        }
      }
    }
  },
  data() {
    return {
      candidates: [],
      fields: [
        {
          key: 'id',
          label: 'Id',
          sortable: false
        },
        {
          key: 'fullName',
          label: 'Full name',
          sortable: false
        },
        {
          key: 'skills',
          label: 'Matched skills'
        },
        {
          key: 'experience',
          label: 'Matched skills experience',
          sortable: true
        }
      ]
    }
  }
}
</script>
