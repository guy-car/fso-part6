import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, updateAnecdote } from './requests.js'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'



const App = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ 
      type: 'SHOW', 
      payload: { 
        message: `you voted '${anecdote.content}'`, 
        type: 'success' 
      } 
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  

    const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
