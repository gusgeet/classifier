export const procesarData = (data, isAppend, isChecked, toClipboard) => {
  const toAppend = isAppend
  const sendToClipboard = toClipboard
  const getters = document.getElementById('getter').value
  const selection = document.getElementById('select').value
  const text = document.getElementById('text-holder')
  const getAnSetAPoner = getters === "1" ? ' {get;} \n' : getters === "2" ? ' {set;} \n' : ' {get; set;} \n'
  const privadoOPublico = selection === "1" ? 'public' : 'private'
  if(!toAppend) {
    text.value = ''
    let nombreClase = document.getElementById('class-name').value
    text.value += nombreClase.length > 0 ? `public class ${nombreClase} \n{\n` : `public class ClassWithOutName \n{\n`
    text.value += segregarColumnas(data, isChecked, getAnSetAPoner, privadoOPublico)
    text.value += '}'
  } else {
    let actualTexto = text.value.split('}').slice(0, text.value.split('}').length -2).join().replaceAll(',', '}') + '\n'
    let nuevoTexto = segregarColumnas(data, isChecked, getAnSetAPoner, privadoOPublico).split('}').join().replaceAll(',', '}')
    text.value = actualTexto + nuevoTexto
    //text.value += textoExistente + segregarColumnas(data, isChecked, getAnSetAPoner, privadoOPublico)
    text.value += '}'
  }
  if(sendToClipboard) {
    navigator.clipboard.writeText(text.value);
  }
  
  console.log(sendToClipboard)

}

const segregarColumnas = (data, isChecked, getAnSetAPoner, privadoOPublico) => {
  let text = '';
  data = data.replace(/[\r\n]/gm, '|')
  data = data.split('|').join()
  data = data.split(',,')
  for(let item of data){
    var newItem = ''
    var newItem2 = item.split('\t')[1].split(' ')[0]
    if(item.includes('_') && isChecked){
      let itemSplitted = item.split('\t')
      let formatteditem = itemSplitted[0].split('_')
      for(var a = 0;a < formatteditem.length;a++){
        newItem += formatteditem[a].substring(0, 1).toUpperCase() + formatteditem[a].substring(1).toLowerCase()
      }

    } else {
      newItem += item.split('\t')[0].substring(0, 1).toUpperCase() + item.split('\t')[0].substring(1).toLowerCase()
    }
    if(newItem2.includes('(')) {
      newItem2 = newItem2.split('(')[0]
    }
    
    switch(newItem2) {
      case 'int':
        newItem = '   ' + privadoOPublico + ' int ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'bigint':
          newItem = '   ' + privadoOPublico + ' Int64 ' + newItem + getAnSetAPoner
          text += newItem
          break;
      case 'bit':
        newItem = '   ' + privadoOPublico + ' bool ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'date':
        newItem = '   ' + privadoOPublico + ' DateTime ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'varchar':
        newItem = '   ' + privadoOPublico + ' String ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'image':
        newItem = '   ' + privadoOPublico + ' byte[] ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'varbinary':
          newItem = '   ' + privadoOPublico + ' byte[] ' + newItem + getAnSetAPoner
          text += newItem
          break;
      case 'decimal':
        newItem = '   ' + privadoOPublico + ' Decimal ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'text':
        newItem = '   ' + privadoOPublico + ' String ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'nvarchar':
        newItem = '   ' + privadoOPublico + ' String ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'smallint':
        newItem = '   ' + privadoOPublico + ' int ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'time':
        newItem = '   ' + privadoOPublico + ' TimeSpan ' + newItem + getAnSetAPoner
        text += newItem
        break;
      case 'datetime':
          newItem = '   ' + privadoOPublico + ' DateTime ' + newItem + getAnSetAPoner
          text += newItem
          break;
      default:
        break;        
    }
  }
  return text
}