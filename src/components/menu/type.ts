export interface ITreeMenu {
  id: string
  label: string
  path: string | null
  icon?: string
  children?: ITreeMenu[]
}