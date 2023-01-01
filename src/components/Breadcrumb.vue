<template>
  <div class="page-breadcrumb">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex align-items-center">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="breadcrumb-item"
          :class="{ 'active': link.active }">
          <router-link
            v-if="link.to"
            :to="link.to"
            class="breadcrumb-link">
            {{ link.text }}
          </router-link>
          <span v-else>
            {{ link.text }}
          </span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Breadcrumb",
  props: {
    links: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};

</script>

<style scoped>

  .breadcrumb-item + .breadcrumb-item::before {
    content: ">";
  }

</style>