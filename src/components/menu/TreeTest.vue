<script setup lang="ts">
import { defineAsyncComponent, ref, type PropType, computed, nextTick } from 'vue'
import type { ITreeDetail, ITreeMenu, TreeMenuNode } from './type'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

const props = defineProps({
  treeData: {
    type: Array as PropType<ITreeMenu[]>,
    default: [
      {
        id: 'a',
        label: 'Home General',
        path: null,
        icon: 'IconHome',
        children: [
          {
            id: 'a-1',
            label: 'Home dummy',
            path: '/dummy'
          }
        ]
      },
      {
        id: 'b',
        label: 'Marketing &  Sales',
        path: null,
        icon: 'IconMarketing',
        children: [
          {
            id: 'b-1',
            label: 'Option_1',
            path: '/op1'
          },
          {
            id: 'b-2',
            label: 'Option_2',
            path: null,
            children: [
              {
                id: 'b-2-1',
                label: 'Suboption_1',
                path: '/sub-op1'
              },
              {
                id: 'b-2-2',
                label: 'Suboption_2',
                path: '/sub-op2'
              },
              {
                id: 'b-2-3',
                label: 'Suboption_3',
                path: '/sub-op3'
              }
            ]
          },
          {
            id: 'b-3',
            label: 'Option_3',
            path: '/op3'
          }
        ]
      },
      {
        id: 'c',
        label: 'Customer Service & Operation',
        path: null,
        icon: 'IconCustomerService',
        children: [
          {
            id: 'c-1',
            label: 'CS Option_1',
            path: '/cs-op1'
          }
        ]
      },
      {
        id: 'd',
        label: 'Carrier Management',
        path: null,
        icon: 'IconCarrier',
        children: [
          {
            id: 'd-1',
            label: 'Carrier Option_1',
            path: '/carrier-op1'
          }
        ]
      },
      {
        id: 'e',
        label: 'Finance & Accounting',
        path: null,
        icon: 'IconCaculator',
        children: [
          {
            id: 'e-1',
            label: 'Finance Option_1',
            path: '/finance-op1'
          }
        ]
      },
      {
        id: 'f',
        label: 'HR Development & Organization Setup',
        path: null,
        icon: 'IconHumanResource',
        children: [
          {
            id: 'f-1',
            label: 'HR Option_1',
            path: '/hr-op1'
          }
        ]
      }
    ]
  },
  isExpand: {
    type: Boolean,
    default: false,
  },
  defaultActive: {
    type: String,
    default: 'b-2-3'
  }
})

const activeNode = ref<string | null>(null);
const expandIds = ref<string[]>([])

function getIcon(iconName: string) {
  return defineAsyncComponent(() => import(`@/components/icons/${iconName}.vue`))
}

function init() {
  if (props.defaultActive) {
    activeNode.value = props.defaultActive;
    let initExpandIds: string[] = [];
    findParentExpandIds(props.treeData, props.defaultActive, initExpandIds);
    expandIds.value = initExpandIds;
  }
}
init();

function findParentExpandIds(treeData: ITreeMenu[], targetId: string, result: string[]) {
  for (const item of treeData) {
    if (item.id === targetId) {
      result.unshift(item.id);
      return true;
    }

    if (item.children && item.children.length > 0) {
      console.log('hasChildren', item.id);
      const isContinue = findParentExpandIds(item.children, targetId, result)
      if (isContinue) {
        result.unshift(item.id);
        return true;
      }
    }
  }
  return false;
}

function handleClickMenu(item: ITreeMenu, treeDetail: ITreeDetail) {
  if (item.path) {
    activeNode.value = item.id
    console.log(`router.push(${item.path})`)
  }
  if (item.children) {
    toggleList(item.id, treeDetail)
  }
}

function toggleList(id: string, treeDetail: ITreeDetail) {
  if (!treeDetail) {
    return
  }
  if (expandIds.value.includes(id)) {
    expandIds.value = expandIds.value.filter((v) => v !== id)
  } else {
    expandIds.value.push(id)
  }
}

function hasChildren(item: ITreeMenu[] | undefined) {
  return item && item.length > 0
}

function isExpand(id: string) {
  return expandIds.value.includes(id)
}

function isActive(id: string) {
  return activeNode.value === id;
}
</script>

<template>
  <ul
    v-if="treeData && treeData.length > 0"
    class="h-full overflow-touch overflow-y-auto overflow-x-hidden pb-7 bg-[#F2F2F7]"
  >
    <li v-for="(level0Item, groupIndex) in treeData" :key="level0Item.id">
      <div
        class="flex cursor-pointer items-center justify-between py-4 pl-5 pr-9 xl:hover:bg-[#D8DDEB]"
        :class="{'bg-[#D8DDEB]': isActive(level0Item.id)}"
        @click="handleClickMenu(level0Item, { group: groupIndex, level: 0 })"
      >
        <div class="flex items-start gap-3">
          <Suspense>
            <component
              v-if="level0Item.icon"
              class="mt-[2px] text-xl"
              :key="level0Item.icon"
              :is="getIcon(level0Item.icon)"
            />
          </Suspense>
          <span class="text-base font-semibold text-[#11263C]">{{ level0Item.label }}</span>
        </div>
        <IconChevronDown class="text-xs text-[#151D48]" v-if="hasChildren(level0Item.children)" />
      </div>
      <template v-if="level0Item.children">
        <ul v-show="isExpand(level0Item.id)">
          <li v-for="level1Item in level0Item.children" :key="level1Item.id">
            <div
              class="flex cursor-pointer items-center gap-5 py-3 pl-14 xl:hover:bg-[#D8DDEB]"
              :class="{'bg-[#D8DDEB]': isActive(level1Item.id)}"
              @click="handleClickMenu(level1Item, { group: groupIndex, level: 1 })"
            >
              <span class="text-sm font-semibold text-[#11263C]">{{ level1Item.label }}</span>
              <IconChevronDown
                class="text-xs text-[#151D48]"
                v-if="hasChildren(level1Item.children)"
              />
            </div>
            <template v-if="level1Item.children">
              <ul v-show="isExpand(level1Item.id)">
                <li v-for="level2Item in level1Item.children" :key="level2Item.id">
                  <div
                    class="cursor-pointer py-3 pl-[88px] xl:hover:bg-[#D8DDEB]"
                    :class="{'bg-[#D8DDEB]': isActive(level2Item.id)}"
                    @click="handleClickMenu(level2Item, { group: groupIndex, level: 2 })"
                  >
                    <span class="text-sm font-medium text-[#565867]">{{ level2Item.label }}</span>
                  </div>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>