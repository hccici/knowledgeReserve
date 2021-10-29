var pattern = /(routerId=)(\w*)/;
var st = '#/pcbEngineeringIssuesMainprocessId=136261';
var s = st.replace(pattern, (m, p1, p2) => {
  return p1 + 'tsx'
})
var pattern2 = /\?/;
console.log(pattern2.test(st));
console.log(pattern.test(st));
console.log(s)