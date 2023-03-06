export type AvatarType =
  | 'card'
  | 'browser'
  | 'country'
  | 'image'
  | 'favicon'
  | 'qr'
  | 'initials'

export type Avatar = AvatarInitials | AvatarImage | AvatarBrowser | AvatarFavicon | AvatarQrCode | AvatarCard

export type AvatarInitials = {
  type: 'initials',
  name?: string,
  dimensions?: AvatarDimensions,
  background?: string,
}

export type AvatarFavicon = {
  type: 'favicon',
  url: string,
}

export type AvatarCard = {
  type: 'card',
  code: AvatarCardCode,
  dimensions?: AvatarDimensions,
  quality?: number,
}

export type AvatarCardCode =
  | 'amex'
  | 'argencard'
  | 'cabal'
  | 'censosud'
  | 'diners'
  | 'discover'
  | 'elo'
  | 'hipercard'
  | 'jcb'
  | 'mastercard'
  | 'naranja'
  | 'targeta-shopping'
  | 'union-china-pay'
  | 'visa'
  | 'mir'
  | 'maestro'

export type AvatarQrCode = {
  type: 'qr',
  text: string,
  size?: number,
  margin?: number,
  download?: boolean,
}

export type AvatarBrowserCode =
  | 'aa'
  | 'an'
  | 'ch'
  | 'ci'
  | 'cm'
  | 'cr'
  | 'ff'
  | 'sf'
  | 'mf'
  | 'ps'
  | 'oi'
  | 'om'
  | 'op'
  | 'on'

export type AvatarBrowser = {
  type: 'browser',
  code: AvatarBrowserCode,
  dimensions?: AvatarDimensions,
  quality?: number,
}

export type AvatarImage = {
  type: 'image',
  url: string,
  dimensions?: AvatarDimensions,
}

export type AvatarDimensions = {
  width?: number,
  height?: number,
}