$(".slider").each(function() {
    let $this = $(this);
    let $slides = $this.find(".slide");
    var $group  = $this.find('.slide-group');
    let $buttons = $this.find('.slide-buttons');
    let currentIndex = 0;
    let timeoutId;
    advance();
    
    
    $.each($slides, function(index){
        let button = '<button type="button" class="slide-btn">&bull;</button>';
        let $button = $(button);
      
        $button.on("click", function() {
            activeOposite(index, event);
        });
        $button.on("touchstart", function() {
            activeOposite(index, event);
        });
        $button.on("mouseenter", function() {
            hoverOposite(index, event, true);
        });
        $button.on("mouseleave", function() {
            hoverOposite(index, event, false);
        });

        if(index === currentIndex){
            $button.addClass("active");
        }
        $button.appendTo(".slide-buttons");
    })

    function activeOposite(newIndex){
        if($group.is(':animated') || newIndex === currentIndex) return;
        clearTimeout(timeoutId);
        let $buttonsRight = $(".buttons-right button");
        let $buttonsLeft = $(".buttons-left button");       
        $($buttonsLeft[currentIndex]).removeClass("active");
        $($buttonsLeft[newIndex]).addClass("active");
        $($buttonsRight[currentIndex]).removeClass("active");
        $($buttonsRight[newIndex]).addClass("active");
        changeImage(newIndex); 
        advance();
    }

    function advance(){
        timeoutId = setTimeout(function(){
            if(currentIndex < $slides.length - 1){
                activeOposite(currentIndex + 1);
            } else{
                activeOposite(0);
            }
        }, 3000)
    }

    function changeImage(newIndex){
        if (newIndex > currentIndex) {   // Если новый элемент больше текущего
        slideTop = '100%';            // Помещаем новый слайд вправо
        animateTop = '-100%';         // Анимируем переход текущей группы влево
      } else {                         // Иначе
        slideTop = '-100%';           // Помещаем новый слайд влево
        animateTop = '100%';          // Анимируем переход текущей группы вправо
      }

    $slides.eq(newIndex).css( {top: slideTop, display: 'block'} );

    $group.animate( {top: animateTop}, function() {    // Анимируем слайды и
      $slides.eq(currentIndex).css( {display: 'none'} ); // Прячем предыдущий слайд
      $slides.eq(newIndex).css( {top: 0} ); // Устанавливаем позицию нового элемента
      $group.css( {top: 0} );
      currentIndex = newIndex;          // Устанавливаем позицию группы слайдов
                     // Присваиваем currentIndex новое изображение
    });
  }

    function hoverOposite(index, event, hovered){
        let $buttonsRight = $(".buttons-right button");
        let $buttonsLeft = $(".buttons-left button");
        let $oposite = $(event.target).parent().hasClass("buttons-left") ? $buttonsRight : $buttonsLeft;
        hovered ? $($oposite[index]).addClass("hover") : $($oposite[index]).removeClass("hover");
    }
});