import { Outlet } from 'react-router-dom'
import MainHeader from '../components/MainHeader'

function App() {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  )
}

export default App
