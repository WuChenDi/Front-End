import { ComponentPublicInstance, Directive } from '@vue/runtime-core'

export function ssrGetDirectiveProps(
  instance: ComponentPublicInstance,
  dir: Directive,
  value?: any,
  arg?: string,
  modifiers: Record<string, boolean> = {}
): Record<string, any> {
  if (typeof dir !== 'function' && dir.getSSRProps) {
    return (
      dir.getSSRProps(
        {
          dir,
          instance,
          value,
          oldValue: undefined,
          arg,
          modifiers
        },
        null as any
      ) || {}
    )
  }
  return {}
}
