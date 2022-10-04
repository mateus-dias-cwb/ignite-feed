import { PencilSimpleLine } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'

export function Sidebar() {
 return(
  <aside className={styles.sidebar}>
    <img
      src="https://images.unsplash.com/photo-1664196974407-e7b2cf3858ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40"
      className={styles.cover}
    />
    <div className={styles.profile}>
      <Avatar
        src="https://github.com/mateus-dias-cwb.png"
        hasBorder
      />
      <strong>Mateus Dias</strong>
      <span>Web Developer</span>
    </div>

    <footer>
      <a href="#">
        <PencilSimpleLine />
        Editar seu perfil
      </a>
    </footer>
  </aside>
 ) 
}