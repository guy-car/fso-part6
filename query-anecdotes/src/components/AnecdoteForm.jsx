import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'

import { createAnecdote } from '../requests.js'

const AnecdoteForm = () => {

//   const onCreate = (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     event.target.anecdote.value = ''
//     console.log('new anecdote')
// }

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ mutationFn: 
    createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
   })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({ 
        type: 'SHOW', 
        payload: { 
          message: 'anecdotes must be at least 5 characters long', 
          type: 'success' 
        } 
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    } else {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
          dispatch({ 
        type: 'SHOW', 
        payload: { 
          message: `you added '${content}'`, 
          type: 'success' 
        } 
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
