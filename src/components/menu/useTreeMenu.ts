import { defineAsyncComponent } from "vue";

export function useTreeMenu() {
  function getIcon(iconName: string) {
    return defineAsyncComponent(() => import(`@/components/icons/${iconName}.vue`))
  }

  return { getIcon };
}