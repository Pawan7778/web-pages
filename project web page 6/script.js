const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;


next.addEventListener('click',()=>{
    currentActive++;
    // console.log(currentActive);
    if (currentActive > circles.length) {
        currentActive =circles.length
        
    }
    console.log(currentActive);

})
prev.addEventListener('click',()=>{
    currentActive--;
    // console.log(currentActive);
    if (currentActive < 1) {
        currentActive = 1;
        
    }
    // console.log(currentActive);
    update()
    
})

function update() {
    circles.forEach((item, index) => {
        if (index < currentActive) {
            item.classList.add('Active');
            
        }
        else{
            item.classList.remove('Active');
        }
    })
    

}

