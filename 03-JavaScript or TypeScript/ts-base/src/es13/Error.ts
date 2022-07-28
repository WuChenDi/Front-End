{
  // async function doJob() {
  //   const rawResource = await fetch('//domain/resource-a')
  //     .catch(err => {
  //       throw new Error('Download raw resource failed', { cause: err })
  //     })
  //   const jobResult = doComputationalHeavyJob(rawResource)
  //   await fetch('//domain/upload', { method: 'POST', body: jobResult })
  //     .catch(err => {
  //       throw new Error('Upload job result failed', { cause: err })
  //     })
  // }
  //
  // try {
  //   await doJob()
  // } catch (e) {
  //   const error = e as unknown as Error
  //   console.log(error) // Error: Download raw resource failed
  //   console.log('Caused by', error.cause) // Caused by TypeError: Failed to fetch
  // }
}

export {}

// https://github.com/legendecas
//  https://github.com/tc39/proposal-error-cause
