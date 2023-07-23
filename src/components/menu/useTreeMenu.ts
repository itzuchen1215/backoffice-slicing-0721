import { defineAsyncComponent } from 'vue'
import type { ITreeMenu } from './type'

export function useTreeMenu() {
  function getIcon(iconName: string) {
    return defineAsyncComponent(() => import(`@/components/icons/${iconName}.vue`))
  }

  function findParentExpandIds(treeData: ITreeMenu[], targetId: string, result: string[]) {
    for (const item of treeData) {
      if (item.id === targetId) {
        result.unshift(item.id)
        return true
      }

      if (item.children && item.children.length > 0) {
        const isContinue = findParentExpandIds(item.children, targetId, result)
        if (isContinue) {
          result.unshift(item.id)
          return true
        }
      }
    }
    return false
  }

  return { getIcon, findParentExpandIds }
}
