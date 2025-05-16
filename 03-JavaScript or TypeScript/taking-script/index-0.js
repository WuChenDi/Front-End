function skip() {
  try {
    const video = document.querySelector('video')
    if (!video) {
      console.warn('未找到视频元素')
      return false
    } // Check if video metadata is loaded

    if (video.readyState >= 1) {
      video.currentTime = video.duration
      return true
    } else {
      // If metadata is not loaded yet, add an event listener
      video.addEventListener(
        'loadedmetadata',
        () => {
          video.currentTime = video.duration
        },
        { once: true } // Ensure the event listener is removed after execution
      )
      return true
    }
  } catch (error) {
    console.error('跳过视频时发生错误:', error)
    return false
  }
}

skip()
