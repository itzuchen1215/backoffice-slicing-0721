<script setup lang="ts">
defineProps({
  label: String
})
</script>

<template>
  <label class="block">
    <div class="mb-2 text-sm text-[#737791]">{{ label }}</div>
    <slot />
  </label>
</template>
