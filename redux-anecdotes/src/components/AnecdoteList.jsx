import { useDispatch, useSelector } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'

const AnecodteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const listEl =
    anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(handleVote(anecdote.id))}>vote</button>
      </div>
    </div>
  )

    return (
        <>
            {listEl}
        </>
    )
}

export default AnecodteList