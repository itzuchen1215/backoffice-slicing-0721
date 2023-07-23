<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '@/components/header/PageHeader.vue'
import BreadCrumb from '@/components/bread-crumb/BreadCrumb.vue'
import SearchButton from '@/components/SearchButton.vue'
import TextInput from '@/components/form/TextInput.vue'
import FormLabel from '@/components/form/FormLabel.vue'
import CustomSelect from '@/components/form/CustomSelect.vue'
import CollectionList from '@/components/list/CollectionList.vue'
import ListPagination from '@/components/list/ListPagination.vue'
import TreeMenu from '@/components/menu/TreeMenu.vue'
import type { IBreadCrumbItems } from '@/components/bread-crumb/types'
import type { ISelectOption } from '@/components/form/types'
import type { ICollectionListItem } from './components/list/types'

const breadItems: IBreadCrumbItems[] = [
  {
    path: '/home',
    name: 'Home',
    isCurrent: false
  },
  {
    path: '/my-collection',
    name: 'My Collection',
    isCurrent: true
  }
]

const categoryOptions: ISelectOption[] = [
  {
    value: 'hr-announcement',
    name: 'HR Announcement'
  },
  {
    value: 'news',
    name: 'News'
  },
  {
    value: 'all',
    name: 'All'
  }
]

const searchInput = ref<string>('')
const subtitleInput = ref<string>('')
const category = ref<string>('hr-announcement')
const collectionList = ref<ICollectionListItem[]>([])

async function getCollectList() {
  // simulate fetch api
  setTimeout(() => {
    const list: ICollectionListItem[] = []
    for (let i = 0; i < 10; i++) {
      list.push({
        id: `appx${i}`,
        title: 'APPX System New Version Release Announce on  14th Dec...',
        date: 'Dec 19, 2022',
        likes: Math.floor(Math.random() * 9999),
        comments: Math.floor(Math.random() * 9999),
        shares: Math.floor(Math.random() * 9999),
        tag: 'News'
      })
    }
    collectionList.value = list
  }, 50)
}

getCollectList()

function handleCancelCollect(id: string) {
  collectionList.value = collectionList.value.filter((item) => item.id !== id)
}

function handlePageChange(page: number) {
  // use page to fetch api
  getCollectList()
}

// MENU
const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
  isOpen.value
    ? (document.body.className = 'overflow-hidden xl:overflow-auto')
    : (document.body.className = '')
}
</script>

<template>
  <PageHeader @click-ham="toggleMenu" />
  <div
    class="min-h-screen w-full bg-[#F2F2F7] pt-[var(--header-height-mobile)] xl:pt-[var(--header-height-pc)]"
  >
    <aside
      class="fixed z-10 h-[calc(100vh-var(--header-height-mobile))] overflow-hidden transition-all xl:h-[calc(100vh-var(--header-height-pc))]"
      :class="
        isOpen
          ? 'w-full xl:w-[var(--left-menu-width)]'
          : 'hidden xl:block xl:w-[var(--left-menu-width-narrow)]'
      "
    >
      <TreeMenu :isExpand="isOpen" @clickNarrowIcon="toggleMenu" />
    </aside>
    <main
      class="h-full px-4 pb-7 transition-all xl:pl-0"
      :class="isOpen ? 'xl:ml-[var(--left-menu-width)]' : 'xl:ml-[var(--left-menu-width-narrow)]'"
    >
      <div class="mt-4 pl-1">
        <BreadCrumb :items="breadItems" />
      </div>
      <div class="mt-4 xl:hidden">
        <TextInput
          class="h-[42px]"
          placeholder="Search here..."
          search-button
          v-model="searchInput"
        />
      </div>
      <div class="mt-4 bg-white px-[18px] py-6 xl:flex xl:items-end xl:gap-4">
        <FormLabel label="Category" class="mb-5 xl:mb-0">
          <CustomSelect :options="categoryOptions" v-model="category" class="xl:w-[222px]" />
        </FormLabel>
        <FormLabel label="Subtitle" class="mb-6 xl:mb-0">
          <TextInput v-model="subtitleInput" class="xl:w-[248px]" />
        </FormLabel>
        <SearchButton />
      </div>
      <div class="mt-5 bg-white px-[10px] py-[17px] xl:bg-transparent xl:px-0">
        <div class="xl:mb-[14px] xl:flex xl:items-center xl:justify-between">
          <h2 class="text-base font-semibold leading-6">My Collection</h2>
          <ListPagination
            :page-size="10"
            :total="480"
            @page-change="handlePageChange"
            class="hidden xl:flex"
          />
        </div>
        <CollectionList :list="collectionList" @cancel-collect="handleCancelCollect" />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
