var quiz_data = {
    quiz_qs: [],
    
    add_qs: function(quiz_q, correct_ans, wrong_ans_1, wrong_ans_2){
      this.quiz_qs.push({
        quiz_q: quiz_q,
        correct_ans: correct_ans,
        wrong_ans_1: wrong_ans_1,
        wrong_ans_2: wrong_ans_2
      });
      view_page_handler.print_update_question_cts();
    },
    
    move_to_next_q: function(){
      var next_button = document.querySelectorAll(".next_button");
      for(var i = 0; i < next_button.length; i++){
        next_button[i].addEventListener("click", function(event){
          var clicked_elem = event.target;
          if(clicked_elem.className === "next_button"){
            clicked_elem.parentNode.classList.remove("is-active");
            if(clicked_elem.parentNode.nextElementSibling === null) {
              var show_added_q = document.querySelector(".add_qs");
              var show_info = document.querySelector(".info");
              show_added_q.style.display = "block";
              show_info.style.display = "block";
            } else {
              clicked_elem.parentNode.nextElementSibling.classList.add("is-active");
            }
          }
        });
      };
    }
  };
  
  var handlers = {
    add_qs: function(){
      var page_quiz_q = document.getElementById("page_quiz_q");
      var page_correct_ans = document.getElementById("page_correct_ans");
      var page_wrong_ans_1 = document.getElementById("page_wrong_ans_1");
      var page_wrong_ans_2 = document.getElementById("page_wrong_ans_2");
      quiz_data.add_qs(page_quiz_q.value, page_correct_ans.value, page_wrong_ans_1.value, page_wrong_ans_2.value);
      page_quiz_q.value = "";
      page_correct_ans.value = "";
      page_wrong_ans_1.value = "";
      page_wrong_ans_2.value = "";
    }
  }
  
  var view_page_handler = {
    show_qs: function(){
      var hide_add_qs = document.querySelector(".add_qs");
      var hide_info = document.querySelector(".info");
      hide_add_qs.style.display = "none";
      hide_info.style.display = "none";
      var qs_wrapper = document.querySelector(".qs_wrapper");
      qs_wrapper.innerHTML = "";
  
      quiz_data.quiz_qs.forEach(function(quiz_q, index){
      
      var q_div = document.createElement("div");
      q_div.setAttribute("class", "q_div");
      var next_button = document.createElement("button");
      next_button.setAttribute("class", "next_button");
      var q_list = document.createElement("li");
      var correct_ans_list = document.createElement("li");
      correct_ans_list.setAttribute("class", "correct");
      var wrong_ans_1_list = document.createElement("li");
      wrong_ans_1_list.setAttribute("class", "wrong");
      var wrong_ans_2_list = document.createElement("li");
      wrong_ans_2_list.setAttribute("class", "wrong");
  
        qs_wrapper.appendChild(q_div);
        qs_wrapper.firstChild.classList.add("is-active");
  
        q_list.textContent = quiz_q.quiz_q;
        correct_ans_list.textContent = quiz_q.correct_ans;
        wrong_ans_1_list.textContent = quiz_q.wrong_ans_1;
        wrong_ans_2_list.textContent = quiz_q.wrong_ans_2;
  
        if (index === quiz_data.quiz_qs.length - 1){
          next_button.textContent = "Finish";
        } else {
          next_button.textContent = "Next";
        }
  
        q_div.appendChild(q_list);
        var arr = [correct_ans_list, wrong_ans_1_list, wrong_ans_2_list];
        
        arr.sort(function(a, b){return 0.5 - Math.random()});
        
        arr.forEach(function(item){
          
        q_div.appendChild(item);
        
          });
  
        q_div.appendChild(next_button);
  
        this.show_correct_answer_ct();
        
        quiz_data.move_to_next_q();
  
      }, this);
    },
                                  
    show_correct_answer_ct: function() {
      var q_div = document.querySelectorAll(".q_div");
      var correct_ans_ct = 0;
      var correct_ans_stmt = document.querySelector(".correct_ans_ct");
      correct_ans_stmt.textContent = "Number of Correct Answers: " + correct_ans_ct;
      for (var i = 0; i < q_div.length; i++) {
        q_div[i].onclick = function(event) {
          event = event || window.event;
          if(event.target.className === "correct"){
            correct_ans_ct++;
            correct_ans_stmt.textContent = "Correct answers: " + correct_ans_ct;
            event.target.style.color = "#2ecc71";
          } else if(event.target.className === "wrong") {
            event.target.style.color = "#e74c3c";
            var item_children = event.target.parentNode.children;
            for(var i = 0; i < item_children.length; i++){
                if(item_children[i].classList.contains("correct")) {
                  item_children[i].style.color = "#2ecc71";
              }
            }
          }
          var item_children = event.target.parentNode.children;
          for(var i = 0; i < item_children.length; i++){
            item_children[i].classList.remove("correct");
            item_children[i].classList.remove("wrong");
          }
        }
      }
    },
    
    print_update_question_cts: function() {
      var question_ct = document.getElementById("question_ct");
      if(quiz_data.quiz_qs.length === 1) {
        question_ct.textContent = "You currently have " + quiz_data.quiz_qs.length + " question added to your quiz";
      } else {
        question_ct.textContent = "You currently have " + quiz_data.quiz_qs.length + " questions added to your quiz";
      }
    }

  };
  document.addEventListener("DOMContentLoaded", function() {
    const instructionsToggle = document.querySelector('.instructions-toggle');
    const instructionsContent = document.querySelector('.instructions-content');

    
    instructionsContent.style.display = 'none';

    instructionsToggle.addEventListener('click', function() {
        if (instructionsContent.style.display === 'none') {
            instructionsContent.style.display = 'block';
            instructionsToggle.innerHTML = 'Instructions &#9650;';
        } else {
            instructionsContent.style.display = 'none';
            instructionsToggle.innerHTML = 'Instructions &#9660;';
        }
    });
});
