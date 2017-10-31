
var list = document.querySelector(".works__work-type-list");
var prev = list.querySelector(".works__type-item--active");

var gal = document.querySelector(".works__item-list");
var moreBtn = document.querySelector(".works__btn-more");
var hiddenPhotos = document.querySelectorAll(".works__item--hidden");

var submitWrp = document.querySelector(".contact-us__form-submit-wrapper");
var submit = submitWrp.querySelector(".contact-us__form-submit");
var checkMark = submitWrp.querySelector(".contact-us__form-checkmark");

var toggle = document.querySelector(".main-nav__toggle")
var nav = document.querySelector(".main-nav__list")

for (var i = 0; i < list.children.length; i++) {
  var cur = list.children[i];
  cur.addEventListener('click', changeTab(cur));
}

function changeTab(cur) {
  return function() {
    prev.classList.remove('works__type-item--active');
    cur.classList.add('works__type-item--active');
    prev=cur;

    if (cur.classList.contains('works__type-item--all')) {
      showThisType('works__item');
      moreBtn.style.display="inline-block";
    }

    if (cur.classList.contains('works__type-item--design')) {
      showThisType('works__item--design');
      moreBtn.style.display="none";
    }

    if (cur.classList.contains('works__type-item--manipulation')) {
      showThisType('works__item--manipulation');
      moreBtn.style.display="none";
    }

    if (cur.classList.contains('works__type-item--photo')) {
      showThisType('works__item--photo');
      moreBtn.style.display="none";
    }

    if (cur.classList.contains('works__type-item--dev')) {
      showThisType('works__item--development');
      moreBtn.style.display="none";
    }
  }
}

function showThisType(type) {     //отфильтровать по выбранному классу
  for (var i = 0; i < gal.children.length; i++) {   //минус кнопка
    var cur = gal.children[i];
    if (!cur.classList.contains("works__item--hidden"))   //не обрабатываем спрятанные
    {
      if (!cur.classList.contains(type)) {
        cur.style.display = "none";
      }
      else {
        cur.style.display = "inline-block";
      }
    }
  }
}



moreBtn.addEventListener('click', showMore);

function showMore() {
  //заменить data-src на src
  for (var i = 0; i < hiddenPhotos.length; i++) {
    var cur = hiddenPhotos[i];
    src = cur.dataset.src;
    cur.setAttribute("src", src);
    cur.classList.remove("works__item--hidden");
  }

  if (moreBtn.innerHTML == "See less")
    {
      moreBtn.innerHTML = "See more";
      //скрыть картинки
      for (var i = 0; i < hiddenPhotos.length; i++) {
        var cur = hiddenPhotos[i];
        cur.classList.add("works__item--hidden");
      }
      //после удаления картинок вернуться к кнопке наверх
      window.scrollTo( 0, window.pageYOffset - 880 );
    }
    else {  moreBtn.innerHTML = "See less"; }
}




//лоадер и галка
submit.addEventListener('click', function(e) {
  e.preventDefault();
  this.setAttribute("disabled", "disabled");
  prevColor = submit.style.color;   //сохраним цвет текста
  submit.style.color = "transparent";   //скрыть текст
  submitWrp.classList.add("contact-us__form-submit-wrapper--loader");

  setTimeout(function(){
    submitWrp.classList.remove("contact-us__form-submit-wrapper--loader");
    checkMark.classList.add("contact-us__form-checkmark--active");
  }, 1000)

  setTimeout(function(){
    checkMark.classList.remove("contact-us__form-checkmark--active");
    submit.style.color = prevColor;
    submit.removeAttribute("disabled", "disabled");
  }, 3000)
})


//мобайл-меню
toggle.addEventListener('click', function() {
  toggle.classList.toggle("main-nav__toggle--active");
  nav.classList.toggle("main-nav__list--active");
})

document.onclick = function(event) {
  //по клику в любое место кроме toggle
  if (event.target.closest(".main-nav__toggle")==null) {
    toggle.classList.remove("main-nav__toggle--active");
    nav.classList.remove("main-nav__list--active");
  }
}
