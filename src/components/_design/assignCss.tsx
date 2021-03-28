export function assignCss(cssObj: object[] | object | undefined) {
  if(cssObj){
    if(Array.isArray(cssObj)) return Object.assign({}, ...cssObj);
    else return cssObj;
  } else {
    return {};
  }
}