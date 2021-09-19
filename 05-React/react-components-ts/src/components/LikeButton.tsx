import React, {useEffect, useRef, useState} from 'react'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  const [obj, setObj] = useState({like: 0, on: true})
  // const positions = useMousePosition()

  const likeRef = useRef(0)

  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)

  // 首次与每次渲染都会执行
  useEffect(() => {
    console.log('document title effect is running')

    document.title = `点击来${like}次`
  }, [like, on])

  useEffect(() => {
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })

  useEffect(() => {
    if (domRef?.current) {
      domRef.current.focus()
    }
  })

  function handleAlertClick() {
    setTimeout(() => {
      alert(`you clicked on ${likeRef.current}`)
    }, 3000)
  }

  return (
    <>
      <input type='text' ref={domRef}/>
      {/* <>
        <p>X:{positions.x}</p>
        <p>Y:{positions.y}</p>
      </> */}
      <button
        onClick={() => {
          setLike(like + 1);
          likeRef.current++
        }}
      >
        {like}👍
      </button>
      <button
        onClick={() => {
          setOn(!on)
        }}
      >
        {on ? 'ON' : 'OFF'}
      </button>
      <button
        onClick={() => {
          setObj({like: obj.like + 1, on: obj.on})
        }}
      >
        {obj.like}👍
      </button>
      <button
        onClick={() => {
          setObj({like: obj.like, on: !obj.on})
        }}
      >
        {obj.on ? 'ON' : 'OFF'}
      </button>

      <button onClick={handleAlertClick}> Alert</button>
    </>
  )
}

export default LikeButton
