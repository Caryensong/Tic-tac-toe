let fields= [
   null, 
   null, 
   null, 
   null, 
   null, 
   'cross', 
   'circle', 
   null, 
   null, 
];
function init(){
   render(); 
};
 

function render() {
     
   let tableHTML = '<table>';

      for (let i = 0; i < 3; i++) {
          tableHTML += '<tr>'; 
          for (let j = 0; j < 3; j++) {
              const index = i * 3 + j;
              const value = fields[index]; 

              let cellClass = '';
              if (value === 'circle') cellClass = 'circle';
              if (value === 'cross') cellClass = 'cross';

              tableHTML += `<td class="${cellClass}">${value ? (value === 'circle' ? 'O' : 'X') : ''}</td>`;
          }
          tableHTML += '</tr>';
      }

      tableHTML += '</table>'; 

      document.getElementById('content').innerHTML = tableHTML;
  }

  