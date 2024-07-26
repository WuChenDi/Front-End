import { getCurrentInstance, ref, computed } from 'vue'
import { Loading } from 'element-ui'

// import {
//   useRoute,
//   useRouter,
//   useLink,
//   onBeforeRouteUpdate,
//   onBeforeRouteLeave,
// } from 'vue-router/composables'

/**
 * @deprecated
 *
 * 使用替代 `import { useRoute } from 'vue-router/composables'`
 */
export const useRoute = () => {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('useRoute must be called in setup')

  return instance.proxy.$route
}

/**
 * @deprecated
 *
 * 使用替代 `import { useRouter } from 'vue-router/composables'`
 */
export const useRouter = () => {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('useRouter must be called in setup')

  return instance.proxy.$router
}

export const useStore = () => {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('useStore must be called in setup')

  return instance.proxy.$store
}

export const useStoreGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map((getter) => [
      getter,
      computed(() => store.getters[getter]),
    ])
  )
}

export const mapGetter = (key) => {
  const store = useStore()
  return computed(() => store.getters[key])
}

export const useLoading = (target) => {
  const loading = ref()
  const openLoading = () => {
    loading.value = Loading.service({ target, fullscreen: false })
  }
  const closeLoading = () => {
    loading.value && loading.value.close()
  }

  return [openLoading, closeLoading]
}
