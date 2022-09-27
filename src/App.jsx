// Components
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar"

// Styles
import './global.css'
import styles from './App.module.css'

export function App() {

  return (
    <>
      <Header/>

      <div className={ styles.wrapper }>
        <Sidebar/>
        <main>

        </main>
      </div>
    </>
  )
}
