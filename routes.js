const router = require('express').Router()
const Pool = require('pg').Pool

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'final-project-server',
  password: 'admin',
  port: 5432
})

router.get('/', (req, res)=>{
  let fetchQuery = 'select * from track'
  pool.query(fetchQuery, (err, result)=>{
    if(err){
      res.status(400).json(err)
    }
    else{
      res.status(200).json(result.rows)
    }
  })

})

router.post('/', (req, res)=>{
  let dataQuery = 'INSERT INTO track (id, playlist_id, title, uri, master_id) VALUES($1, $2, $3, $4, $5)'
  let data = {
    id: parseInt(req.body.id),
    playlist_id: parseInt(req.body.playlist_id),
    title: req.body.title,
    uri: req.body.uri,
    master_id: parseInt(req.body.master_id)
  }
  console.log(data)
  pool.query(dataQuery, [data.id, data.playlist_id, data.title, data.uri, data.master_id], (err, result)=>{
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(result.rows)
    }
  })
})

router.delete('/delete/:id', (req,res)=>{
  let id = req.params.id
  console.log(id)
  pool.query('DELETE FROM track WHERE id = $1', [id], (err, result)=>{
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json('Track is deleted')
    }
  })

})


module.exports = router
