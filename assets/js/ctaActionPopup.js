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

var alldata = {{ site.data.popups.jointeam | jsonify }};
var ctaQuestionsSequence = lookForInJsonArr(alldata, "question");
var ctaConfirmations = lookForInJsonArr(alldata, "confirmation");

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

