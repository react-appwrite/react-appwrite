export type StorageFileOperation =
  | 'create'
  | 'update'
  | 'delete'

export type Image = PreviewImage | PreviewBorder | PreviewDimensions

export type PreviewImage = {
  gravity?: number,
  quality?: number,
  opacity?: number,
  rotation?: number,
  background?: string,
  output?: string,
}

export type PreviewBorder = {
  borderColor?: string,
  borderRadius?: number,
  borderWidth?: number,
}

export type PreviewDimensions = {
  width?: number,
  height?: number
}