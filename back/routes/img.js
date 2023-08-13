const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const conn = require('../config/database');
const queries = require('./queries');

const router = express.Router();

fs.readdir('./public/uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('./public/uploads');
    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename("menu_img") + Date.now() + ext);
            console.log( "아아아아아아아아 :",path.basename("img") + Date.now() + ext)
        },
    }),
})

const uploads = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/shop_uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename("shop_img") + Date.now() + ext);
            
        },
    }),
})

//메뉴이미지등록
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/admin3_S_info', upload.single('menu_img'), (req, res) => {
    console.log("{ tlqkf:}",req.body)
    console.log("{ dlalkdgf:}",req.file.filename)
    conn.query(queries.insertMenu,
        [
        req.body.shop_seq, 
        req.body.menu_name, 
        req.file.filename,
        req.body.price,
        req.body.temperature, 
        req.body.option, 
        req.body.info, 
        req.body.category,
        req.body.tags
    ],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            conn.query(queries.shopMenu,[req.body.shop_seq],(err,result)=>{
                console.log("test menu : ", result)
                res.render('admin3_S_info', {
                list : result,
                name : req.query.shop_name,
                shop_seq : req.query.shop_seq
                })
                return;

            })
        }
    })
})

// 회원관리 - 가게 수정버튼 -> 수정페이지로 이동
// router.post('/shopInfo_Modify', (req, res) => {
//     // console.log("{ tlqkf:}",req.body)
//     // console.log("{ dlalkdgf:}",req.file.filename)
//     // conn.query(queries.insertMenu,
//     //     [
//     //     req.body.shop_seq, 
//     //     req.body.menu_name, 
//     //     req.body.price,
//     //     req.body.info, 
//     //     req.body.temperature, 
//     //     req.body.option, 
//     //     req.body.category,
//     //     req.body.tags, 
//     //     req.file.filename
//     // ],(err,result)=>{
//     //     if(err){
//     //         console.log(err)
//     //     }else{
//     //         conn.query(queries.menuInfoAll,(e,r)=>{

//     //             console.log()
//     //             console.log(r)
//                 res.render('menu_list', {list: r})
//     //             return;

//     //         })
//     //     }
//     // })
// })

// 가게이미지 등록
router.post('/shop_register', uploads.single('shop_img'), (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername} = req.body
    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
        {
            res.send(`<script>
            alert("빈칸을 빠짐없이 입력해주세요");
            location.href='http://localhost:3333/admin6_shop_register'
            </script>`)
            // res.render('/admin6_shop_register')
        }else{
            conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername, req.file.filename], (err, rows)=>{
            res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
            })
        }
})

//가게이미지 등록수정
router.post('/shopinfo_modify', uploads.single('shop_img'),(req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername} = req.body
    console.log("runnnnnnnnnnnnnnnnnn",req.body)
    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
        {
            res.send(`<script>
            alert("빈칸을 빠짐없이 입력해주세요");
            location.href='http://localhost:3333/shopinfo_modify'
            </script>`)
            // res.render('/admin6_shop_register')
        }else{
            let fileName = ''
            try{
                fileName = req.file.filename
            }catch{
                fileName = req.body.shop_img
            }finally{
                conn.query(queries.updateShop, [shopname, bno, addr1, addr2, tel, ownername, fileName, req.body.shop_seq], (err, rows)=>{
                    if(err){
                        console.log("{err :}",err)
                    }else{
                        console.log("{succece :}",rows)
                        res.send(`<script>alert("${shopname} 카페정보가 수정되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
                    }

                })
            }
        }
})

//메뉴이미지 등록수정
router.post('/admin5_menu_modify', uploads.single('menu_img'),(req, res) => {
    let { menuname, menu_img, price, temperature, option, info, category, tags} = req.body
    console.log("runnnnnnnnnnnnnnnnnn",req.body)
    if(menuname == '' || price == ''|| category =='')
        {
            res.send(`<script>
            alert("빈칸을 빠짐없이 입력해주세요");
            location.href='http://localhost:3333/admin3_S_info'
            </script>`)
        }else{
            let fileName = ''
            try{
                fileName = req.file.filename
            }catch{
                fileName = req.body.menu_img
            }finally{
                console.log(fileName)
                conn.query(queries.updateManu, [menuname, price, info, temperature, option, category, tags, fileName, req.body.menu_seq], (err, rows)=>{
                    if(err){
                        console.log("{err :}",err)
                    }else{
                        console.log("{succece :}",rows)
                        res.send(`<script>alert("${menuname} 메뉴정보가 수정되었습니다.");location.href='http://localhost:3333/admin3_S_info?shop_seq=${req.body.shop_seq}&shop_name=${req.body.shop_name}'</script>`)
                    }

                })
            }
        }
})

module.exports = router;