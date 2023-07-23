<script setup lang="ts">
import { ref } from 'vue'
import UserAvatar from './UserAvatar.vue'
import WeatherTime from './WeatherTime.vue'
import IconSearchShort from '@/components/icons/IconSearchShort.vue'
import IconSetting from '@/components/icons/IconSetting.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import TextInput from '@/components/form/TextInput.vue'
import CustomSelect from '@/components/form/CustomSelect.vue'
import type { ISelectOption } from '@/components/form/types'

defineEmits(['clickHam'])

const searchOptions: ISelectOption[] = [
  {
    value: 'all',
    name: 'By All'
  },
  {
    value: 'station',
    name: 'By Station'
  },
  {
    value: 'country',
    name: 'By Country'
  }
]

// 地區下拉選單選項包含：Antananarivo、Hongkong、Taipei、Tokyo
const countryOptions: ISelectOption[] = [
  {
    value: 'antananarivo',
    name: 'Antananarivol'
  },
  {
    value: 'hk',
    name: 'Hongkong'
  },
  {
    value: 'taipei',
    name: 'Taipei'
  },
  {
    value: 'tokyo',
    name: 'Tokyo'
  }
]

const searchType = ref('all')
const selectedCountry = ref('antananarivo')

</script>

<template>
  <header
    class="fixed z-10 flex h-[var(--header-height-mobile)] w-full min-w-[inherit] items-center justify-between bg-white px-4 xl:h-[var(--header-height-pc)] xl:bg-[#F2F2F7] xl:px-7 xl:pt-2"
  >
    <div class="flex">
      <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click="$emit('clickHam')">
        <div>
          <div class="h-[1px] w-[11.6px] bg-[#475B73] xl:h-[2px] xl:w-5"></div>
          <div class="my-[4.5px] h-[1px] w-[11.6px] bg-[#475B73] xl:h-[2px] xl:w-5"></div>
          <div class="h-[1px] w-[11.6px] bg-[#475B73] xl:h-[2px] xl:w-5"></div>
        </div>
      </div>
      <img alt="logo" src="@/assets/logo.svg" class="ml-[19.5px] block w-[93px] xl:w-[162px]" />
      <div class="ml-[51px] hidden xl:flex xl:gap-2">
        <TextInput placeholder="Search here..." search-button class="border-[#737791]" />
        <CustomSelect
          :options="searchOptions"
          v-model="searchType"
          class="w-[101px] border-[#737791] text-[#737791]"
        />
      </div>
    </div>
    <div class="flex items-center">
      <div class="hidden xl:flex items-center">
        <WeatherTime />
        <CustomSelect :options="countryOptions" v-model="selectedCountry" flat class="w-[170px]" />
      </div>
      <div class="flex items-center gap-6 xl:gap-[51px] ml-[50px]">
        <IconSearchShort class="cursor-pointer text-lg text-[#475B73] xl:hidden" />
        <IconSetting class="cursor-pointer text-lg text-[#475B73] xl:text-[28px] xl:text-black" />
        <div class="relative hidden xl:block">
          <div class="absolute -right-[2px] -top-[2px] h-[6px] w-[6px] rounded bg-[#151D48]"></div>
          <IconNotification class="cursor-pointer text-2xl" />
        </div>
        <UserAvatar class="cursor-pointer" />
      </div>
    </div>
  </header>
</template>
