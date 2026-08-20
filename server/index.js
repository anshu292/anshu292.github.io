import 'dotenv/config'
import app from './app.js'

const port = process.env.API_PORT || 3001

app.listen(port, () => {
  console.log(`Ozyma API listening on http://localhost:${port}`)
})
