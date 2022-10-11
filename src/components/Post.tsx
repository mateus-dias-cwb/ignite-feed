import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow, formatISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }:PostProps) {

  const dateTitle = format(publishedAt, "dd 'de' LLLL 'de' uuuu 'às' HH':'mm'h'", {locale: ptBR})
  const dateName = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const [commentArray, setCommentArray] = useState([
    'Muito top!',
  ])
  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    setCommentArray([...commentArray, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)
    event.target.setCustomValidity('')
  }

  function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("O comentário não pode estar vazio!")
  }

  function deleteComment(commentToDelete: string) {
    const newCommentArrayWithoutDeletedOne = commentArray.filter(comment => {
      return comment !== commentToDelete
    })
    setCommentArray(newCommentArrayWithoutDeletedOne)
  }

  const isCommentInputEmpty = newCommentText === ''

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
          onInvalid={handleInvalidNewComment}
          required
        />

        <footer>
          <button type='submit' disabled={isCommentInputEmpty}>
            Publicar
          </button>
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