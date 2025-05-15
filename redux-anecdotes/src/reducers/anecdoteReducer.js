import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    handleVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
}
})

export const { handleVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    console.log('I initialized anecdotes!', anecdotes)
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    console.log('I created an anecdote!', newAnecdote)
  }
}

export const voteForAnecdote = id => {
  return async dispatch => {
    try {
      const updatedAnecdote = await anecdoteService.voteAnecdote(id)
      dispatch(handleVote(updatedAnecdote.id))
      console.log('I voted!')
    } catch (error) {
      console.error('Error voting for anecdote: ', error)
    }
  }
}

// Export the reducer as default
export default anecdoteSlice.reducer