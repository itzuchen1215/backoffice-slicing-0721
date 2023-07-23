<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
</script>

<template>
  <div class="flex cursor-pointer items-center gap-2">
    <img
      src="@/assets/fake-avatar.webp"
      alt="avatar-photo"
      class="h-7 w-7 rounded-l-full xl:h-[50px] xl:w-[50px]"
    />
    <IconChevronDown class="hidden xl:block xl:text-[8px]" />
  </div>
</template>
