let questions = [
    {"id" : 1,"q":"2 + 2 ?","a": "4","b": "5","c": "6","d": "7","correct":"4"},
    {"id" : 2,"q":"What is the capital of United States ?","a": "New York","b": "Washington","c": "Alaska","d": "Ontario","correct":"Washington"},
    {"id" : 3,"q":"What's the next number in the pattern : 1 2 4 8 16 ??","a": "31","b": "47","c": "64","d": "32","correct":"32"},
    {"id" : 4,"q":"What color do you get when u mix Red with Green ?","a": "Black","b": "Orange","c": "Blue","d": "Yellow","correct":"Yellow"},
    {"id" : 5,"q":"Who painted the Mona Lisa? ?","a": "Leonardo DiCaprio","b": "Leonardo da Vinci","c": "Michelangelo","d": "Pablo Picasso","correct":"Leonardo da Vinci"},
    {"id" : 6,"q":"Sun is ?","a": "a star","b": "a planet","c": "a black hole","d": "a satellite","correct":"a star"}
];
function shuffle(array) {
   return array.sort(() => Math.random() - 0.5);
}
let shuffled = shuffle(questions);
let start_quiz = document.querySelector('.start');
start_quiz.addEventListener('click',StartQuiz);
let output = document.querySelector('.output');
let answers = [];
let results = document.querySelector('.results');
let prog = document.querySelector('.progress');
window.onload = function () {
    shuffled.forEach((element,index) => {
        let result = `<div class="question" data-id=${index}>
        <p class='q'>${element.q}</p>
        <input type="radio" id="${element.a}" name="answer" value="${element.a}">
        <label for="${element.a}">${element.a}</label>
        <input type="radio" id="${element.b}"name="answer" value="${element.b}">
        <label for="${element.b}">${element.b}</label>
        <input type="radio" id="${element.c}" name="answer" value="${element.c}">
        <label for="${element.c}">${element.c}</label>
        <input type="radio" id="${element.d}"name="answer" value="${element.d}">
        <label for="${element.d}">${element.d}</label>
        <button class='next'>Next</button>
        </div>`
        output.innerHTML += result;
        let next = document.querySelectorAll('.next');
        next.forEach(item => item.addEventListener('click', toNextQuestion))
    });
    setTimeout(addCurrentToFirstChild,1000);
}
function StartQuiz(){
    output.style.display = 'block';
    start_quiz.style.display = 'none';
    let width = 600 / shuffled.length;
    prog.style.width = width + 'px';
}
function addCurrentToFirstChild(){
    if(output.children.length == 0){
    for(i = 0 , k = 0; i<shuffled.length;i++,k++){
        let result = `<div class="res">
        <p class='q'>${shuffled[i].q}</p>
        <input class = 'a' type="radio" id="${shuffled[i].a}" name="answer${shuffled[i].id}" value="${shuffled[i].a}" disabled>
        <label for="${shuffled[i].a}">${shuffled[i].a}</label>
        <input class = 'a' type="radio" id="${shuffled[i].b}"name="answer${shuffled[i].id}" value="${shuffled[i].b}" disabled>
        <label for="${shuffled[i].b}">${shuffled[i].b}</label>
        <input class = 'a' type="radio" id="${shuffled[i].c}" name="answer${shuffled[i].id}" value="${shuffled[i].c}" disabled>
        <label for="${shuffled[i].c}">${shuffled[i].c}</label>
        <input class = 'a' type="radio" id="${shuffled[i].d}"name="answer${shuffled[i].id}" value="${shuffled[i].d}" disabled>
        <label for="${shuffled[i].d}">${shuffled[i].d}</label>
        </div>`;
        results.innerHTML += result;
        let res = document.querySelectorAll('.res');
        if(shuffled[i].correct == answers[k].selected){
            for(h = 1 ; h < 8; h += 2){
                if(res[i].children[h].value == answers[k].selected){
                    res[i].children[h].classList.add('selected_correct');
                }
            }
        }else{
            for(j = 1 ; j < 8; j += 2){
                if(res[i].children[j].value == answers[k].selected){
                    res[i].children[j].classList.add('selected');
                }
            }
            for(n = 1 ; n < 8; n += 2){
                if(res[i].children[n].value == answers[k].correct){
                    res[i].children[n].classList.add('correct');
                }
            }
        }
    }
    let all_inputs = document.querySelectorAll('.a');
    all_inputs.forEach(element => {
            if((element.classList.contains('selected_correct')) || (element.classList.contains('selected'))){
                element.setAttribute('checked',true);
            }
    });
    finalResults();
    }else{
      output.children[0].classList.add('current');
    }
    
}
function toNextQuestion(e){
    let question_box = e.target.parentNode;
    let id = question_box.dataset.id;
    let flag = false;
    for(p = 1; p < 8; p += 2){
        console.log(p);
        if(question_box.children[p].checked){
            flag = true;
            checkIfAnswerIsCorrect(question_box.children[p].value,id);
            question_box.remove();
            addCurrentToFirstChild();
        }
    }
    let quesDom = document.querySelectorAll('.question');
    let fraction = 600 / shuffled.length;
    let width = 600 - (+fraction * (quesDom.length - 1));
    if(width > 600){
        width = 600;
    }
    prog.style.width = width + 'px';
    console.log(width);
    if(!flag){
        alert('No Skipping :)');
    } 
     
}
function checkIfAnswerIsCorrect(value,id){
    let answer = {};
    answer.selected = value;
    answer.correct = shuffled[id].correct;
    answers.push(answer);
}
function finalResults(){
    let totalshuffled = shuffled.length;
    let correctAnswers = 0;
    for(i = 0;i<answers.length;i++){
        if(answers[i].selected == answers[i].correct){
            correctAnswers++;
        }
    }
    results.innerHTML += `<h1 class = 'final'>You answered ${correctAnswers} / ${totalshuffled} questions correctly</h1>`
}