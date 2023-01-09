<template>
  <div
    :class="['alert', 'alert-' + type, 'alert-dismissible', 'fade', 'show']"
    role="alert">
    <strong v-if="type == 'success'">Succès :</strong>
    <strong v-else>Erreur :</strong>
    {{ message }}
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["type", "message"],
  methods: {
    dismiss: function () {
      this.$emit("dismiss");
    },
  },
};
</script>
