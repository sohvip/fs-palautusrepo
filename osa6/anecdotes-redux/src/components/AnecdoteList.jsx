import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(anecdoteVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }
  
  return (
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
