import { useState } from 'react';
import './App.css';


function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [isAppend, setIsAppend] = useState(false)
  
  const readContent = () => {
    navigator.clipboard.readText().then((data) => {
      data = data.replace(/[\r\n]/gm, '|')
      data = data.split('|').join()
      data = data.split(',,')
      
      const getters = document.getElementById('getter').value
      const toAppend = isAppend
      const getAnSetAPoner = getters === "1" ? ' {get;} \n' : getters === "2" ? ' {set;} \n' : ' {get; set;} \n'
      const selection = document.getElementById('select').value
      const privadoOPublico = selection === "1" ? 'public' : 'private'
      const text = document.getElementById('text-holder')
      if(text.value && !toAppend) 
        text.value = ''
      for(let item of data){
        var newItem = ''
        var newItem2 = item.split('\t')[1].split(' ')[0]
        if(item.includes('_') && isChecked){
          let itemSplitted = item.split('\t')
          let formatteditem = itemSplitted[0].split('_')
          for(var a = 0;a < formatteditem.length;a++){
            newItem += formatteditem[a].substring(0, 1).toUpperCase() + formatteditem[a].substring(1)
          }

        } else {
          newItem += item.split('\t')[0]
        }
        if(newItem2.includes('(')) {
          newItem2 = newItem2.split('(')[0]

        }
        
        switch(newItem2) {
          case 'int':
            newItem = privadoOPublico + ' int ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'bigint':
              newItem = privadoOPublico + ' Int64 ' + newItem + getAnSetAPoner
              text.value += newItem
              break;
          case 'bit':
            newItem = privadoOPublico + ' bool ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'date':
            newItem = privadoOPublico + ' DateTime ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'varchar':
            newItem = privadoOPublico + ' String ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'image':
            newItem = privadoOPublico + ' byte[] ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'varbinary':
              newItem = privadoOPublico + ' byte[] ' + newItem + getAnSetAPoner
              text.value += newItem
              break;
          case 'decimal':
            newItem = privadoOPublico + ' Decimal ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'text':
            newItem = privadoOPublico + ' String ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'nvarchar':
            newItem = privadoOPublico + ' String ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'smallint':
            newItem = privadoOPublico + ' int ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'time':
            newItem = privadoOPublico + ' TimeSpan ' + newItem + getAnSetAPoner
            text.value += newItem
            break;
          case 'datetime':
              newItem = privadoOPublico + ' DateTime ' + newItem + getAnSetAPoner
              text.value += newItem
              break;
          default:
            break;        
          }
      }
    })
  }

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleAppend = (e) => {
    setIsAppend(e.target.checked)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Classifier</h2>
        <h2>Classifier</h2>
        <textarea readOnly 
          id='text-holder'></textarea>
        <div className='box-checks'>
          <h6 htmlFor='conversion'> 
            <input 
              id='conversion' 
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckbox}
              />
            Remover guiones
          </h6>
          <h6 htmlFor='append'>
            <input 
              id='append'
              type='checkbox'
              checked={isAppend}
              onChange={handleAppend}
            />
            Apendar al texto existente
          </h6>
        </div>
        <div className='type'>
          <h6>Tipo de clase:</h6>
          <select id='select'>
            <option value='0'>Private</option>
            <option value='1'>Public</option>
          </select>
        </div>
        <div className='type'>
          <h6>Getter/Setter:</h6>
          <select id='getter'>
            <option value='0'>Ambos</option>
            <option value='1'>Solo getter</option>
            <option value='2'>Solo setter</option>
          </select>
        </div>
        <button onClick={readContent} className='btn'>Obtener datos de portapapeles</button>
      </header>
    </div>
  );
}

export default App;
