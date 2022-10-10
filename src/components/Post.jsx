import { useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow, formatISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function Post({ author, content, publishedAt }) {

  const dateTitle = format(publishedAt, "dd 'de' LLLL 'de' uuuu 'às' HH':'mm'h'", {locale: ptBR})
  const dateName = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const [commentArray, setCommentArray] = useState([
    'Muito top!',
  ])
  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment() {
    event.preventDefault()
    setCommentArray([...commentArray, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange() {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete) {
    const newCommentArrayWithoutDeletedOne = commentArray.filter(comment => {
      return comment !== commentToDelete
    })
    setCommentArray(newCommentArrayWithoutDeletedOne)
  }

  return(
    <article className={styles.post}>

      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={dateTitle} dateTime={formatISO(publishedAt)}>
          {dateName}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          switch (item.type) {
            case 'paragraph':
              return <p key={item.content}>{item.content}</p>
              break;
            case 'link':
              return <p key={item.content}><a href="">{item.content}</a></p>
              break;
            default:
              break;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe seu comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {commentArray.map(text => {
          return <Comment key={text} content={text} onDeleteComment={deleteComment}/> 
        })}
      </div>
      
    </article>
  )
}