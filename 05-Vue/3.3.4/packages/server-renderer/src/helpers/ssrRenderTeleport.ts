import { ComponentInternalInstance, ssrContextKey } from 'vue'
import { createBuffer, PushFn, SSRBufferItem, SSRContext } from '../render'

export function ssrRenderTeleport(
  parentPush: PushFn,
  contentRenderFn: (push: PushFn) => void,
  target: string,
  disabled: boolean,
  parentComponent: ComponentInternalInstance
) {
  parentPush('<!--teleport start-->')

  const context = parentComponent.appContext.provides[
    ssrContextKey as any
  ] as SSRContext
  const teleportBuffers =
    context.__teleportBuffers || (context.__teleportBuffers = {})
  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = [])
  // record current index of the target buffer to handle nested teleports
  // since the parent needs to be rendered before the child
  const bufferIndex = targetBuffer.length

  let teleportContent: SSRBufferItem

  if (disabled) {
    contentRenderFn(parentPush)
    teleportContent = `<!--teleport anchor-->`
  } else {
    const { getBuffer, push } = createBuffer()
    contentRenderFn(push)
    push(`<!--teleport anchor-->`)
    teleportContent = getBuffer()
  }

  targetBuffer.splice(bufferIndex, 0, teleportContent)
  parentPush('<!--teleport end-->')
}
