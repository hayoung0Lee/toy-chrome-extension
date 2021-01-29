# Toy Project One: TS-CHROME-EXTENSION
- [Getting started](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
- [developer chrome](https://developer.chrome.com/)
  
## Getting Started 읽어보자
- Chrome Extension은 무엇으로 구성 되는가?
    1. background-scripts
    2. content scripts
    3. options page
    4. UI elements
    5. ... various logic files
    6. 웹개발 기술: HTML, CSS, JavaScript

- Extentions란?
  - 소프트웨어 프로그램으로, 웹기술을 기반으로 User의 크롬 사용 경험을 커스터마이징 할 수 있게 해준다


## Extention 개발 하기
1. [manifest](https://developer.chrome.com/docs/extensions/mv2/manifest/) 파일 만들기 
    - manifest? 이게 무슨 프로그램인지 소개해주는 느낌의 json 파일
    - manifest 파일을 가지고 있는 directory는 developer mode에 extension으로 추가 가능하다


2. [background script](https://developer.chrome.com/docs/extensions/mv2/background_pages/)
    - backgroud page가 호출되는 경우
        ```
        - The extension is first installed or updated to a new version.
        - The background page was listening for an event, and the event is dispatched.
        - A content script or other extension sends a message.
        - Another view in the extension, such as a popup, calls runtime.getBackgroundPage.
        ```

3. [user interface](https://developer.chrome.com/docs/extensions/mv2/user_interface/)
    - [page action](https://developer.chrome.com/docs/extensions/reference/pageAction/)
    - [popup 이란?](https://developer.chrome.com/docs/extensions/mv2/user_interface/#popup)
      - extension 버튼을 누렀을때 나오는 창, 마치 웹페이지 같은 것
      - html, css는 포함하지만 inline js는 안된다
    - [icon 설정](https://developer.chrome.com/docs/extensions/mv2/user_interface/#icons)
      - default_icons: 툴바에 나오는 아이콘
      - icons: 그외의 용도

3. [declarativeContent](https://developer.chrome.com/docs/extensions/reference/declarativeContent/)
    - [ShowPageAction](https://developer.chrome.com/docs/extensions/reference/declarativeContent/#type-ShowPageAction)
      - 조건이 맞으면 page action을 보여주는 곳

4. [popup.js]
    - [storage](https://developer.chrome.com/docs/extensions/reference/storage/)

5. [content script](https://developer.chrome.com/docs/extensions/mv2/content_scripts/#pi)
    - [active tab](https://developer.chrome.com/docs/extensions/mv2/manifest/activeTab/)