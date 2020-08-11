---
layout: none
---
var ctaPopupActionEl = document.getElementsByClassName('cta-popup-action');
var lookForInJsonArr = (jsnArr, lookFor) => {
  let lookForArr = []
  jsnArr.forEach( (jsn) => {
    if( jsn.type.includes(lookFor) ){
      let tempJsn = JSON.parse(JSON.stringify(jsn));
      delete tempJsn.type;
      lookForArr.push(tempJsn);
    }
  });
  return lookForArr;
}
var getQuestions = (jsnArr) => {
  let questionsArr = []
  return questionsArr;
};

var ctaPopupMethod = document.getElementsByClassName('cta-popup-method')[0].innerText;
var popupMethodsAll = {{ site.data.popups | jsonify }};
var popupMethods   = Object.keys(popupMethodsAll);
var idxPopupMethod = popupMethods.indexOf(ctaPopupMethod);
if(idxPopupMethod < 0){
  idxPopupMethod = 2;
  ctaPopupMethod = popupMethods[idxPopupMethod];
}
var ctaPopupMethodFields = popupMethodsAll[ctaPopupMethod];


var ctaQuestionsSequence = lookForInJsonArr(ctaPopupMethodFields, "question");
var ctaConfirmations = lookForInJsonArr(ctaPopupMethodFields, "confirmation");

var ctaPopupAction= (questions, confirmation) => {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: Array.from(Array(questions.length+1).keys()).slice(1),
    showClass:{
      popup: 'animate__animated animate__zoomIn'
    },
    hideClass:{
      popup: 'animate__animated animate__zoomOut'
    }
  }).queue(questions).then((res) => {
    if(res.value) {
      var name    = res.value[0];
      var email   = res.value[1];
      var details = res.value.slice(2).join(" -- ");
      var data = {
        "name": name,
        "email": email,
        "subject": "Submission " + ctaPopupMethod,
        "body": details
      };
      console.log(data);
      Pageclip.send("FH07hPua0Q7nDwgz6IEIxcH6vrqihqoA", ctaPopupMethod, data, (err, res) => {
        console.log("saved?", !!err, "; response:", err || res);
      });
      Swal.fire(confirmation);

    }
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

[...ctaPopupActionEl].forEach( (ctaAction) => {
  //var questions = getHiddenFields(teamEl.children);
  ctaAction.addEventListener('click', ()=>{ctaPopupAction(ctaQuestionsSequence, ctaConfirmations[0]);});
});

