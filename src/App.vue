<script setup lang="ts">
import PageHeader from '@/components/header/PageHeader.vue'
import BreadCrumb from '@/components/bread-crumb/BreadCrumb.vue'
import SearchButton from '@/components/SearchButton.vue'
import type { IBreadCrumbItems } from './components/bread-crumb/types';

const breadItems: IBreadCrumbItems[] = [
  {
    path: '/home',
    name: 'Home',
    isCurrent: false,
  },
  {
    path: '/my-collection',
    name: 'My Collection',
    isCurrent: true,
  }
];
</script>

<template>
  <PageHeader />
  <div class="w-full pt-[var(--header-height-mobile)] bg-[#F2F2F7]">
    <aside class="fixed h-full hidden">QQ</aside>
    <main class="w-full h-full px-4 pb-7">
      <div class="mt-4">
        <BreadCrumb :items="breadItems" />
      </div>
      <div class="mt-4">
        search input
      </div>
      <div class="mt-4 bg-white px-[18px] py-6">
        Category select +
        Subtitle input
        <SearchButton />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
