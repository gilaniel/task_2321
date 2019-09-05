export function moneyFormatHelper (val,wt) {
  if(!val) return;
  if(wt){
		val = val/60;
	}
  if((val ^ 0) !== Number(val)){
    val = Number(val).toFixed(0);
  }
  return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
}