var teamElements = document.getElementsByClassName('popup-element');
var popupData = (name, photoUrl, description) => {
  Swal.fire({
    title: name,
    text: description,
    imageUrl: photoUrl,
    imageAlt: name
  });
}
var getHiddenFields = (collection) => {
  var arr = [];
  [...collection].forEach( (c) => {
    if( c.className.includes("hidden") ){
      arr.push(c.innerHTML);
    }
  });
  return arr;
}

[...teamElements].forEach( (teamEl) => {
  var teamElFields = getHiddenFields(teamEl.children);
  console.log(teamElFields);
  teamEl.addEventListener('click', ()=>{popupData(...teamElFields);});
});
