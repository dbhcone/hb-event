import axios from 'axios';
const GET = (url: string, params = {}, failure = null) => {
  return axios
    .get(url, {
      params
    })
    .catch(
      failure ||
        (error => {
          console.log(error)
          let {
            response: {
              data: {
                error: { message: errorMessage }
              }
            }
          } = error
          console.log(errorMessage)
        })
    )
}

const POST = (url: string, headers = {}, params = {}, failure = null) => {
  return axios.post(url, params, { headers }).catch(
    failure ||
      (error => {
        let {
          response: {
            data: {
              error: { message: errorMessage }
            }
          }
        } = error
        console.log(errorMessage)
      })
  )
}

const PUT = (url: string, params = {}, failure = null) => {
  return axios.put(url, params).catch(
    failure ||
      (error => {
        let {
          response: {
            data: {
              error: { message: errorMessage }
            }
          }
        } = error
        console.log(errorMessage)
      })
  )
}
export { GET, POST, PUT }
