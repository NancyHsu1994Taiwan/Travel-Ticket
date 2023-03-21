axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json"
  )
  .then(function (res) {
    let data = res.data;
    // 變數
    const ticketCardArea = document.querySelector(".ticketCard-area");
    // let str = "";
    let regionSearch = document.querySelector(".regionSearch");
    let searchResultText = document.querySelector("#searchResult-text");

    // 插入資料
    function print(input) {
      let str = "";
      let newData = [];
      data.forEach(function (item) {
        if (input === item.area) {
          // 特定地區
          newData.push(item);
        } else if (input === "") {
          // 全部地區
          newData.push(item);
        } else if (input === undefined) {
          newData.push(item);
        }
      });
      console.log(newData);
      console.log(input);
      newData.forEach(function (item) {
        str += `
    <li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                <img
                    src=${item.imgUrl}
                    alt=""
                />
                </a>
                <div class="ticketCard-region">${item.area}</div>
                <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
                <div>
                <h3>
                    <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                    ${item.description}
                </p>
                </div>
                <div class="ticketCard-info">
                <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">${item.price}</span>
                </p>
                </div>
            </div>
            </li>
          `;
      });
      ticketCardArea.innerHTML = str;
      searchResultText.textContent = `本次搜尋共 ${newData.length} 筆資料`;
    }

    print();

    // 篩選功能
    function filter() {
      regionSearch.addEventListener("change", function () {
        console.log(regionSearch.value);
        print(regionSearch.value);
      });
    }

    filter();

    // 新增功能
    function insert() {
      const ticketName = document.querySelector("#ticketName");
      const ticketImgUrl = document.querySelector("#ticketImgUrl");
      const ticketRegion = document.querySelector("#ticketRegion");
      const ticketPrice = document.querySelector("#ticketPrice");
      const ticketNum = document.querySelector("#ticketNum");
      const ticketRate = document.querySelector("#ticketRate");
      const ticketDescription = document.querySelector("#ticketDescription");

      const addTicketBtn = document.querySelector(".addTicket-btn");
      addTicketBtn.addEventListener("click", function () {
        let obj = {
          id: Date.now(),
          name: ticketName.value,
          imgUrl: ticketImgUrl.value,
          area: ticketRegion.value,
          description: ticketDescription.value,
          group: parseInt(ticketNum.value),
          price: parseInt(ticketPrice.value),
          rate: parseInt(ticketRate.value),
        };
        console.log(obj);
        data.push(obj);
        print();

        const form = document.querySelector(".addTicket-form");
        form.reset();
      });
    }

    insert();
  });
