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
    shopLocation: `select a.lat, a.lng from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.shop_seq = ?`,
    
    
    
    
    ///////// 관리자페이지 /////////

    //// 회원관리 ////
    // 사용자 모두 가져오기
    userAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, user_seq, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at FROM al_user`,
    
    // 사용자 검색
    userNameSearch: `select row_number() over (ORDER BY created_at) AS rownum, user_seq, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at from al_user where user_id like ?`,
    
    // 회원 관리 - 사용자 삭제
    userDelete : `delete from al_user where user_seq = ?`,

    // 가게 모두 가져오기
    shopAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_seq, shop_img, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop`,
    
    // 가게 수정
    shopModify : `update al_shop set shop_name=?, shop_bno=?, shop_addr1=?, shop_addr2=?, shop_tel=?, shop_owner=? where shop_seq=?`,
    
    // 하나의 가게정보 가져오기
    shopMenu: `SELECT row_number() over (order by menu_seq) as rownum, shop_seq, menu_seq, menu_name, menu_price, menu_desc, menu_type, menu_options, menu_category, menu_ingredient_tag, menu_img FROM al_menu where shop_seq = ? `,
    
    
    // 가게 검색
    shopNameSearch: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_seq, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop where shop_name like ?`,
    
    // 가게 삭제
    shopDelete : `delete from al_shop where shop_seq = ?`,

    // 메뉴정보 전체 출력
    menuInfoAll: `select * from al_menu`,
    
    // 메뉴 등록하기
    insertMenu:'INSERT INTO al_menu (shop_seq, menu_name, menu_price, menu_desc, menu_type, menu_options, menu_category, menu_ingredient_tag, menu_img) VALUES(?,?,?,?,?,?,?,?,?)',
    
    // 메뉴 삭제하기
    menuDelete : `delete from al_menu where menu_seq = ? `,
    
    
    //// 카페관리 ////
    // 가게 등록하기
    insertShop : `INSERT INTO al_shop (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, shop_img) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    
    // 가게 위치 정보 가져오기
    shopLocationAll : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop `,
    
    // 가게 위치 검색
    shopLocationSearch : `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop where shop_name like ?`,

    // 리뷰 관리 - 전체 검색
    reviewAll : `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq `,

    // 리뷰 관리 - 카테고리 검색(글쓴이)
    reviewSearchUser : `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq 
 where c.user_id like ?`,

    // 리뷰 관리 - 카테고리 검색(내용)
    reviewSearchContent : `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq 
 where c.review_content like ?`,

    // 리뷰 관리 - 삭제
    reviewDelete : `delete from al_review where review_seq = ?`,




//////// 마이페이지 ..///////////////
  myShop : `select b.menu_img from al_favorite_menu a inner join al_menu b on (a.menu_seq = b.menu_seq) where a.user_id = ?`













}



