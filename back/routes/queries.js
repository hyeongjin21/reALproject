module.exports = {
    // 일반 회원가입 할때 
    joinUser: `insert into al_user values( ?,?,?,?,?,now() )`,

    selectID: `select * from al_user where user_id = ?`,
    // 아이디 검색
    searchId: `select * from al_user where user_id = ? and user_pw = ?`,

    //메뉴검색 & 카테고리(전체 선택)
    searchMenu: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ?`,

    //메뉴검색 - 카테고리별 선택
    searchMenuCategory: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ? and b.menu_category = ?`,

    //검색 - 메뉴선택 - 지도 위도 경도가져오기
    shopLocation : `select a.lat, a.lng from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.shop_seq = ?`,



    ///// 관리자페이지 /////
    //사용자 모두 가져오기
    userAll : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at FROM al_user`,

    // 사용자 검색
    userNameSearch : `select row_number() over (ORDER BY created_at) AS rownum, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at from al_user where user_name like ?`,

    // 사업자 모두 가져오기
    shopAll : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop`,

    // 사업자 검색
    shopNameSearch : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop where shop_name like ?`,
    

    // 가게 등록하기
    insertShop : `INSERT INTO al_shop (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner) VALUES(?, ?, ?, ?, ?, ?)`,
    // (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner) 

    // 가게 위치 정보 가져오기
    shopLocationAll : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop `,

    // 가게 위치 검색
    shopLocationSearch : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop where shop_name like ?`,

    // 리뷰 전체 검색
    reviewAll : `select * from al_review`











}


