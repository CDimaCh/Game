function getRandomColor() {  //рандомный цвет для квадратика
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function randomSpeed(min, max) { // для разной скорости квадратиков
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}

function Element(maxWidth) { //создание самого кубика
    this.coordX = Math.abs(Math.floor(Math.random() * maxWidth - 40)); //для появления в разных местах
    
    this.html = document.createElement('span'); //делаю как спаны
    this.html.className = 'item';               //добавляю класс для обращения
    this.html.style.backgroundColor = getRandomColor(); // для разных цветов
    this.html.style.left = this.coordX + 'px'; // координата на поле
}

var playButton = document.getElementById('play');
var stopButton = document.getElementById('stop');

function MyGame() { //главная функция для игры
    
    playButton.setAttribute('disabled', true);
    stopButton.removeAttribute('disabled');
    
    
    var wrapper = document.getElementById('wrapper');
    var pointsElement = document.getElementById('points');
    
    var items = [];  //массив для всех кубиков
    
    var k = 0;
    
    var wrapperGeometry = wrapper.getBoundingClientRect(); //сохраняю данные игрового поля
    
    var el = new Element(wrapperGeometry.width); //создаю новый и сохраняю в el
    items.push(el);                           //добавляю в массив
    wrapper.appendChild(el.html);             //вывод в разметке
    el.html.style.top = 0 + 'px';             //начало падения
    
    wrapper.onclick = function(e) {             //функция для добавления поинтов если кликнуть ко квадратику
			    items.forEach(function(item, index) {
      	if (item.html === e.target) {
        	e.target.parentNode.removeChild(e.target);  //удалил из разметки
          
          items.splice(index, 1);   //удалил елемент из массива
          
          points += 10;             //добавил поинт
        	pointsElement.textContent = points; //вывел
        }
      });
    };
    
    var StopBut = setInterval(function () { //функция задает движение елементов, появление и остановку игры
        if (k <= 10) {  //не больше 10ти квадратиков на экране
            k = k + 2;  //"интервал" появления квадратиков
        } else {
        		el = new Element(wrapperGeometry.width);  //создаю квадратик
            items.push(el);                      //добавляю его
            wrapper.appendChild(el.html);        //добавляю на поле
            el.html.style.top = 0 + 'px';        //начальная позиция   
            k = 0;                               //что бы были раздельно, делаю обнуление   
        }
        
        points = parseInt(pointsElement.textContent, 10);  //поинты)

        for (i = 0; i < items.length; i++) {  
            if (parseInt(items[i].html.style.top, 10) < wrapperGeometry.height - 40) { //проверка не дошел ли квадратик до конца
                items[i].html.style.top = (parseInt(items[i].html.style.top, 10) + randomSpeed(5, 20)) + 'px';  //движение
            } else {                                            //когда дошел ко конца, возвращаю вверх
                items[i].html.style.top = -1000 + 'px';
                items[i].html.style.display = 'none';
            }
        }
    }, 200);
    
    var StopSourse = document.getElementById('stop');
    
    StopSourse.onclick = function () {
        StopGame();
        // alert('points = ' + points);
    };

    var StopGame = function () { //остановка игры
        clearInterval(StopBut);  //больше не создаю квадратики
        wrapper.onclick = null;  
        
        for (i = 0; i < items.length; i++) {  //очищаю все поле
            items[i].html.parentNode.removeChild(items[i].html);
            delete items[i];
        }
        
        pointsElement.textContent = 0;  //обнуление поинтов
        
        playButton.removeAttribute('disabled');
        stopButton.setAttribute('disabled', true);

    };

}

document.getElementById('play').addEventListener('click', function() { // по клику запускаю игру
    MyGame();
});