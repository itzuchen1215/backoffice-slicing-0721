<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
</script>

<template>
  <div class="flex items-center gap-2 cursor-pointer">
    <img src="@/assets/fake-avatar.webp" alt="avatar-photo" class="rounded-l-full w-7 h-7 xl:w-[50px] xl:h-[50px]" />
    <IconChevronDown class="hidden xl:block xl:text-[8px]" />
  </div>
</template>
