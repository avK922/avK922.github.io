var videoURL= 'https://www.youtube.com/embed/';
var flag = 1;

function run(arg) {
  var vidioId = arg||'PUNb2BkmQu3IfQVcaPExHkvQ';
  var playListURL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId='+vidioId+'&key=AIzaSyAxyFNW4zwqpAhk4X7dytajbilqXaFI4UE';

  $.getJSON(playListURL,function(data) {
 
        var arr = [];
        for(var i =0; i<data.items.length; i++){
        	var obj = {};
        	obj.videoId=data.items[i].snippet.resourceId.videoId;
        	obj.title=data.items[i].snippet.title;
        	obj.thumb=data.items[i].snippet.thumbnails.high.url
        	arr.push(obj)
        }
      write(arr)

    }
   );

}

function keyWordsearch() {
	var vidioId = query.value;
  run(vidioId)
}

function write(argum) {
	var player = document.querySelector('#player');
	var h2 = document.querySelector('h2');
	var p = document.querySelector('p');
  player.innerHTML = '<iframe width="725" height="420" src="'+videoURL+ ''+ argum[0].videoId + '" frameborder="0" allowfullscreen></iframe>';
  h2.innerHTML= argum[0].title;
  var content = document.querySelector('.wrap');
    if(flag==1){
      for (var i = 0; i < argum.length; i++) {
          var thumb = "https://i.ytimg.com/vi/"+ argum[i].videoId +"/mqdefault.jpg";
        	var rest = document.createElement('div');
          rest.className = 'rest';
        	var img = document.createElement('img');
        	var link = document.createElement('a');
          var h3 = document.createElement('span');
        	link.title = videoURL + argum[i].videoId;
        	img.src = thumb;
          img.alt=argum[i].title;
          h3.innerHTML=argum[i].title.charAt(0).toUpperCase()+argum[i].title.slice(1).toLowerCase();
        	link.appendChild(img);
        	rest.appendChild(link);
          rest.appendChild(h3);
          content.appendChild(rest);
        	}
        	flag=0;
        }
        else {
        	
          var content = document.querySelector('.wrap');
          var rest = document.querySelectorAll('.rest'); 
            for (var i = 0; i < rest.length; i++) {
              content.removeChild(rest[i])
              
              }
         
          for (var i = 0; i < argum.length; i++) {
                
            var thumb = "https://i.ytimg.com/vi/"+ argum[i].videoId +"/mqdefault.jpg";

            var rest = document.createElement('div');
            rest.className = 'rest';
            var h3 = document.createElement('span');
            var img = document.createElement('img');
            var link = document.createElement('a');
            link.title = videoURL + argum[i].videoId;
            img.src = thumb;
            img.alt=argum[i].title;
            h3.innerHTML=argum[i].title;
            link.appendChild(img);
            rest.appendChild(link);
            rest.appendChild(h3);
            content.appendChild(rest);

          }
        }

        var rest = document.querySelectorAll('.rest');
        
        switch (rest.length) {
          case 10:
            rest[8].className = rest[8].className+' lot1';
            break;
          case 9:
            rest[8].className = rest[8].className+' lot2';
            break;
          case 7:
            rest[4].className = rest[4].className+' lot4';
            break;
          case 6:
            rest[4].className = rest[4].className+' lot5';
            break;
          case 5:
            rest[4].className = rest[4].className+' lot3';
            break;
          default:
            1
        }
      
      oup(argum)
}

function oup(argum) {
  var flat = argum;
  var link = document.querySelectorAll('.rest a');
	 for (var i = 0; i < link.length; i++) {
		  link[i].onclick=play
    };
  function play(e){
    var videoId = event.target.parentElement.title;
	  var player = document.querySelector('#player');
    var title = document.querySelector('h2');
	  player.innerHTML = '<iframe width="725" height="420" src="'+ videoId + '" frameborder="0" allowfullscreen></iframe>';
    title.innerHTML = event.target.alt;
		}
	}