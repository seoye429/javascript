async function myUx(){
    let myPro = new Promise(function(resolve, reject){
    resolve("난 최종작");
    });
    document.getElementById("as").innerHTML = await myPro;
}
myUx();


function myUi(something){
    document.getElementById("pro").innerHTML = something;
}
let myPromise = new Promise(function(myResolve, myReject){
    let x = 0;

    if(x == 0) {
        myResolve("OK");
    }else{
        myReject("Error")
    }
});

myPromise.then(
    function(value) {myUi(value);},
    function(error) {myUi(error);}
)


function myDisplayer(something){//함수 화면에 표시는 어떤것이든
    document.getElementById("demo").innerHTML = something;
    //도큐먼트에서 id 데모를 찾아서 어떤것을 집어 넣는다..
}
function myCalculator(num1, num2, myCallback){
  let sum = num1 + num2;//변수 총합은 num1 + num2를 더함
  myCallback(sum);
}
//함수는 재귀함수가 아닌이상 호출할때만 실행된다
myCalculator(5, 5, myDisplayer);