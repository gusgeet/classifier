import { useState } from 'react';
import './App.css';


function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [textShortcut, setTextShortcut] = useState('')

  const readContent = () => {
    navigator.clipboard.readText().then((data) => {
      data = data.replace(/[\r\n]/gm, '|')
      data = data.split('|').join()
      data = data.split(',,')
      let newData = []
      for(let item of data){
        var newItem = ''
        if(isShown)
          newItem = textShortcut + '.'
        if(item.includes('_') && isChecked){
          newItem += item + ' as ' + item.replaceAll('_', '') 
        } else {
          newItem += item
        }      
        newData.push(' ' + newItem)
      }
      newData = newData.join()
      
      const text = document.getElementById('text-holder')
      text.value = 
      text.value = '(' + newData.replace(' ', '') + ')'
    })
  }

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleShown = (e) => {
    setIsShown(e.target.checked)
  }

  const handleShortcut = (e) => {
    setTextShortcut(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>StringiFUCK</h2>
        <h2>StringiFUCK</h2>
        <textarea readOnly placeholder='Instrucciones:
          Ir a SQL, ejecutar:
          exec sp_columns [NOMBRE DE LA TABLA], entre comillas. Va a devolver la lista de columnas de la tabla especificada. Seleccionar los nombres de las celdas 
          a utilizar en la query a hacer, copiarlas, y luego hacer click en el boton de abajo. Voy a generar la query que
          se solicita en la parte del select, removiendo los guiones bajos de la tabla removidos por EF Core.
          El fin de esta herramienta es simplemente hacer mas rapida la query que se manda, despues de mapear con EF Core las tablas, para despues pasar a Dapper para mandar queryes.
          EF Core tiene la mala costumbre de remover los guiones bajos de las tablas, razon por la que para solicitar "Datos_Del_Empleado", hay que pedir "Datos_Del_Empleado as DatosDelEmpleado".
          Esta herramienta genera esa estructura para las queryes que son Select. Una vez que se le de al boton de abajo, el resultado se vera en este campo de texto.
        ' id='text-holder'></textarea>
        <h6 htmlFor='conversion'> 
          <input 
            id='conversion' 
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckbox}
            />
          Hacer conversion EF Core ► Dapper (generar 'as' sin guiones bajos)
        </h6>

        <h6 htmlFor='shortcutTable'>
          <input 
            id='shown'
            type='checkbox'
            checked={isShown}
            onChange={handleShown}
          />
          Agregar un atajo de referencia (fd = fd.Id, fd.User...) 
        </h6>
        <input 
            id='shortcutTable'
            type='text'
            onChange={handleShortcut}
            style={{
              display: isShown ? 'block': 'none'
            }}
          />
                
        <button onClick={readContent} className='btn'>Obtener datos de portapapeles</button>
      </header>
    </div>
  );
}

export default App;
