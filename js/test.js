class XYPlotter{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        //캔버스의 2D컨텍스트를 가져와서 그리기 작업에 사용합니다
        this.ctx = this.canvas.getContext("2d");
        //좌표계의 최소값
        this.xMin = 0; this.yMin = 0; 
        //좌표계의 최대값은 폭과 높이로 설정합니다
        this.xMax = this.canvas.width;
        this.yMax = this.canvas.height;
    }

    transformXY(){//좌표계를 상단 기준에서 하단 기준으로 뒤집기 위한 설정
        this.ctx.setTransform(1,0,0,-1,0, this.canvas.height);
    }

    plotPoint(x, y, color = "black", size = 3){//주어진 좌표에 xy점을 그림
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        //매서드로 원을 그리고 색을 칠합니다
        this.ctx.fill();
    }

    plotLine(x1, y1, x2, y2, color="black"){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);//시작점
        this.ctx.lineTo(x2, y2);//끝점
        this.ctx.stroke();//선을 그림
    }

}

//초기값 설정
const numPoints = 500;
const learningRate = 0.00001;

//플로터 만들기
const plotter = new XYPlotter("p_test");
plotter.transformXY();
const xMax = plotter.xMax;
const yMax = plotter.yMax;

const xMin = plotter.xMin;
const yMin = plotter.yMin;

//랜덤한 xy 포인터 만들기
//비워져있는 포인트 만들기
const xPoints = []; 
const yPoints = [];
for (let i=0; i < numPoints; i++){
    xPoints[i] = Math.random() * xMax;
    yPoints[i] = Math.random() * yMax;
}

//아래에 수식이 맞게 점들을 위(1) 또는 아래(0)으로 분류
function f(x) {
    return x * 1.2 + 50;
}

//선그리기 함수 f(x)에
plotter.plotLine(xMin, f(xMin), xMax, f(xMax), "red");

//목표값 설정 학습데이터가 함수 f(x)위보다 높으면 (위쪽에 있으면) 1 아래면 0으로 설정
const desired = [];
for (let i = 0; i < numPoints; i++){
    desired[i] = 0;
    if (yPoints[i] > f(xPoints[i])){
        desired[i] = 1;
    }
}

//퍼셉트론 생성 입력 2개 (x, y)를 받아들이는 퍼셉트론 객체 생성
//learningRate 학습속도 하이퍼파라미터[최적의 훈련 모델을 구현하기 위해 모델에 설정하는 변수]
const ptron = new Perceptron(2, learningRate)

//training(퍼셉트론 학습 트레이닝)
for (let j = 0; j <= 10000; j++){//0부터 시작이므로 10001개이다
    for(let i = 0; i < numPoints; i++){
        ptron.train([xPoints[i], yPoints[i]], desired[i]);
        //각점에 대해 ptron.train()으로 학습
    }
}

//퍼셉트론 테스트
const counter = 1000;
let errors = 0;
for (let i = 0; i < counter; i++){
    let x = Math.random() * xMax;
    let y = Math.random() * yMax;
    let guess = ptron.activate([x,y, ptron.bias]);
    //ptron.activate 통해 추론한 guess값을 기준으로 시각화 (pink of light blue)
    let color = ((guess == 0) ? "blue":"grey");
    plotter.plotPoint(x, y, color);
    //실제 함수와 비교해 오답이면 errors++
    if((y > f(x) && guess == 0) || (y < f(x) && guess == 1)){
        errors++
    }
}
document.getElementById("demo").innerHTML = errors + "Errors out of " + counter;
