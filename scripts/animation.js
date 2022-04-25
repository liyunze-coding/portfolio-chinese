function animate_load(elem_id, length) {
    return new Promise((resolve, reject)=>{
        var elem = document.getElementById(elem_id);
        var width = 1;
        var id = setInterval(frame, 5);
        
        function frame() {
            if (width >= length) {
                clearInterval(id);
                resolve();
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    })
}