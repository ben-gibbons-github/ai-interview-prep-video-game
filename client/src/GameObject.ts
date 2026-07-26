import * as THREE from 'three'

export type GameObjectUpdate = (delta: number, elapsed: number, object: GameObject) => void

type Vector3Input = THREE.Vector3Tuple | readonly [number, number, number]
type EulerInput = THREE.EulerTuple | readonly [number, number, number]

export interface ModelPlacement {
  position?: Vector3Input
  rotation?: EulerInput
  scale?: number | Vector3Input
}

export interface SpritePlacement {
  position?: Vector3Input
  scale?: number
  rotation?: number
  color?: THREE.ColorRepresentation
  opacity?: number
  transparent?: boolean
  depthWrite?: boolean
  blending?: THREE.Blending
}

export class GameObject {
  readonly group = new THREE.Group()

  update: GameObjectUpdate = () => {}

  private readonly disposers: Array<() => void> = []
  private readonly children: GameObject[] = []
  private disposed = false

  constructor(name = 'GameObject') {
    this.group.name = name
  }

  addTo(scene: THREE.Scene | THREE.Group) {
    scene.add(this.group)
    return this
  }

  addChild(child: GameObject) {
    this.children.push(child)
    this.group.add(child.group)
    return child
  }

  addModel<T extends THREE.Object3D>(model: T, placement: ModelPlacement = {}) {
    return this.addObject(model, placement)
  }

  addObject<T extends THREE.Object3D>(object: T, placement: ModelPlacement = {}) {
    this.ensureActive()
    this.group.add(object)
    this.applyPlacement(object, placement)
    this.trackObjectAssets(object)
    return object
  }

  addSprite(texture: THREE.Texture, placement: SpritePlacement = {}) {
    this.ensureActive()

    const material = new THREE.SpriteMaterial({
      map: texture,
      color: placement.color ?? '#ffffff',
      opacity: placement.opacity ?? 1,
      transparent: placement.transparent ?? true,
      depthWrite: placement.depthWrite ?? false,
      blending: placement.blending ?? THREE.AdditiveBlending,
    })

    const sprite = new THREE.Sprite(material)
    if (placement.position) {
      sprite.position.set(placement.position[0], placement.position[1], placement.position[2])
    }
    if (typeof placement.scale === 'number') {
      sprite.scale.setScalar(placement.scale)
    }
    if (typeof placement.rotation === 'number') {
      sprite.material.rotation = placement.rotation
    }

    this.group.add(sprite)
    this.trackDisposable(() => texture.dispose())
    this.trackDisposable(() => material.dispose())
    return sprite
  }

  dispose() {
    if (this.disposed) {
      return
    }

    this.disposed = true
    for (let index = 0; index < this.children.length; index += 1) {
      this.children[index].dispose()
    }
    while (this.disposers.length > 0) {
      const disposer = this.disposers.pop()
      disposer?.()
    }
    this.group.removeFromParent()
  }

  tick(delta: number, elapsed: number) {
    if (this.disposed) {
      return
    }

    this.update(delta, elapsed, this)
    for (let index = 0; index < this.children.length; index += 1) {
      this.children[index].tick(delta, elapsed)
    }
  }

  private trackDisposable(disposer: () => void) {
    this.disposers.push(disposer)
  }

  private trackObjectAssets(object: THREE.Object3D) {
    object.traverse((child) => {
      const geometry = (child as THREE.Object3D & { geometry?: { dispose: () => void } }).geometry
      if (geometry) {
        this.trackDisposable(() => geometry.dispose())
      }

      const material = (
        child as THREE.Object3D & {
          material?:
            | { dispose: () => void }
            | Array<{ dispose: () => void }>
        }
      ).material

      if (material) {
        if (Array.isArray(material)) {
          material.forEach((entry) => this.trackDisposable(() => entry.dispose()))
        } else {
          this.trackDisposable(() => material.dispose())
        }
      }

      if (child instanceof THREE.Sprite) {
        const material = child.material
        this.trackDisposable(() => material.map?.dispose())
        this.trackDisposable(() => material.dispose())
      }
    })
  }

  private applyPlacement(object: THREE.Object3D, placement: ModelPlacement) {
    if (placement.position) {
      object.position.set(placement.position[0], placement.position[1], placement.position[2])
    }

    if (placement.rotation) {
      object.rotation.set(placement.rotation[0], placement.rotation[1], placement.rotation[2])
    }

    if (typeof placement.scale === 'number') {
      object.scale.setScalar(placement.scale)
    } else if (placement.scale) {
      object.scale.set(placement.scale[0], placement.scale[1], placement.scale[2])
    }
  }

  private ensureActive() {
    if (this.disposed) {
      throw new Error('Cannot use a disposed GameObject')
    }
  }
}