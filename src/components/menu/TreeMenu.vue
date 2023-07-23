<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { ITreeMenu } from './type'
import TreeNode from './TreeNode.vue'
import { useTreeMenu } from './useTreeMenu'

const { getIcon, findParentExpandIds, defaultMenu } = useTreeMenu()

const props = defineProps({
  treeData: {
    type: Array as PropType<ITreeMenu[]>,
    default: defaultMenu
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
