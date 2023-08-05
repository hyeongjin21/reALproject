let inputId = document.getElementById('id_len')
let join = document.getElementById('join')
let checking = document.getElementsByClassName('checking')

const checkId = () => {
    console.log(inputId.value)
    let id = inputId.value;
    let url = 'http://localhost:3333/user/checkId';
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: id
        })
    })
        .then(res => res.json()) 
        .then(res => {
            document.getElementsByClassName('checking').value = res.check
            if(res.check == 1){
                alert('중복되었습니다.')
            }
            else if(res.check == 2){
                alert('사용가능합니다.')
            }
            else{
                alert('아이디 중복 확인')
            }
        })
}