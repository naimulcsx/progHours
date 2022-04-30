export default function csvToArray(strData: string, strDelimiter = ",") {
  const objPattern = new RegExp(
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  )
  const arrData: any = [[]]
  let arrMatches = null
  while ((arrMatches = objPattern.exec(strData))) {
    var strMatchedDelimiter = arrMatches[1]
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([])
    }
    var strMatchedValue
    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"')
    } else {
      strMatchedValue = arrMatches[3]
    }
    arrData[arrData.length - 1].push(strMatchedValue)
  }
  return arrData
}
