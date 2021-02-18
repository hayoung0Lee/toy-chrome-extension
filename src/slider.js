(function () {
  // 즉시 실행 함수로 변환!
  const getBookMarkElement = document.getElementsByClassName("bookmark-div")[0];

  if (getBookMarkElement) {
    getBookMarkElement.remove();
  } else {
    const rightDiv = document.createElement("div");

    rightDiv.innerHTML = `
        <div>BookMark</div> 
        <ul> 
            <li><button class="bookmark-create-folder">Create Folder</button></li>
            <li><button class="bookmark-add-link">Add Current Video</button></li>
        </ul>
        <ul class="bookmark-list-wrapper"></ul>
    `;

    rightDiv.classList.add("bookmark-div");

    rightDiv.style.position = "fixed";
    rightDiv.style.backgroundColor = "white";
    rightDiv.style.border = "1px solid black";
    rightDiv.style.right = "0";
    rightDiv.style.zIndex = "9999";
    rightDiv.style.width = "300px";
    rightDiv.style.height = "100vh";

    function redirectToUrl(e) {
      console.log(e);
      const innerText = e.path[0].outerText;
      window.location.assign(innerText);
    }

    function drawAllContents() {
      // TODO: 이거 지금은 그냥 싹다 지우고 새로 그리는데, 개선하기
      chrome.storage.sync.get("urls", function (data) {
        const listWrapper = document.getElementsByClassName(
          "bookmark-list-wrapper"
        )[0];
        listWrapper.innerHTML = "";

        console.log(data, data.urls);
        for (const d of data.urls) {
          const newElement = document.createElement("li");
          const button = document.createElement("button");
          button.innerText = d;
          newElement.appendChild(button);
          listWrapper.appendChild(newElement);

          button.addEventListener("click", (e) => redirectToUrl(e));
        }
      });
    }

    drawAllContents();

    const getBody = document.getElementsByTagName("body")[0];
    getBody.appendChild(rightDiv);

    // TODO: Folder Add

    // FIXME: 함수 정리하기, 그리고 이거 여기서 다 처리해도 되는건지, 그리고 eventlistener  여러번 로드해도 되는건지
    const getBookMarkAddBtn = document.getElementsByClassName(
      "bookmark-add-link"
    )[0];

    function addBookMarkAdd() {
      //   alert("BookMarkAdd");
      const userInput = document.createElement("div");
      userInput.style.width = "400px";
      userInput.style.height = "300px";
      userInput.style.position = "absolute";
      userInput.style.zIndex = "9999";
      userInput.style.border = "1px solid black";
      userInput.style.backgroundColor = "white";
      userInput.style.top = "calc(50% - 150px)";
      userInput.style.left = "calc(50% - 200px)";
      userInput.classList.add("bookmark-modal");
      getBody.appendChild(userInput);

      addInput(userInput);
    }

    // TODO: 함수를 공통으로 쓸수 있게 만들기: folder, video
    function addInput(userInput) {
      userInput.innerHTML = `
            <form class="bookmark-userinput">
                <label>
                    입력
                    <input type="text" value="안녕"/>
                </label>
                <button type="submit" value="btn">추가하기</button>
            </form>
        `;

      const getForm = document.getElementsByClassName("bookmark-userinput")[0];

      getForm.addEventListener("click", (e) => {
        e.preventDefault();

        // 입력을 받아오는곳
        for (const input of getForm) {
          if (input.value !== "btn") {
            console.log(input, input.value);
          }
        }

        const currentUrl = window.location.toString();
        console.log("current location", currentUrl);

        // FIXME: 함수로 나누기, 여기다 다 때려박지말자..
        chrome.storage.sync.get("urls", function (data) {
          console.log("here");
          chrome.storage.sync.set(
            { urls: [...data.urls, currentUrl] },
            function () {
              //  A data saved callback omg so fancy
              console.log("set URL");

              // TODO: 이거 위치 바꾸기
              drawAllContents();
            }
          );
        });

        document.getElementsByClassName("bookmark-modal")[0].remove();
      });
    }

    getBookMarkAddBtn.addEventListener("click", addBookMarkAdd);
  }
})();
