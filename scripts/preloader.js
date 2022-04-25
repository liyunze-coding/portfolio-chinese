function move(elem_id) {
    return new Promise((resolve, reject)=>{
        var elem = document.getElementById(elem_id);
        var width = 1;
        var id = setInterval(frame, 5);
        function frame() {
            width++;
            elem.style.width = width + '%'; 
            
            if (width >= 100){
                clearInterval(id);
                resolve();
            }
        }
    })
}