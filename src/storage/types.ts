export type StorageFileOperation =
  | 'create'
  | 'update'
  | 'delete'

export type Image = PreviewImage & PreviewBorder & PreviewDimensions

export type ImageCropGravity = 
  | "center" 
  | "top-left" 
  | "top" 
  | "top-right" 
  | "left" 
  | "right" 
  | "bottom-left" 
  | "bottom" 
  | "bottom-right"

export type OutputFormat = 
  | "jpeg"
  | "jpg"
  | "png"
  | "gif"
  | "webp"

export type PreviewImage = {
  gravity?: ImageCropGravity,
  quality?: number,
  opacity?: number,
  rotation?: number,
  background?: string,
  output?: OutputFormat,
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