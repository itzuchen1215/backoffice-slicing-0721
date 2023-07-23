<script setup lang="ts">
import { computed } from 'vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  searchButton: Boolean
})
const emit = defineEmits(['update:modelValue', 'submit'])

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
    class="relative flex h-[38px] items-center rounded-lg border border-[#F2F2F7] bg-white px-[18px] xl:h-12"
  >
    <input
      type="text"
      v-model="value"
      :placeholder="placeholder"
      class="text-sm leading-5 placeholder-[#737791] xl:text-lg"
      :class="searchButton ? 'w-[calc(100%-34px)]' : 'w-full'"
    />
    <button
      v-if="searchButton"
      class="absolute right-0 top-1/2 h-full translate-y-[-50%] px-4"
      @click="$emit('submit')"
    >
      <IconSearch class="text-[#475B73]" />
    </button>
  </div>
</template>

