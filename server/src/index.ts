import cors from 'cors'
import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 3021

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'server', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
