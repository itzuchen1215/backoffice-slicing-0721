<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconSetting from '@/components/icons/IconSetting.vue'
</script>

<template>
  <header
    class="fixed flex h-[var(--header-height-mobile)] w-full min-w-[inherit] items-center justify-between bg-white px-4 md:px-7 md:pt-2"
  >
    <div class="flex">
      <div class="flex h-8 w-8 cursor-pointer items-center justify-center">
        <div>
          <div class="h-[1px] w-[11.6px] bg-[#475B73]"></div>
          <div class="my-[4.5px] h-[1px] w-[11.6px] bg-[#475B73]"></div>
          <div class="h-[1px] w-[11.6px] bg-[#475B73]"></div>
        </div>
      </div>
      <img alt="logo" src="@/assets/logo.svg" class="ml-[19.5px] block w-[93px]" />
    </div>
    <div class="flex items-center gap-6">
      <IconSearch class="w-[18px] text-[#475B73]" />
      <IconSetting class="w-[18px] text-[#475B73]" />
      <UserAvatar />
    </div>
  </header>
</template>
