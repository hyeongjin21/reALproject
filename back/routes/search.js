const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')

router.get('/', (req, res) => {
    let category = req.query.category
    let searchCategory = req.query.category
    let menu = "%" + req.query.inputmenu + "%"
    if (category == 'all') {
        conn.query(queries.searchMenu, [menu], (err, rows) => {
            if (rows.length > 0) {
                // res.json({menu:rows})
                res.render('search', { list: rows })
            }
            else{
                res.render('search')
            }
        })
    }
    else {
        conn.query(queries.searchMenuCategory, [menu, searchCategory], (err, rows) => {
            if (rows.length > 0) {
                // res.json({menu:rows})
                res.render('search', { list: rows })
            }
            else{
                res.render('search')
            }
        })
    }
})

router.get('/get-coordinate',(req,res)=>{
    conn.query(queries.selectLocationAll,(err,rows)=>{
        if(rows.length>0){
            res.json({result: rows})
        }
    })
})

router.get('/getMenu',(req,res)=>{
    console.log('getMenu called')
    console.log('search.getmenu req:',req.query)
    let getCategory = req.query.category
    let searchCategory = req.query.category
    let getMenu = "%" + req.query.inputmenu + "%"
    if (getCategory == 'all') {
        conn.query(queries.searchMenu, [getMenu], (err, rows) => {
            if (rows.length > 0) {
                // console.log('query.rows',rows[0].shop_name)
                res.json({list:rows})
                // res.render('search')
            }
            else{
                res.render('search')
            }
            // res.render('search')
        })
    }
    else {
        conn.query(queries.searchMenuCategory, [getMenu, searchCategory], (err, rows) => {
            if (rows.length > 0) {
                res.json({list:rows})
                // res.render('search')
            }
            else{
                res.render('search')
            }
            // res.render('search')
        })
    }
    // res.json({ category : getCategory , menu : getMenu})
})

module.exports = router; 