// p.83
// ●●Array.prototype.slice.call( array-like-object );
// 유사배열객체를 배열로 반환.

// 1. 유사배열객체 : arguments객체

function a () {
    let argv = Array.prototype.slice.call(arguments);

    console.log(arguments);        // [Arguments] { '0': 1, '1': 2, '2': 3}
    console.log(argv);             // [1, 2, 3]
    argv.forEach(function (arg) {
        console.log(arg);          // 1, 2, 3
    });
}
a(1,2,3);

// 2. 유사배열객체 : nodeList

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
// <script src="asdf.js"></script> 이렇게 head 안에 넣으면 에러
// → body를 아직 읽기 전이기 때문에 존재하지 않는 요소. 
// <script defer src="asdf.js"></script> 이렇게 하면 됨.

let nodeList = document.querySelectorAll('div');
let nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
    console.log(node);
});

// ----------------------------------------------------
// p.125
// ●●콜백 함수 내부에서 외부 데이터를 사용하고자 할 때 (클로저 활용 사례) 

let fruits = ['apple', 'banana', 'peach'];
let $ul = document.createElement('ul');

let alertFruit = function (fruit) {
    console.log('your choice is ' + fruit);

}
// 고차함수 활용
let alertFruitBuilder = function (fruit) {
    return function() {
        console.log('your choice is ' + fruit);
    }
}

fruits.forEach(function(fruit) {
    let $li = document.createElement('li');
    $li.innerText = fruit;
    // $li.addEventListener('click', alertFruit); 
    //  → your choice is [object MouseEvent]
    // $li.addEventListener('click', alertFruit(fruit)); 
    //  → 인자를 넘기면서 호출연산자 사용했기 때문에 클릭이벤트와 상관없이 호출되버림 
    // $li.addEventListener('click', alertFruit.bind(null, fruit)); 
    //  → bind는 즉시 호출하지 않고, 함수를 반환하기 때문에 이벤트에 맞게 핸들러 동작.
    //  → 그러나, 이벤트 객체가 인자로 넘어오는 순서가 바뀌고, 함수 내부에서의 this가 달라짐.
    $li.addEventListener('click', alertFruitBuilder(fruit));
    //  → alertFruitBuilder 함수를 실행하면서 fruit값을 인자로 전달, 익명함수 반환.
    //  → 클릭 이벤트가 발생하면, 익명함수의 실행 컨텍스트가 열리면서, 
    //    alertFruitBuilder의 인자로 넘어온 fruit을 outerEnvironmentReference에 의해 참조.
    $ul.appendChild($li);
});

document.body.appendChild($ul);
