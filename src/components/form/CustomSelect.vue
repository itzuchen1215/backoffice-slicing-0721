<script setup lang="ts">
import { computed, type PropType } from 'vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import type { ISelectOption } from './types'

const props = defineProps({
  modelValue: String,
  options: Array as PropType<ISelectOption[]>,
  flat: Boolean
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div
    v-if="options"
    class="relative flex h-[38px] cursor-pointer items-center px-2 xl:h-12"
    :class="flat ? 'select-flat' : 'select-default'"
  >
    <select
      v-model="value"
      class="w-[calc(100%-8px)] cursor-pointer truncate px-2 text-sm xl:text-lg"
    >
      <option
        v-for="(item, index) in options"
        :value="item.value"
        :key="index"
        :disabled="item.disabled"
      >
        {{ item.name }}
      </option>
    </select>
    <IconChevronDown class="absolute right-3 top-1/2 w-2 translate-y-[-50%] text-[#151D48]" />
  </div>
</template>

<style scoped>
.select-default {
  @apply rounded-lg border border-[#F2F2F7] bg-white text-[#151D48];
}
.select-flat {
  @apply text-[#737791];
}
</style>
