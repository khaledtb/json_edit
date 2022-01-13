let formHeader = document.getElementById("api_selector");

let checkboxHtml = `<label for="ejson"><span style='color:white;'>toggle editor&nbsp;</span><input type="checkbox" id="ejson"/></label>`;
formHeader.innerHTML = checkboxHtml + formHeader.innerHTML;

let checkbox = document.getElementById("ejson");
checkbox.checked = true;
checkbox.onchange = function (e) {
  if (!e.target.checked) {
    let jsoneditor = document.querySelectorAll(".customjsoneditor");
    let jsonText = document.querySelectorAll("div.response_body");

    jsoneditor.forEach(function (jse) {
      jse.classList.add("injected-json-editor-hide");
    });

    jsonText.forEach(function (jst) {
      jst.classList.remove("injected-json-editor-hide");
    });
  } else {
    let jsoneditor = document.querySelectorAll(".customjsoneditor");
    let jsonText = document.querySelectorAll("div.response_body");

    jsoneditor.forEach(function (jse) {
      jse.classList.remove("injected-json-editor-hide");
    });

    jsonText.forEach(function (jst) {
      jst.classList.add("injected-json-editor-hide");
    });
  }
};

setTimeout(() => {
  let button = document.querySelectorAll("input.submit");

  if (button.length > 0) {
    button.forEach(function (b) {
      b.addEventListener("click", function () {
        test(b);
      });
    });
  }
}, 500);

function test(button) {
  setTimeout(function takeAction() {
    let myBtn = button.getAttribute("data-clicked");
    if (myBtn === null) {
      let oldJsonView =
        button.parentElement.parentElement.nextElementSibling.querySelector(
          "div.response_body"
        );

      if (
        oldJsonView.nodeType !== 1 ||
        (oldJsonView.nodeType === 1 && oldJsonView.childElementCount === 0)
      ) {
        console.log("rewwind");
        setTimeout(takeAction, 100);
        return;
      }

      if (oldJsonView.nodeType === 1 && oldJsonView.childElementCount > 0) {
        button.setAttribute("data-clicked", "true");

        let container = document.createElement("div");
        container.className = "customjsoneditor";

        // create the editor
        //var container = document.getElementById("jsoneditor");

        var editor = new JSONEditor(container);

        console.log("oldJsonView", oldJsonView);
        console.log(
          "oldJsonView.firstElementChild",
          oldJsonView.firstElementChild
        );

        console.log(
          "oldJsonView.firstElementChild.innerText",
          oldJsonView.firstElementChild.innerText
        );

        // set json
        var json = JSON.parse(oldJsonView.firstElementChild.innerText);
        editor.set(json);

        // get json
        //var json = editor.get();

        // oldJsonView.classList.add('injected-json-editor-hide');
        oldJsonView.parentNode.insertBefore(container, oldJsonView);

        if (!checkbox.checked) {
          container.classList.add("injected-json-editor-hide");
          oldJsonView.classList.remove("injected-json-editor-hide");
        } else {
          container.classList.remove("injected-json-editor-hide");
          oldJsonView.classList.add("injected-json-editor-hide");
        }
      }
    } else {
      let oldJsonView =
        button.parentElement.parentElement.nextElementSibling.querySelector(
          "div.response_body"
        );
      let container = document.createElement("div");
      container.className = "customjsoneditor";

      // create the editor

      var editor = new JSONEditor(container);

      // set json
      var json = JSON.parse(oldJsonView.firstElementChild.innerText);
      editor.set(json);

      // get json
      let oldEditor =
        button.parentElement.parentElement.nextElementSibling.querySelector(
          "div.customjsoneditor"
        );
      oldEditor.parentNode.replaceChild(container, oldEditor);
    }
  }, 500);
}
