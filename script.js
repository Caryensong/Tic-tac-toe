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
                   dur="500ms" 
                   fill="freeze" 
               />
           </circle>
       </svg>
   `;
}
function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="red" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="500ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="500ms" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="red" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="500ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="500ms" fill="freeze" />
            </line>
        </svg>
    `;
}



function render() {
   let tableHTML = '<table>';

   for (let i = 0; i < 3; i++) {
       tableHTML += '<tr>'; 
       for (let j = 0; j < 3; j++) {
           const index = i * 3 + j; 
           const value = field[index]; 

           let cellContent = '';
           if (value === 'circle') cellContent = generateCircleSVG();
           if (value === 'cross') cellContent = generateCrossSVG();

           tableHTML += `<td>${cellContent}</td>`;
       }
       tableHTML += '</tr>'; 
   }

   tableHTML += '</table>'; 

   document.getElementById('content').innerHTML = tableHTML;
}

render();