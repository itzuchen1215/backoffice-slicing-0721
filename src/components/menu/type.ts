export interface ITreeMenu {
  id: string
  label: string
  path: string | null
  icon?: string
  children?: ITreeMenu[]
}

export type TreeMenuNode = Omit<ITreeMenu, 'children'>

export interface ITreeDetail {
  group: number
  level: number
}