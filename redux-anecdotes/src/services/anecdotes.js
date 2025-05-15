import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    console.log('I posted a note: ', response.data.content);
    
    return response.data
}

const voteAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const currentAnecdote = response.data
    const updatedAnecdote = {...currentAnecdote, votes: currentAnecdote.votes + 1}
    const putResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return putResponse.data
}


export default { getAll, createNew, voteAnecdote }