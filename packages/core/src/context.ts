import type { ToasterProps } from 'sonner'

let _position: ToasterProps['position'] = 'bottom-right'
let _spring: boolean = true
let _bounce: number | undefined = undefined

export function setGooeyPosition(position: ToasterProps['position']) {
  _position = position
}

export function getGooeyPosition() {
  return _position
}

export function setGooeySpring(spring: boolean) {
  _spring = spring
}

export function getGooeySpring() {
  return _spring
}

export function setGooeyBounce(bounce: number | undefined) {
  _bounce = bounce
}

export function getGooeyBounce() {
  return _bounce
}
