    // 이미지 추가 
    // Get references to the elements
    const previewImage = document.getElementById('previewImage');
    const profileFileInput = document.getElementById('profileFile');

    // Add an event listener to the file input
    profileFileInput.addEventListener('change', function () {
        // Check if a file was selected
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            // When the image is loaded, update the preview image source
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };

            // Read the image as a data URL
            reader.readAsDataURL(this.files[0]);
        } else {
            // If no file was selected or the selection was canceled, reset the preview image source
            previewImage.src = "../img/광주매머드서석점.jpg";
        }
    });
    function check (){

        let img = document.getElementById('previewImage')
        console.log(img.getAttribute('src'))
    }