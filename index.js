const todoList = [];
// todo를 담을 배열을 선언

let newId = 0;
/*
나중에 todo를 수정하고 삭제하기위해 각 todo를 지정할 유일한 값이 필요함
==> newId라는 변수 선언
*/
const form = document.querySelector("form");
/*
.querySelector("(.class  / #id / tag)")는 html에서 지정한 class or id or tag 값(선택자)을 가지는 요소를 반환함
*/

form.addEventListener("submit", (el) => {
  // addEventListener은 요소에 이벤트를 부여함. 예를 들어 form에 "submit"이란 이벤트를 부여하면 form에서 "submit"이란 이벤트(제출)가 발생했을때 뒤의 함수를 실행해줌
  //()=>{} 은 function () {} 와 같음
  el.preventDefault(); // 원래 form을 제출하면 새로고침이 되므로 이를 막기위해 preventDefault()           <== 이 줄을 주석처리 해본 후 달라진 결과 확인해보기

  const content = el.target.content.value; // submit 할때 el로 정보가 넘어옴. content라는 이름을 가진 input의 값을 가져오기 위해 el.target.(name).vlaue 로 가져옴 input예시: <input type="text" name="content"/>

  el.target.content.value = "";

  const article = {
    content,
    id: newId,
  }; // content(내용)과 id(고유한 값)을 가지는 임시 객체 선언. 객체는 문서 확인

  todoList.unshift(article); //배열에 artcle을 추가함.
  newId++; // 고유한 값을 가지기 위해 1을 추가함으로써 새로운 article은 전의 article과 다른 id를 가지게 될 것임

  drawTodoList(); //todo를 그리는 함수 실행
});

const container = document.querySelector("#container"); // #container라는 id를 가지는 요소 탐색

function drawTodoList() {
  const list = [...todoList]; // 지금은 todolist라는 배열을 list에 복사한다고 생각

  container.innerHTML = ""; // container안의 내용을 없애버림

  list.forEach((el) => {
    // == for(let i=0; i< list.length; i++){const el = list[i]; ....... } 와 같음
    const article = document.createElement("li"); // createElement: 말그래도 element를 만들어줌
    article.classList = "article"; // class추가
    const content = document.createElement("span");
    content.classList = "content";
    content.innerHTML = el.content;

    const delBtn = document.createElement("button");
    delBtn.classList = "delete-btn";
    delBtn.innerHTML = "del";

    delBtn.addEventListener("click", () => {
      //버튼에 click이란 이벤트가 발생하면 list를 삭제하는 함수 실행
      deleteTodoList(el.id);
    });

    article.appendChild(content); // ex)  div = <div></div> , p = <p></p> 가 있을때 div.append(p)를 하면 <div><p></p></div>가 됨.(div가 부모, p가 자식이라함.)
    article.appendChild(delBtn);

    container.appendChild(article);
  });
}

function deleteTodoList(id) {
  //삭제할 id를 입력받음
  for (i = 0; i < todoList.length; i++) {
    console.log(todoList[i], id);
    if (todoList[i].id === id) {
      //todoList를 탐색하면서 삭제할 id와 같은 id를 가지는 todo를 찾은 후
      todoList.splice(i, 1); //배열에서 i번째 요소를 삭제함.
    }
  }
  drawTodoList();
}
