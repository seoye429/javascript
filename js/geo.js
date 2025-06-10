const x = document.getElementById("demo");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        x.innerHTML = "당신에 브라우저에서는 위치기반이 지원되지 않습니다"
    }
}
function showPosition(position){
    x.innerHTML = " Latitude : " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}