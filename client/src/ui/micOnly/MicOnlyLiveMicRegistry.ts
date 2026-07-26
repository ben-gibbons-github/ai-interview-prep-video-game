let liveMicActive = false

export function setLiveMicActive(active: boolean): void {
  liveMicActive = active
}

export function isLiveMicActive(): boolean {
  return liveMicActive
}
