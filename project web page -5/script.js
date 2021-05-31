const panels = document.querySelectorAll('.panel')
// console.log(panels[1]);
panels.forEach((panel)  => {
    // console.log(panel);
    panel.addEventListener('click',()=>{
        // console.log('123');
        removeActiveclasses()
        panel.classList.add('active');
    })
    
});
function removeActiveclasses() {
    panels.forEach((panel) =>{
        panel.classList.remove('active');
    })
    
}