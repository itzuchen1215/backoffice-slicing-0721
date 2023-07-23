<script setup lang="ts">
import IconColletLabel from '@/components/icons/IconColletLabel.vue'
import IconLikes from '@/components/icons/IconLikes.vue'
import IconComments from '@/components/icons/IconComments.vue'
import IconShares from '@/components/icons/IconShares.vue'
import type { PropType } from 'vue'
import type { ICollectionListItem } from './types'

defineProps({
  list: Array as PropType<ICollectionListItem[]>
})
defineEmits(['cancelCollect'])
</script>

<template>
  <ul v-if="list && list.length > 0" class="xl:border">
    <template v-for="item in list" :key="item.id">
      <li
        class="overflow-hidden border-b bg-white px-[7px] pb-3 pt-5 last:border-b-0 xl:py-4 xl:pl-[15px] xl:pr-[30px]"
      >
        <div class="flex flex-shrink-0 flex-wrap items-center">
          <IconColletLabel
            class="cursor-pointer pt-[1px] text-[19px] text-black"
            @click="$emit('cancelCollect', item.id)"
          />
          <p
            class="order-3 mt-2 w-full flex-auto truncate text-xs font-medium leading-6 xl:order-none xl:ml-5 xl:mt-0 xl:w-auto xl:text-sm"
          >
            {{ item.title }}
          </p>
          <div class="ml-4 flex-1 xl:flex-none">
            <span class="rounded-[38px] bg-[#EDEDED] px-[9px] py-[3px] text-xs text-[#11263C]">
              {{ item.tag }}
            </span>
          </div>
        </div>
        <div class="mt-3 xl:flex justify-between">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-3 xl:pl-[39px]">
            <div class="flex items-center gap-[6px]">
              <IconLikes />
              <span class="text-xs font-medium text-[#737791]">{{ item.likes }} Likes</span>
            </div>
            <div class="flex items-center gap-[6px]">
              <IconComments />
              <span class="text-xs font-medium text-[#737791]">{{ item.comments }} Comments</span>
            </div>
            <div class="flex items-center gap-[6px]">
              <IconShares />
              <span class="text-xs font-medium text-[#737791]">{{ item.shares }} Shares</span>
            </div>
          </div>
          <div class="mt-[14px] xl:mt-0">
            <time class="text-xs font-semibold xl:text-[#737791] xl:font-normal">{{ item.date }}</time>
          </div>
        </div>
      </li>
    </template>
  </ul>
  <div v-else class="py-10 text-center xl:py-16 xl:bg-white">No Data</div>
</template>

<style scoped></style>
