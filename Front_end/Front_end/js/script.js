var punches = 0;

function addPunch() {
    var punchHoles = document.querySelectorAll('.punch_hole');
    if (punches < punchHoles.length) {
        punchHoles[punches].classList.add('punched');
        punches++;
        document.getElementById('stamp_count').textContent = punches + ' punches';
        if (punches == punchHoles.length) {
            document.getElementById('reward').textContent = 'Congratulations! You have completed the coupon💛';
        }
    }
}
