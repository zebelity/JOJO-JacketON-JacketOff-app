
import './App.css'
import Homepage from 'pages/Homepage'
import Alert from 'components/Alert'
import Location from 'components/Location'
import Today from 'components/Today'
import Setting from 'components/Setting'

export default function App () {

  return (
    <>
    <section className='top-content'>
      < Alert />
    </section>
    < Homepage />
    <section className='footer-content'>
      < Location />
      < Today />
      < Setting />

    </section>
    </>
  )
}
