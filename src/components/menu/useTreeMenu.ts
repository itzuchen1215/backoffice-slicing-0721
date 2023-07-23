import { defineAsyncComponent } from 'vue'
import type { ITreeMenu } from './type'

export function useTreeMenu() {
  const defaultMenu: ITreeMenu[] = [
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

  return { getIcon, findParentExpandIds, defaultMenu }
}
