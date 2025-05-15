import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setTemporaryNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const filteredAnecdotes = useSelector(({ filter, anecdotes }) => 
        anecdotes.filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      )

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id))
        dispatch(setTemporaryNotification(`You voted for "${anecdote.content}"`, 5))
    }
      
      
    const listEl =
    sortedAnecdotes.map(anecdote =>
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

    return (
        <>
            {listEl}
        </>
    )
}

export default AnecdoteList