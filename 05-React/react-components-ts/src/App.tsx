import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'

import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import useURLLoader from './hooks/useURLLoader'
import withLoader from './components/withLoader'

interface IShowResult {
  message: string
  status: string
}

const DogShow: React.FC<{ data: IShowResult }> = ({data}) => {
  return (
    <>
      <h2>Dog show:{data.status}</h2>
      <img src={data.message} alt=''/>
    </>
  )
}

const App: React.FC = () => {
  const [show, setShow] = useState(true)
  // const positions = useMousePosition()

  const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])

  const dogResult = data as IShowResult

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo'/>
        <Hello/>
        <LikeButton/>

        {/*{loading ? <p>dog loading...</p> : <img src={dogResult && dogResult.message} alt='dog'/>}*/}

        {/*<WrappedDogShow/>*/}

        <p>
          <button
            onClick={() => {
              setShow(!show)
            }}
          >
            Toggle Tracker
          </button>
        </p>

        {/* <>
          <p>X:{positions.x}</p>
          <p>Y:{positions.y}</p>
        </> */}

        {show && <MouseTracker/>}

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
