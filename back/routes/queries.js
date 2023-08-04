module.exports = {
    // 일반 회원가입 할때 
    joinUser :`insert into al_user values( ?,?,?,?,?,now() )`,

    // 아이디 검색
    searchId : `select * from al_user where user_id = ? and user_pw = ?`,

}