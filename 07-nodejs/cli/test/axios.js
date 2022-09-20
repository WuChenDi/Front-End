import axios from 'axios'

// https://api.github.com/
// https://api.github.com/users/xxx
// https://api.github.com/users/xxx/repos
const response = await axios.get('https://api.github.com/users/aazf/repos')

const { data } = response

console.log(data.map(({ name, clone_url }) => ({ [name]: clone_url })))
