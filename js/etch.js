window.addEventListener('load', activatePage);

/* createGrid(size) Function to create a grid of divs. Takes
   a number and creates a grid based on that size and 960px. */

function createGrid(size) {

    const grid = document.querySelector('.grid');
    let height = (700/size) + "px";
    let width = (700/size) + "px";

    for(let i=1; i <= size; i++) {
        for(let j =1; j <=size; j++) {
    let square = document.createElement('div');
    square.classList.add('grid-item');
    square.style.height = height;
    square.style.width = width;
    square.style.border = '1px solid black';
    square.style.boxSizing = 'border-box';
    grid.appendChild(square);
    }
    }
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.addEventListener('mouseover', colorGrid);
    });
 }

 /* function called after pages loads. Creates a default grid of
    size 50 and setup up EventListeners for the buttons. */

 function activatePage(e) {
    
    createGrid(50);
    let create = document.querySelector('#create');
    create.addEventListener('click', buttonClicked);

    let erase = document.querySelector('#erase');
   
    erase.addEventListener('click', buttonClicked);

    let color = document.querySelector('#color');
    
    color.addEventListener('click', buttonClicked);
 }

 /* EventListener method for the mouseover event that's setup in the 
    createGrid function. Changes the background color to red for the 
    div when you mouseover the div grids. This is also called when the
    'color' button is pressed. The erase EventListener is removed and 
    the color mouseover event is added to each grid item and the backgound
    color is set to red again.*/

 function colorGrid(e) {  

    let gridItems = document.querySelectorAll('.grid-item');
   
    gridItems.forEach((gridItem) => {
        gridItem.removeEventListener('mouseover', eraseGrid);
    });

    gridItems.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', colorGrid);
        
    });

    // This if statement is here b/c ButtonClicked calls this method
    // for the color button and I don't want the button to turn red. I want
    // a new event listener to turn the div background color red. 
    if (e.target.id != 'color')
    e.target.style.backgroundColor = 'red';
 }

 /* function called when one of the buttons is clicked. Depending on the button
    it creates a new grid, sets the color to grey to erase and sets it back to
    red if it's the color button*/

 function buttonClicked(e) {
   
    if(e.target.id == 'create') {
        drawGrid();
    
    } else if (e.target.id == 'erase') {
        eraseGrid(e);
    
    } else if(e.target.id == 'color') {
        colorGrid(e);
        console.log(e.target.id);
    }
    }

   // console.log(e.target.id);
 

/* function eraseGrid(e) : Remove the EventListener for the mouseover
   change the background color to red and adds a new mouseover 
   EventListener to change the background of the div back to gray */

 function eraseGrid(e) {
    let gridItems = document.querySelectorAll('.grid-item');
   
    gridItems.forEach((gridItem) => {
        gridItem.removeEventListener('mouseover', colorGrid);
    });

    gridItems.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', eraseGrid);
        
    });
    if (e.target.id != 'erase') {
    e.target.style.backgroundColor ='grey';
    }
}

/* function drawGrid: Deletes the current grid and prompts the user for a new size
   and calls the create grid method to create a new grid of that size. */

 function drawGrid(e) {
    
    let gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((gridItem) => {
        gridItem.remove();
    });
    
    let size = parseInt(prompt('Plese enter the size of the grid between 1 and 100','50'));
    if (size < 0 || size > 100) {
        do {
            size = parseInt(prompt('Please enter a value between 1 and 100'));
        } while (size < 1 || size > 100);
    }
    createGrid(size);
}