function unitPx(v: number) { return (v * 4) + 'px'; }

export const Spacing = {
  // Margin
  margin: (v: number) => { return {margin: unitPx(v)} },
  marginX: (v: number) => { return {marginLeft: unitPx(v), marginRight: unitPx(v)} },
  marginY: (v: number) => { return {marginTop: unitPx(v), marginBottom: unitPx(v)} },
  marginTop: (v: number) => { return {marginTop: unitPx(v)} },
  marginBottom: (v: number) => { return {marginBottom: unitPx(v)} },
  marginRight: (v: number) => { return {marginRight: unitPx(v)} },
  marginLeft: (v: number) => { return {marginLeft: unitPx(v)} },
  // Padding
  padding: (v: number) => { return {padding: unitPx(v)} },
  paddingX: (v: number) => { return {paddingLeft: unitPx(v), paddingRight: unitPx(v)} },
  paddingY: (v: number) => { return {paddingTop: unitPx(v), paddingBottom: unitPx(v)} },
  paddingTop: (v: number) => { return {paddingTop: unitPx(v)} },
  paddingBottom: (v: number) => { return {paddingBottom: unitPx(v)} },
  paddingRight: (v: number) => { return {paddingRight: unitPx(v)} },
  paddingLeft: (v: number) => { return {paddingLeft: unitPx(v)} },
}