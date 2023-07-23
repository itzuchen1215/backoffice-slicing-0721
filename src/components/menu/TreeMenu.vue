<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { ITreeMenu } from './type'
import TreeNode from './TreeNode.vue'
import { useTreeMenu } from './useTreeMenu'

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
    default: false
  },
  defaultActive: {
    type: String,
    default: 'b-2-2'
  }
})

const emit = defineEmits(['clickNarrowIcon'])

const { getIcon, findParentExpandIds } = useTreeMenu()

const activeNode = ref<string | null>(null)
const expandIds = ref<string[]>([])

function init() {
  if (props.defaultActive) {
    activeNode.value = props.defaultActive
    let initExpandIds: string[] = []
    findParentExpandIds(props.treeData, props.defaultActive, initExpandIds)
    expandIds.value = initExpandIds
  }
}
init()

function handleClickMenu(item: ITreeMenu) {
  if (item.path) {
    activeNode.value = item.id
    // router.push
  }
  if (item.children) {
    toggleList(item.id)
  }
}

function handleClickNarrowIcon(item: ITreeMenu) {
  if (!expandIds.value.includes(item.id)) {
    expandIds.value.push(item.id)
  }
  emit('clickNarrowIcon')
}

function toggleList(id: string) {
  if (expandIds.value.includes(id)) {
    expandIds.value = expandIds.value.filter((v) => v !== id)
  } else {
    expandIds.value.push(id)
  }
}

function isChildrenExpand(id: string) {
  return expandIds.value.includes(id)
}

function isActive(id: string) {
  return activeNode.value === id
}

function isActiveGroup(id: string) {
  if (!activeNode.value) {
    return false
  }
  let activeGroup: string[] = []
  findParentExpandIds(props.treeData, activeNode.value, activeGroup)
  return activeGroup.includes(id)
}
</script>

<template>
  <ul
    v-if="treeData && treeData.length > 0"
    class="overflow-touch h-full overflow-y-auto overflow-x-hidden bg-[#F2F2F7] xl:w-[var(--left-menu-width)]"
    :class="{ 'xl:w-[var(--left-menu-width-narrow)]': !isExpand }"
  >
    <li v-for="level0Item in treeData" :key="level0Item.id">
      <template v-if="isExpand">
        <TreeNode
          @click="handleClickMenu(level0Item)"
          :level="0"
          :isActive="isActive(level0Item.id)"
          :treeNode="level0Item"
        />
      </template>
      <!-- narrow version icon list -->
      <template v-else>
        <div
          v-if="level0Item.icon"
          class="mb-[38px] ml-[18px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] first:mt-3 last:mb-0 hover:bg-[#D8DDEB]"
          :class="{ 'bg-[#D8DDEB]': isActiveGroup(level0Item.id) }"
          @click="handleClickNarrowIcon(level0Item)"
        >
          <Suspense>
            <component class="text-xl" :is="getIcon(level0Item.icon)" />
          </Suspense>
        </div>
      </template>
      <template v-if="level0Item.children">
        <ul v-show="isChildrenExpand(level0Item.id)" :class="{ hidden: !isExpand }">
          <li v-for="level1Item in level0Item.children" :key="level1Item.id">
            <TreeNode
              @click="handleClickMenu(level1Item)"
              :level="1"
              :isActive="isActive(level1Item.id)"
              :treeNode="level1Item"
            />
            <template v-if="level1Item.children">
              <ul v-show="isChildrenExpand(level1Item.id)">
                <li v-for="level2Item in level1Item.children" :key="level2Item.id">
                  <TreeNode
                    @click="handleClickMenu(level2Item)"
                    :level="2"
                    :isActive="isActive(level2Item.id)"
                    :treeNode="level2Item"
                  />
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>
