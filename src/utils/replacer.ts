export function replaceAllOccurrences(inputString:string, oldStr:string, newStr:string):string{
  while (inputString.indexOf(oldStr) >= 0)
  {
      inputString = inputString.replace(oldStr, newStr);
  }
  while (inputString.indexOf('"{') >= 0)
  {
      inputString = inputString.replace('"{', '{');
  }
  while (inputString.indexOf('}"') >= 0)
  {
      inputString = inputString.replace('}"', '}');
  }
  return inputString;
}