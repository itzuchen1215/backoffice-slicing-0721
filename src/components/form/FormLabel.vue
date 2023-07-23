<script setup lang="ts">
defineProps({
  label: String,
})
</script>

<template>
  <label class="block">
    <div class="text-sm text-[#737791] mb-2">{{ label }}</div>
    <slot />
  </label>
</template>