let field = [
   null, 
   'circle', 
   'circle', 
   null, 
   null, 
   'cross', 
   'cross', 
   null,
   null
];

function init(){
   render();
}

// Function to generate SVG for a circle
function generateCircleSVG() {
   return `
       <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
           <circle 
               cx="35" 
               cy="35" 
               r="30" 
               stroke="#00BDEF" 
               stroke-width="5" 
               fill="none"
               stroke-dasharray="188.4" 
               stroke-dashoffset="188.4"
           >
               <animate 
                   attributeName="stroke-dashoffset" 
                   from="188.4" 
                   to="0" 
                   dur="2s" 
                   fill="freeze" 
               />
           </circle>
       </svg>
   `;
}


// Function to render the Tic Tac Toe board
function render() {
   // Initialize an empty string for the HTML table
   let tableHTML = '<table>';

   // Loop through the field array to generate rows and cells
   for (let i = 0; i < 3; i++) {
       tableHTML += '<tr>'; // Start a new row
       for (let j = 0; j < 3; j++) {
           const index = i * 3 + j; // Calculate the index in the field array
           const value = field[index]; // Get the value at this index

           // Determine the content for the cell
           let cellContent = '';
           if (value === 'circle') cellContent = generateCircleSVG();
           if (value === 'cross') cellContent = 'X';

           // Add the cell to the row
           tableHTML += `<td>${cellContent}</td>`;
       }
       tableHTML += '</tr>'; // End the row
   }

   tableHTML += '</table>'; // End the table

   // Render the table HTML inside the #content div
   document.getElementById('content').innerHTML = tableHTML;
}

// Initial render of the board
render();