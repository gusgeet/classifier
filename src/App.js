import { useState, useEffect } from 'react';
import './App.css';
import { procesarData } from './Logic';
import { ESP, ENG } from './data';
import flag1 from "./asserts/svg/england.svg"
import flag2 from "./asserts/svg/spain.svg"


function App() {

  const [translate, setTranslate] = useState(false)
  const [translation, setTranslation] = useState([])

  const [isChecked, setIsChecked] = useState(false)
  const [isAppend, setIsAppend] = useState(false)
  const [toClipboard, setToClipboard] = useState(false)

  useEffect(() => {
    setTranslation(ESP)
  },[])
  
  const changeTranslation = () => {
    setTranslate(!translate)
    !translate ? setTranslation(ENG) : setTranslation(ESP)
  }
  
  const readContent = () => {
    navigator.clipboard.readText().then((data) => {
      try {
        procesarData(data, isAppend, isChecked, toClipboard)
      } catch(err) {
       document.getElementById('text-holder').placeholder = 'Error en consistencia de datos: Verifique que los datos copiados sean los correctos.'
      }
      }
    )
  }

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleAppend = (e) => {
    setIsAppend(e.target.checked)
  }

  const handleToClipboard = (e) => {
    setToClipboard(e.target.checked)
  }
 
  return (
    <div className="App">
      <header>
        <img alt='Español' src={flag2}/>
        <div className="checkbox-wrapper-6">
          <input className="tgl tgl-light" id="cb1-6" type="checkbox" onChange={() => changeTranslation()}/>
          <label className="tgl-btn" htmlFor="cb1-6"></label>
        </div>
        <img alt='Español' src={flag1}/>
      </header>
      <section className="App-header">
        <h2>Classifier</h2>
        <h2>Classifier</h2>
        <textarea readOnly 
          id='text-holder'
          placeholder={translation[0]}>
        </textarea>
        <div id='controls'>
          <div className='class-name'>
            <h6 htmlFor="class-name">{translation[4]}:</h6>
            <input id='class-name' type="text"/>
          </div>
          <div className='type'>
            <h6>{translation[3]}:</h6>
            <select id='select'>
              <option value='0'>Private</option>
              <option value='1'>Public</option>
            </select>
          </div>
          <div className='type'>
            <h6>Getter/Setter:</h6>
            <select id='getter'>
              <option value='0'>{translation[6]}</option>
              <option value='1'>{translation[7]}</option>
              <option value='2'>{translation[8]}</option>
            </select>
          </div>
          <div className='box-checks'>
            <div>
              <h6 htmlFor='conversion'> 
                {translation[1]}
              </h6>
              <input 
                  id='conversion' 
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleCheckbox}
                  />
            </div>
            <div>
              <h6 htmlFor='append'>
                {translation[2]}
              </h6>
              <input 
                  id='append'
                  type='checkbox'
                  checked={isAppend}
                  onChange={handleAppend}
                />
            </div>
            <div>
            <h6 htmlFor="copy-result">{translation[9]}</h6>
                <input 
                id='copy-result' 
                type="checkbox"
                checked={toClipboard}
                onChange={handleToClipboard}
                />
            </div>
          </div>
        </div>
        <button onClick={readContent} className='btn'>{translation[5]}</button>
      </section>
    </div>
  );
}

export default App;
