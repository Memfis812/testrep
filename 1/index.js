
'use strict';

let main = null;
let table = null;
let tbody = null;
let modalWindow = null;
let counter = 0;

class Client {
  constructor(client) {
    this.date = client.date;
    this.form = client.form;
    this.name = client.name;
    this.juristicAddress = client.juristicAddress;
    this.actualAddress = client.actualAddress;
    this.ogrn = client.ogrn;
    this.inn = client.inn;
    this.kpp = client.kpp;
    this.okpo = client.okpo;
    this.okvd = client.okvd;
    this.bank = client.bank
    this.rs = client.rs;
    this.ks = client.ks;
    this.bic = client.bic;
    this.contact = client.contact;
    this.tel = client.tel;
    this.mail = client.mail;
    this.contractNumber = client.contractNumber;
    this.contractDate = client.contractDate;
    this.trade = client.trade;
    this.sum = client.sum.toFixed(2);
    this.payment = client.payment.toFixed(2);
    this.indebtedness = client.indebtedness.toFixed(2);
    this.comment = client.comment;
    this.manager = client.manager;
    this.tableRow = [this.date, this.form, this.name, this.trade, this.sum, this.payment, this.indebtedness,this.manager, this.comment];
  }

  static createTable() {
    main = document.querySelector('.main');
    table = document.createElement('table');
    tbody = document.createElement('tbody');

    main.appendChild(table);
    table.appendChild(tbody);
  }

  static createTableTitle(...title) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);

    for(let i = 0; i < title.length; i++) {
      let th = document.createElement('th');
      tr.appendChild(th);
      th.innerHTML = title[i];
    }
  }
  
  static showFullInformation(eventGlobal) {
    let target = eventGlobal.target;

    if (target.tagName !== 'TD') {
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    modalWindow = document.querySelector('.modal_window');
    modalWindow.style.display = 'block';
    modalWindow.style.position = 'fixed';
    modalWindow.style.top = (document.documentElement.clientHeight / 2 - modalWindow.offsetHeight / 2) + 'px';
    modalWindow.style.left = (document.documentElement.clientWidth / 2 - modalWindow.offsetWidth / 2) + 'px';

    let form = document.forms.full_information;
    let inputs = form.querySelectorAll('input');

    inputs[0].value = this.date;
    inputs[1].value = this.form;
    inputs[2].value = this.name;
    inputs[3].value = this.juristicAddress;
    inputs[4].value = this.actualAddress;
    inputs[5].value = this.ogrn;
    inputs[6].value = this.inn;
    inputs[7].value = this.kpp;
    inputs[8].value = this.okpo;
    inputs[9].value = this.okvd;
    inputs[10].value = this.bank;
    inputs[11].value = this.rs;
    inputs[12].value = this.ks;
    inputs[13].value = this.bic;
    inputs[14].value = this.contact;
    inputs[15].value = this.tel;
    inputs[16].value = this.mail;
    inputs[17].value = this.contractNumber;
    inputs[18].value = this.contractDate;
    inputs[19].value = this.trade;
    inputs[20].value = this.sum;
    inputs[21].value = this.payment;
    inputs[22].value = this.indebtedness;
    inputs[23].value = this.manager;
    inputs[24].value = this.comment;
    
    let closeIcon = document.querySelector('.close_icon');
    closeIcon.onclick = () => {
      modalWindow.style.display = 'none';
      document.documentElement.style.overflow = 'hidden';
    };

    let removeIcon = document.querySelector('.remove_icon');
    removeIcon.onclick = (e) => {
      let tar = e.target;
      let removeModalWindow = document.querySelector('.remove_modal_window');
      removeModalWindow.style.display = 'block';
      removeModalWindow.style.position = 'fixed';
      removeModalWindow.style.top = (document.documentElement.clientHeight / 2 - removeModalWindow.offsetHeight / 2) + 'px';
      removeModalWindow.style.left = (document.documentElement.clientWidth / 2 - removeModalWindow.offsetWidth / 2) + 'px';

      let removeTrueIcon = document.querySelector('.remove_true_icon');
      let closeRemoveModalWindowIcon = document.querySelector('.close_remove_modal_window_icon');

      let cover = document.createElement('div');
      cover.classList.add('cover');
      modalWindow.appendChild(cover);

      let changeSize = document.querySelector('.change_size');
      modalWindow.appendChild(cover);
      
      if (changeSize.getAttribute('disabled') === 'false') {
        cover.style.width = '1024px';
        cover.style.left = (document.documentElement.clientWidth / 2 - cover.offsetWidth / 2) + 'px';

      } else if (changeSize.getAttribute('disabled') === 'true') {
        cover.style.width = '100%';
        cover.style.left = 0;
      }

      cover.style.height = '100%';
      cover.style.position = 'fixed';
      cover.style.top = 0;
      cover.style.backgroundColor = 'black';
      cover.style.opacity ='0.5';

      removeTrueIcon.onclick = () => {
        let tr = target.parentElement;
        tbody.removeChild(tr);
        modalWindow.style.display = 'none';
        removeModalWindow.style.display = 'none';
        modalWindow.removeChild(cover);
        
        let row = document.querySelectorAll('.main tr:not(.fixed)[style*="table-row"]');

        for(let i = 0; i < row.length; i++) {

          if (i % 2 === 0) {
            row[i].style.backgroundColor = '#272727';
          }

          if (i % 2 !== 0) {
            row[i].style.backgroundColor = '#242424';
          }
      }

        document.documentElement.style.overflow = 'hidden';
        Client.showFooterInformation();
        Client.showDeleteInformation(eventGlobal.target, (elem) => {
          setTimeout(() => {
            elem.hidden = true;
          }, 3000);
        });
      };

      closeRemoveModalWindowIcon.onclick = () => {
        removeModalWindow.style.display = 'none';
        modalWindow.removeChild(cover);
      };

    };

    let flag = 0;
    let changeIcon = document.querySelector('.change_icon');
    changeIcon.onclick = () => {
      let changeField = document.querySelectorAll('.change_field');
      
      if (flag % 2 === 0) {

        for(let i = 0; i < changeField.length; i++) {
          changeField[i].style.borderColor = '#42ab9e';
          changeField[i].style.backgroundColor = '#ffff';
          changeField[i].disabled = false;
        }

        changeIcon.classList.remove('lnr-pencil');
        changeIcon.classList.add('lnr-lock');

        closeIcon.onclick = () => {

          for(let i = 0; i < changeField.length; i++) {
            changeField[i].style.borderColor = '#fb6e40';
          }

          return false;
        };

        removeIcon.onclick = () => {
          let removeModalWindow = document.querySelector('.remove_modal_window');
          let removeTrueIcon = document.querySelector('.remove_true_icon');
          let closeRemoveModalWindowIcon = document.querySelector('.close_remove_modal_window_icon');
          removeModalWindow.style.display = 'block';
          removeModalWindow.style.position = 'fixed';
          removeModalWindow.style.top = (document.documentElement.clientHeight / 2 - removeModalWindow.offsetHeight / 2) + 'px';
          removeModalWindow.style.left = (document.documentElement.clientWidth / 2 - removeModalWindow.offsetWidth / 2) + 'px';
          let cover = document.createElement('div');
          cover.classList.add('cover');
          let changeSize = document.querySelector('.change_size');
          modalWindow.appendChild(cover);
          
          if (changeSize.getAttribute('disabled') === 'false') {
            cover.style.width = '1024px';
            cover.style.left = (document.documentElement.clientWidth / 2 - cover.offsetWidth / 2) + 'px';

          } else if (changeSize.getAttribute('disabled') === 'true') {
            cover.style.width = '100%';
            cover.style.left = 0;
          }

          cover.style.height = '100%';
          cover.style.position = 'fixed';
          cover.style.top = 0;
          cover.style.backgroundColor = 'black';
          cover.style.opacity ='0.5';

          removeTrueIcon.onclick = () => {

            for(let i = 0; i < changeField.length; i++) {
              changeField[i].style.borderColor = '#eeeeee';
              changeField[i].style.backgroundColor = '#f8f8f8';
              changeField[i].disabled = true;
            }
  
            changeIcon.classList.remove('lnr-lock');
            changeIcon.classList.add('lnr-pencil');
            let tr = target.parentElement;
            tbody.removeChild(tr);
            modalWindow.style.display = 'none';
            removeModalWindow.style.display = 'none';
            modalWindow.removeChild(cover);
            document.documentElement.style.overflow = 'hidden';
            let row = document.querySelectorAll('.main tr:not(.fixed)[style*="table-row"]');

            for(let i = 0; i < row.length; i++) {

              if (i % 2 === 0) {
                row[i].style.backgroundColor = '#272727';
              }
    
              if (i % 2 !== 0) {
                row[i].style.backgroundColor = '#242424';
              }
            }

            Client.showFooterInformation();
            Client.showDeleteInformation(eventGlobal.target, (elem) => {
              setTimeout(() => {
                elem.hidden = true;
              }, 3000);
            });
          };

          closeRemoveModalWindowIcon.onclick = () => {
            removeModalWindow.style.display = 'none';
            modalWindow.removeChild(cover);
          };
        };
      }

      if (flag % 2 !== 0) {

        for(let i = 0; i < changeField.length; i++) {
          changeField[i].style.borderColor = '#eeeeee';
          changeField[i].style.backgroundColor = '#f8f8f8';
          changeField[i].disabled = true;
        }

        changeIcon.classList.remove('lnr-lock');
        changeIcon.classList.add('lnr-pencil');

        this.form = inputs[1].value;
        this.name = inputs[2].value;
        this.juristicAddress = inputs[3].value;
        this.actualAddress = inputs[4].value;
        this.ogrn = inputs[5].value; 
        this.inn = inputs[6].value;
        this.kpp = inputs[7].value;
        this.okpo = inputs[8].value;
        this.okvd = inputs[9].value; 
        this.bank = inputs[10].value;
        this.rs = inputs[11].value;
        this.ks = inputs[12].value;
        this.bic = inputs[13].value; 
        this.contact = inputs[14].value;
        this.tel = inputs[15].value;
        this.mail = inputs[16].value;
        this.contractNumber = inputs[17].value;
        this.contractDate = inputs[18].value;
        this.manager = inputs[23].value;
        this.comment = inputs[24].value;

        let td = eventGlobal.target;
        let tr = td.parentElement;

        tr.children[1].innerHTML = inputs[1].value;
        tr.children[2].innerHTML = inputs[2].value;
        tr.children[7].innerHTML = inputs[23].value;
        tr.children[8].innerHTML = inputs[24].value;

        closeIcon.onclick = () => {
          modalWindow.style.display = 'none';
          document.documentElement.style.overflow = 'hidden';
        };
      }

      flag++;
    };
  }

  static showSelectOption() {
    let selectSwitch = document.querySelector('.search .left_arrow');
    let selectOption = document.querySelector('.search .select_option');
    let searchOption = document.querySelector('.search .search_option');

    if (selectSwitch.getAttribute('checked') === 'false') {
      selectSwitch.classList.remove('lnr-chevron-left');
      selectSwitch.classList.add('lnr-chevron-down');
      selectSwitch.setAttribute('checked', 'true');
      let coordsSearchOption = {
        top: searchOption.getBoundingClientRect().top + window.pageYOffset,
        left: searchOption.getBoundingClientRect().left + window.pageXOffset
      };
      selectOption.style.top = coordsSearchOption.top + searchOption.offsetHeight + 6 + 'px';
      selectOption.style.left = coordsSearchOption.left + 'px';
      selectOption.style.display = 'block';
      let listSelectOption = document.querySelectorAll('.search .select_option li');

      document.onclick = (event) => {
        let target = event.target;
        if (target !== selectSwitch && target.innerHTML !== 'КЛИЕНТ' && target.innerHTML !== 'КОЛ-ВО СДЕЛОК' && target.innerHTML !== 'МЕНЕДЖЕР' && target.innerHTML !== 'ОБЩАЯ СУММА' && target.innerHTML !== 'ОПЛАЧЕНО' && target.innerHTML !== 'ЗАДОЛЖЕННОСТЬ') {
          selectSwitch.classList.remove('lnr-chevron-down');
          selectSwitch.classList.add('lnr-chevron-left');
          selectSwitch.setAttribute('checked', 'false');
          selectOption.style.display = 'none';
        }
      };

      for(let i = 0; i < listSelectOption.length; i++) {
        listSelectOption[i].onclick = (event) => {
          let target = event.target;
          searchOption.value = target.innerHTML;
          selectSwitch.classList.remove('lnr-chevron-down');
          selectSwitch.classList.add('lnr-chevron-left');
          selectSwitch.setAttribute('checked', 'false');
          selectOption.style.display = 'none';
          let searchField = document.querySelector('.search_field');

          if (target.innerHTML === 'КЛИЕНТ') {
            let clientHelper = new Helper(searchField, 'Введите часть наименования клиента или наименование целиком', searchField.offsetWidth);
            searchField.onmouseenter = () => {
              clientHelper.showHelper();
            };

            searchField.onmouseleave = () => {
              clientHelper.removeHelper();
            };
          }

          if (target.innerHTML === 'КОЛ-ВО СДЕЛОК' || target.innerHTML === 'ОБЩАЯ СУММА' || target.innerHTML === 'ОПЛАЧЕНО' || target.innerHTML === 'ЗАДОЛЖЕННОСТЬ') {
            let tradeHelper = new Helper(searchField, 'Введите число. Перед числом допускаются символы " > " , " < " или " > = " , " < = "', searchField.offsetWidth);
            searchField.onmouseenter = () => {
              tradeHelper.showHelper();
            };

            searchField.onmouseleave = () => {
              tradeHelper.removeHelper();
            };
          }

          if (target.innerHTML === 'МЕНЕДЖЕР') {
            let managerHelper = new Helper(searchField, 'Введите часть фамилии менеджера или фамилию целиком', searchField.offsetWidth);
            searchField.onmouseenter = () => {
              managerHelper.showHelper();
            };

            searchField.onmouseleave = () => {
              managerHelper.removeHelper();
            };
          }
        };
      }

    } else if (selectSwitch.getAttribute('checked') === 'true') {
      selectSwitch.classList.remove('lnr-chevron-down');
      selectSwitch.classList.add('lnr-chevron-left');
      selectSwitch.setAttribute('checked', 'false');
      selectOption.style.display = 'none';
    }
  }

  static showDeleteInformation(target, callback) {
    let deleteInformation = document.querySelector('footer .delete_information');
    deleteInformation.hidden = false;
    deleteInformation.innerHTML = `запись ${target.parentElement.children[1].innerHTML} ${target.parentElement.children[2].innerHTML} удалена!`;
    callback(deleteInformation);
  }

  static showCreateInformation(target, callback) {
    let createInformation = document.querySelector('footer .create_information');
    createInformation.hidden = false;
    createInformation.innerHTML = `запись ${target.children[1].innerHTML} ${target.children[2].innerHTML} создана!`;
    callback(createInformation);
  }

  static getDateStartAndEnd() {
    let dateFieldFrom = document.querySelector('.date_field_from');
    let dateFieldTo = document.querySelector('.date_field_to');

    dateFieldFrom.value = '01.01.2017';
    dateFieldTo.value = new DateFormat().getDateAndTimeFormat().slice(0, 10);
  }

  static search() {
    let form = document.forms.search;
    let searchOption = form.search_option;
    let searchField = form.request_param;
    let searchFieldValue = form.request_param.value.toLowerCase();
    let searchOptionValue = form.search_option.value;
    let tr = document.querySelectorAll('.main tr:not(.fixed)');

    if (Client.searchDate() === 0) {
      Client.getDateStartAndEnd();
      return false;
    }

    if ((searchOptionValue !== 'ПАРАМЕТР ФИЛЬТРА' && searchField.value.trim() === '') || searchOptionValue === 'ПАРАМЕТР ФИЛЬТРА') {
      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';

        if (Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }   
    }

    if (searchOptionValue === 'КЛИЕНТ' && searchField.value.trim() !== '') {
      document.querySelector('.funnel').setAttribute('search', 'true');
      
      if (!isNaN(searchFieldValue)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является строкой!']).showErrorWindow();
        return false;
      }
      
      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';

        if ((tr[i].children[2].innerHTML.toLowerCase() === searchFieldValue || ~tr[i].children[2].innerHTML.toLowerCase().indexOf(searchFieldValue)) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        } 
      }
    }

    if ((searchOptionValue === 'КОЛ-ВО СДЕЛОК' && searchField.value.trim() !== '') && searchField.value.slice(0, 2) === '<=') {
      let number = parseInt(searchField.value.slice(2));
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака "<=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((tr[i].children[3].innerHTML == number || tr[i].children[3].innerHTML < number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'КОЛ-ВО СДЕЛОК' && searchField.value.slice(0, 1) === '>' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 2) !== '>=' && searchField.value.trim() !== '') {
      let number = parseInt(searchField.value.slice(1));

      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака ">" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (tr[i].children[3].innerHTML > number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'КОЛ-ВО СДЕЛОК' && searchField.value.slice(0, 1) === '<' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 2) !== '>=' && searchField.value.trim() !== '') {
      let number = parseInt(searchField.value.slice(1));

      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака "<" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (tr[i].children[3].innerHTML < number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'КОЛ-ВО СДЕЛОК' && searchField.value.slice(0, 2) === '>=' && searchField.value.trim() !== '') {
      let number = parseInt(searchField.value.slice(2));

      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака ">=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((tr[i].children[3].innerHTML == number || tr[i].children[3].innerHTML > number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'КОЛ-ВО СДЕЛОК' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 1) !== '<' && searchField.value.slice(0, 1) !== '>' && searchField.value.trim() !== '') {
      let number = parseInt(searchField.value);

      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (tr[i].children[3].innerHTML == number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОБЩАЯ СУММА' && searchField.value.slice(0, 2) === '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака "<=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[4].innerHTML === number || +tr[i].children[4].innerHTML < number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОБЩАЯ СУММА' && searchField.value.slice(0, 2) === '>=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака ">=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[4].innerHTML === number || +tr[i].children[4].innerHTML > number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОБЩАЯ СУММА' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 1) !== '>' && searchField.value.slice(0, 1) !== '<' && searchField.value.trim() !== '') {
      let number = +searchField.value;
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[4].innerHTML === number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОБЩАЯ СУММА' && searchField.value.slice(0, 1) === '<' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[4].innerHTML < number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОБЩАЯ СУММА' && searchField.value.slice(0, 1) === '>' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[4].innerHTML > number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОПЛАЧЕНО' && searchField.value.slice(0, 2) === '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака "<=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[5].innerHTML === number || +tr[i].children[5].innerHTML < number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОПЛАЧЕНО' && searchField.value.slice(0, 2) === '>=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака ">=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[5].innerHTML === number || +tr[i].children[5].innerHTML > number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОПЛАЧЕНО' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 1) !== '>' && searchField.value.slice(0, 1) !== '<' && searchField.value.trim() !== '') {
      let number = +searchField.value;
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[5].innerHTML === number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОПЛАЧЕНО' && searchField.value.slice(0, 1) === '<' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[5].innerHTML < number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ОПЛАЧЕНО' && searchField.value.slice(0, 1) === '>' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[5].innerHTML > number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ЗАДОЛЖЕННОСТЬ' && searchField.value.slice(0, 2) === '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака "<=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[6].innerHTML === number || +tr[i].children[6].innerHTML < number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ЗАДОЛЖЕННОСТЬ' && searchField.value.slice(0, 2) === '>=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(2);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Символ введенный после знака ">=" не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((+tr[i].children[6].innerHTML === number || +tr[i].children[6].innerHTML > number) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ЗАДОЛЖЕННОСТЬ' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.slice(0, 1) !== '>' && searchField.value.slice(0, 1) !== '<' && searchField.value.trim() !== '') {
      let number = +searchField.value;
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[6].innerHTML === number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ЗАДОЛЖЕННОСТЬ' && searchField.value.slice(0, 1) === '<' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[6].innerHTML < number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'ЗАДОЛЖЕННОСТЬ' && searchField.value.slice(0, 1) === '>' && searchField.value.slice(0, 2) !== '>=' && searchField.value.slice(0, 2) !== '<=' && searchField.value.trim() !== '') {
      let number = +searchField.value.slice(1);
      
      if (isNaN(number)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является числом!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');

      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if (+tr[i].children[6].innerHTML > number && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    if (searchOptionValue === 'МЕНЕДЖЕР' && searchField.value.trim() !== '') {
    
      if (!isNaN(searchFieldValue)) {
        new ProgramError('ошибка фильтрации', '1' , ['Введенный символ не является строкой!']).showErrorWindow();
        return false;
      }

      document.querySelector('.funnel').setAttribute('search', 'true');
      
      for(let i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        
        if ((tr[i].children[7].innerHTML.toLowerCase() === searchFieldValue || ~tr[i].children[7].innerHTML.toLowerCase().indexOf(searchFieldValue)) && Client.searchDate(tr[i]) !== false) {
          tr[i].style.display = 'table-row';
          continue;
        }
      }
    }

    let row = document.querySelectorAll('.main tr:not(.fixed)[style*="table-row"]');

    for(let i = 0; i < row.length; i++) {

      if (i % 2 === 0) {
        row[i].style.backgroundColor = '#272727';
      }

      if (i % 2 !== 0) {
        row[i].style.backgroundColor = '#242424';
      }
    }
  }

  static clearSearch() {
    let tr = document.querySelectorAll('.main tr');
    let form = document.forms.search;
    let searchField = form.request_param;
    searchField.value = '';

    for(let i = 1; i < tr.length; i++) {
      if (Client.searchDate(tr[i]) !== false) {
        tr[i].style.display = 'table-row';
        continue;
      }
    }

    let row = document.querySelectorAll('.main tr:not(.fixed)[style*="table-row"]');

    for(let i = 0; i < row.length; i++) {

      if (i % 2 === 0) {
        row[i].style.backgroundColor = '#272727';
      }

      if (i % 2 !== 0) {
        row[i].style.backgroundColor = '#242424';
      }
    }
  }

  static searchDate(elem = null) {
    let dateFieldFrom = document.querySelector('.date_field_from');
    let dateFieldTo = document.querySelector('.date_field_to');

    let regexp = /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/;
    let resultFrom = regexp.exec(dateFieldFrom.value);
    let resultTo = regexp.exec(dateFieldTo.value);
    
    if (resultFrom === null && resultTo !== null) {
      new ProgramError('ошибка фильтрации', '1' , ['левое поле даты заполенно не корректно!', '( дата вводится в формате "чч.мм.гггг"! )']).showErrorWindow();
      return 0;
    }

    if (resultTo === null && resultFrom !== null) {
      new ProgramError('ошибка фильтрации', '1' , ['правое поле даты заполенно не корректно!', '( дата вводится в формате "чч.мм.гггг"! )']).showErrorWindow();
      return 0;
    }

    if (resultFrom === null && resultTo === null) {
      new ProgramError('ошибка фильтрации', '2' , ['левое поле даты заполенно не корректно!', 'правое поле даты заполенно не корректно!', '( дата вводится в формате "чч.мм.гггг"! )']).showErrorWindow();
      return 0;
    }
    
    if (elem !== null) {
      let dateFieldFromValue = dateFieldFrom.value;
      let dateFieldToValue = dateFieldTo.value;
      let tr = document.querySelectorAll('.main tr');

      let dayFrom = dateFieldFromValue.slice(0, 2);
      let monthFrom = dateFieldFromValue.slice(3, 5);
      let yearFrom = dateFieldFromValue.slice(6);

      let dayTo = dateFieldToValue.slice(0, 2);
      let monthTo = dateFieldToValue.slice(3, 5);
      let yearTo = dateFieldToValue.slice(6);

      let dateFrom = yearFrom + '-' + monthFrom + '-' + dayFrom;
      let dateTo = yearTo + '-' + monthTo + '-' + dayTo;
      
      

      let day = elem.children[0].innerHTML.slice(0, 2);
      let month = elem.children[0].innerHTML.slice(3, 5);
      let year = elem.children[0].innerHTML.slice(6, 10);
      let date = year + '-' + month + '-' + day;


      if (Date.parse(dateFrom) <= Date.parse(date) && Date.parse(dateTo) >= Date.parse(date)) {
        return true;
      } else {
        return false;
      }
    }  
  }

  createTableRow() {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);

    for(let i = 0; i < this.tableRow.length; i++) {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = this.tableRow[i];
      td.onclick = Client.showFullInformation.bind(this);
    }

    if (counter % 2 === 0) {
      tr.style.backgroundColor = '#272727';
    }

    counter++;

    let rows = document.querySelectorAll('.main tr');
    for(let i = 1; i < rows.length; i++) {
      if (parseInt(rows[i].children[6].innerHTML) > 0) {
        rows[i].children[6].style.color = '#fb6e40';
      } else if (parseInt(rows[i].children[6].innerHTML) === 0.00) {
        rows[i].children[6].style.color = '#42ab9e';
      }
    }
  }

  static showFooterInformation() {
    let footer = document.querySelector('footer');
    let tr = document.querySelectorAll('.main tr:not(.fixed)');

    let clientCounter = () => {
      let counter = 0;

      for(let i = 1; i < tr.length; i++) {
        if(getComputedStyle(tr[i]).display === 'table-row') {
          counter++;
        } else {
          continue;
        }
      }

      return counter;
    };

    let tradeCounter = () => {
      let counter = 0;

      for(let i = 1; i < tr.length; i++) {
        if(getComputedStyle(tr[i]).display === 'table-row') {
          counter = counter + parseInt(tr[i].children[3].innerHTML);
        } else {
          continue;
        }
      }

      return counter;
    };

    let sumCounter = () => {
      let counter = 0;

      for(let i = 1; i < tr.length; i++) {
        if(getComputedStyle(tr[i]).display === 'table-row') {
          counter = counter + parseFloat(tr[i].children[4].innerHTML);
        } else {
          continue;
        }
      }

      return counter.toFixed(2);
    };

    let paymentCounter = () => {
      let counter = 0;

      for(let i = 1; i < tr.length; i++) {
        if(getComputedStyle(tr[i]).display === 'table-row') {
          counter = counter + parseFloat(tr[i].children[5].innerHTML);
        } else {
          continue;
        }
      }

      return counter.toFixed(2);
    };

    let indebtednessCounter = () => {
      let counter = 0;

      for(let i = 1; i < tr.length; i++) {
        if(getComputedStyle(tr[i]).display === 'table-row') {
          counter = counter + parseFloat(tr[i].children[6].innerHTML);
        } else {
          continue;
        }
      }

      return counter.toFixed(2);
    };

    let dateFieldFrom = document.querySelector('.date_field_from');
    let dateFieldTo = document.querySelector('.date_field_to');

    footer.children[0].innerHTML = `период : с ${dateFieldFrom.value} по ${dateFieldTo.value}`;
    footer.children[1].innerHTML = `клиентов : ${clientCounter()}`;
    footer.children[2].innerHTML = `сделок : ${tradeCounter()}`;
    footer.children[3].innerHTML = `на сумму : ${sumCounter()}`;
    footer.children[4].innerHTML = `оплачено : ${paymentCounter()}`;
    footer.children[5].innerHTML = `задолженность : ${indebtednessCounter()}`;
  }
}

class ProgramError {
  constructor(errorType, errorNumber, errorText) {
    this.errorType = errorType;
    this.errorNumber = errorNumber;
    this.errorText = errorText;
  }

  showErrorWindow() {
    let errorWindow = document.createElement('div');
    let cover = document.createElement('div');
    document.body.appendChild(cover);
    cover.classList.add('cover');
    cover.style.position = 'fixed';
    cover.style.width = '100%';
    cover.style.height = '100%';
    cover.style.top = (document.documentElement.clientHeight / 2 - cover.offsetHeight / 2) + 'px';
    cover.style.left = (document.documentElement.clientWidth / 2 - cover.offsetWidth / 2) + 'px';
    cover.style.backgroundColor = 'black';
    cover.style.opacity ='0.5';
    document.body.appendChild(errorWindow);
    errorWindow.classList.add('error_window');
    let errorIcon = document.createElement('span');
    let removeErrorWindowIcon = document.createElement('span');
    removeErrorWindowIcon.classList.add('lnr');
    removeErrorWindowIcon.classList.add('lnr-cross-circle');
    errorIcon.classList.add('lnr');
    errorIcon.classList.add('lnr-warning');
    let type = document.createElement('p');
    let number = document.createElement('p');
    let text = document.createElement('p');
    type.innerHTML = `Тип ошибки : ${this.errorType}`;
    number.innerHTML = `Кол-во ошибок : ${this.errorNumber}`;
    text.innerHTML = 'Список ошибок :';
    errorWindow.appendChild(errorIcon);
    errorWindow.appendChild(type);
    errorWindow.appendChild(number);
    errorWindow.appendChild(text);

    for(let i = 0; i < this.errorText.length; i++) {
      let p = document.createElement('p');
      errorWindow.appendChild(p).innerHTML = this.errorText[i];
    }

    errorWindow.appendChild(removeErrorWindowIcon);
    errorWindow.style.position = 'fixed';
    errorWindow.style.top = (document.documentElement.clientHeight / 2 - errorWindow.offsetHeight / 2)  + 'px';
    errorWindow.style.left = (document.documentElement.clientWidth / 2 - errorWindow.offsetWidth / 2) + 'px';

    removeErrorWindowIcon.onclick = () => {
      ProgramError.removeErrorWindow();
    };
  }

  static removeErrorWindow() {
    let errorWindow = document.querySelector('.error_window');
    let cover =document.querySelector('.cover');
    document.body.removeChild(errorWindow);
    document.body.removeChild(cover);
  }
}


class DateFormat {
  constructor() {
    this.date = new Date().getDate() + '';
    this.month = (new Date().getMonth() + 1) + '';
    this.year = new Date().getFullYear() + '';
    this.hours = new Date().getHours() + '';
    this.minutes = new Date().getMinutes() + '';
  }

  getDateAndTimeFormat() {

    if (this.date.length === 1) {
      this.date =  0 + this.date;
    }

    if (this.month.length === 1) {
      this.month =  0 + this.month;
    }

    if (this.hours.length === 1) {
      this.hours =  0 + this.hours;
    }

    if (this.minutes.length === 1) {
      this.minutes =  0 + this.minutes;
    }

    return `${this.date}.${this.month}.${this.year}/${this.hours}:${this.minutes}`;
  }

  getDateFormat(date, month, year) {
    date +='';
    month +=''; 

    if (date.length === 1) {
      date = `0${date}`;
    }

    if (month.length === 1) {
      month = `0${month}`;
    }

    return `${date}.${month}.${year}`;
  }
}

class Helper {
  constructor(target, text, width) {
    this.target = target;
    this.text = text;
    this.width = width;
    this.helper = null;
  }

  showHelper() {
    this.helper = document.createElement('div');
    this.helper.classList.add('helper');
    document.body.appendChild(this.helper);
    let helperText = document.createElement('p');
    this.helper.appendChild(helperText);
    helperText.innerHTML = this.text;
    let location = {
      top: (this.target.getBoundingClientRect().top + window.pageYOffset + this.target.offsetHeight) + 10 + 'px',
      left: (this.target.getBoundingClientRect().left + window.pageXOffset) + 'px'
    }
    this.helper.style.position = 'absolute';
    this.helper.style.top = location.top;
    this.helper.style.left = location.left;
    this.helper.style.width = this.width + 'px';
  }

  removeHelper() {
    document.body.removeChild(this.helper);
  }
}

class Calendar {
  constructor(target, name) {
    this.target = target;
    this.name = name;
  }

  createCalendar() {
    let calendar = document.createElement('div');
    document.body.appendChild(calendar);
    calendar.classList.add('calendar');
    calendar.classList.add(this.name);
    calendar.style.top = (this.target.getBoundingClientRect().top + window.pageYOffset + this.target.offsetHeight) + 6 + 'px';
    calendar.style.left = (this.target.getBoundingClientRect().left + window.pageXOffset) + 'px';
    let calendarHeader = document.createElement('div');
    calendar.appendChild(calendarHeader);
    calendarHeader.classList.add('calendar_header');
    let calendarHeaderContent = document.createElement('h4');
    calendarHeader.appendChild(calendarHeaderContent);
    calendarHeaderContent.classList.add('calendar_header_content');
    let nextMonthBtn = document.createElement('span');
    calendarHeader.appendChild(nextMonthBtn);
    nextMonthBtn.classList.add('lnr');
    nextMonthBtn.classList.add('lnr-chevron-up');
    nextMonthBtn.classList.add('next_month_btn');
    let previousMonthBtn = document.createElement('span');
    calendarHeader.appendChild(previousMonthBtn);
    previousMonthBtn.classList.add('lnr');
    previousMonthBtn.classList.add('lnr-chevron-down');
    previousMonthBtn.classList.add('previous_month_btn');
    let previousYearBtn = document.createElement('span');
    previousYearBtn.classList.add('previous_year_btn');
    previousYearBtn.classList.add('lnr');
    previousYearBtn.classList.add('lnr-chevron-left');
    calendarHeader.insertBefore(previousYearBtn, calendarHeaderContent);
    let nextYearBtn = document.createElement('span');
    nextYearBtn.classList.add('next_year_btn');
    nextYearBtn.classList.add('lnr');
    nextYearBtn.classList.add('lnr-chevron-right');
    calendarHeader.insertBefore(nextYearBtn, calendarHeaderContent);
    calendarHeaderContent.innerHTML = `${Calendar.getMonthFormat(new Date().getMonth())} ${new Date().getFullYear()}`;
    Calendar.createCalendarDays(this.name);
  }

  static getMonthFormat(number) {
    let month;
    let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return month = monthName[number];
  }

  static getDaysInMonth(year, month) {
    return 33 - new Date(year, month, 33).getDate();
  }

  static getYearAndMonth(name) {
    let  yearAndMonth = document.querySelector(`.${name} .calendar_header_content`).innerHTML.split(' ');
    let monthArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return {
      year: parseInt(yearAndMonth[1]),
      month: monthArray.indexOf(yearAndMonth[0])
    }
  }

  static createCalendarDays(name) {
    let monthCounter = Calendar.getYearAndMonth(name).month;
    let yearCounter = Calendar.getYearAndMonth(name).year;
    let calendar = document.querySelector('.' + name);
    let calendarTable = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    for(let i = 0; i < Calendar.getDay(Calendar.getYearAndMonth(name).year, Calendar.getYearAndMonth(name).month); i++) {
      calendarTable += '<td></td>';
    }


    for(let i = 1; i <= Calendar.getDaysInMonth(Calendar.getYearAndMonth(name).year, Calendar.getYearAndMonth(name).month); i++) {
      calendarTable += `<td>${i}</td>`;
      
      if (new Date(Calendar.getYearAndMonth(name).year, Calendar.getYearAndMonth(name).month, i).getDay() === 0) {
        calendarTable += '</tr><tr>';
      }
    }

    calendar.innerHTML += calendarTable;

    let calendarHeader = calendar.querySelector('.calendar_header');
    let calendarHeaderContent = calendarHeader.querySelector('.calendar_header_content');
    let nextMonthButton = calendarHeader.querySelector('.next_month_btn');
    let previousMonthButton = calendarHeader.querySelector('.previous_month_btn');
    let nextYearButton = calendarHeader.querySelector('.next_year_btn');
    let previousYearButton = calendarHeader.querySelector('.previous_year_btn');

    previousYearButton.onclick = () => {
      yearCounter--;

      calendar.removeChild(calendar.querySelector('table'));
      calendarHeaderContent.innerHTML = `${Calendar.getMonthFormat(monthCounter)} ${yearCounter}`;
      Calendar.createCalendarDays(name);
    };

    nextYearButton.onclick = () => {
      yearCounter++;

      calendar.removeChild(calendar.querySelector('table'));
      calendarHeaderContent.innerHTML = `${Calendar.getMonthFormat(monthCounter)} ${yearCounter}`;
      Calendar.createCalendarDays(name);
    };

    previousMonthButton.onclick = () => {
      monthCounter--;

      if (monthCounter < 0 ) {
        monthCounter = 11;
        yearCounter--;
      }

      calendar.removeChild(calendar.querySelector('table'));
      calendarHeaderContent.innerHTML = `${Calendar.getMonthFormat(monthCounter)} ${yearCounter}`;
      Calendar.createCalendarDays(name);
    };

    nextMonthButton.onclick = () => {
      monthCounter++;

      if (monthCounter > 11 ) {
        monthCounter = 0;
        yearCounter++;
      }

      calendar.removeChild(calendar.querySelector('table'));
      calendarHeaderContent.innerHTML = `${Calendar.getMonthFormat(monthCounter)} ${yearCounter}`;
      Calendar.createCalendarDays(name);
    };

    let td = calendar.querySelectorAll('.calendar td');
    let tr = calendar.querySelectorAll('.calendar tr');

    for(let i = 0; i < tr.length; i++) {
  
      if (tr[i].children[5]) {
        tr[i].children[5].style.color = '#fb6e40';
      }

      if (tr[i].children[6]) {
        tr[i].children[6].style.color = '#fb6e40';
      }
    }

    for(let i = 0; i < td.length; i++) {

      if (td[i].innerHTML == new Date().getDate() && new Date().getMonth() === Calendar.getYearAndMonth(name).month && new Date().getFullYear() === Calendar.getYearAndMonth(name).year) {
        td[i].style.backgroundColor = '#fb6e40';
        td[i].style.color = '#ffff';
      }

      td[i].onmouseenter = () => {

        if(td[i].innerHTML !== '') {
          td[i].style.cursor = 'pointer';
          td[i].style.border = '0.1rem solid #fb6e40';
         
        } else if (td[i].innerHTML === '') {
          td[i].style.cursor = 'auto';
        }
      };

      td[i].onmouseleave = (event) => {
        td[i].style.border = '0.1rem solid #333742';
      };
    }
  }

  static getDay(year, month) {
    let day = new Date(year, month, 1).getDay();

    if (day === 0) {
      day = 7;
    }

    return day - 1;
  }
}

let init = () => {
  Client.createTable();
  Client.createTableTitle('Дата', 'Форма', 'Клиент', 'Сделок', 'Общая сумма', 'Оплачено', 'Задолженность', 'Менеджер', 'Комментарий');

  let client = new Client({
    date: '21.09.2017/10:42',
    form: 'ЗАО',
    name: 'ЛенГазСтрой',
    juristicAddress: 'Индустриaльный пр., д.42, к.1, офис 317',
    actualAddress: 'Индустриaльный пр., д.42, к.1, офис 317',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Юрий', 
    tel: '(812)540-56-18',
    mail: 'lengazstroi@mail.ru',
    contractNumber: '1131-1',
    contractDate: '22.09.17',
    trade: 8,
    sum:  234567,
    payment: 230000,
    indebtedness: 4567,
    manager: 'Иванов A.A.',
    comment: 'оплата 5 б/д по оригиналам'
  });

  client.createTableRow();

  let client_2 = new Client({
    date: '22.09.2017/17:30',
    form: 'ООО',
    name: 'Альфа',
    juristicAddress: 'Ленская ул., д.19 офис 47',
    actualAddress: 'Ленская ул., д.19 офис 47',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Алексей', 
    tel: '(812)640-43-45',
    mail: 'alfa@mail.ru',
    contractNumber: '1132-2',
    contractDate: '24.09.17',
    trade: 1,
    sum:  20000,
    payment: 20000,
    indebtedness: 0,
    manager: 'Фролов C.A.',
    comment: 'работаем по предоплате'
  });

  client_2.createTableRow();

  let client_3 = new Client({
    date: '23.09.2017/14:36',
    form: 'ООО',
    name: 'Оптима',
    juristicAddress: 'Хасанская ул., д.6 офис 117',
    actualAddress: 'Хасанская ул., д.6 офис 117',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Виктор', 
    tel: '(812)546-12-78',
    mail: 'optima@mail.ru',
    contractNumber: '1133-3',
    contractDate: '25.09.17',
    trade: 2,
    sum:  18500,
    payment: 6000,
    indebtedness: 12500,
    manager: 'Шелюков С.Г.',
    comment: 'платят не вовремя'
  });

  client_3.createTableRow();

  let client_4 = new Client({
    date: '25.09.2017/12:40',
    form: 'ИП',
    name: 'Гришанович Л.М',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'grishanovich1977@mail.ru',
    contractNumber: '1134',
    contractDate: '25.09.17',
    trade: 1,
    sum:  65000,
    payment: 65000,
    indebtedness: 0,
    manager: 'Шелюков С.Г.',
    comment: ''
  });

  client_4.createTableRow();

  let client_5 = new Client({
    date: '26.09.2017/11:50',
    form: 'АО',
    name: 'Промтехснаб',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Алексей', 
    tel: '(812)327-15-30',
    mail: 'promtehsnab@mail.ru',
    contractNumber: '1135',
    contractDate: '25.09.17',
    trade: 10,
    sum:  1567600,
    payment: 1200000,
    indebtedness: 367600,
    manager: 'Гаврилов Е.М.',
    comment: 'оборудование, приоритетный клиент'
  });

  client_5.createTableRow();

  let client_6 = new Client({
    date: '27.09.2017/09:50',
    form: 'ООО',
    name: 'Аргон',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)245-45-23',
    mail: 'argon@mail.ru',
    contractNumber: '1136',
    contractDate: '25.09.17',
    trade: 2,
    sum:  50000,
    payment: 50000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: ''
  });

  client_6.createTableRow();

  let client_7 = new Client({
    date: '30.09.2017/16:21',
    form: 'ООО',
    name: 'Аорус',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'aorus@mail.ru',
    contractNumber: '1137',
    contractDate: '25.09.17',
    trade: 3,
    sum:  34500,
    payment: 34500,
    indebtedness: 0,
    manager: 'Фролов С.А.',
    comment: ''
  });

  client_7.createTableRow();

  let client_8 = new Client({
    date: '02.10.2017/11:36',
    form: 'ЗАО',
    name: 'Инфотекс',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'infotex@mail.ru',
    contractNumber: '1138',
    contractDate: '25.09.17',
    trade: 1,
    sum:  120000,
    payment: 120000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: 'перспективный клиент'
  });

  client_8.createTableRow();

  let client_9 = new Client({
    date: '20.10.2017/15:24',
    form: 'ООО',
    name: 'Логос',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Андрей', 
    tel: '(812)340-15-45',
    mail: 'logos@mail.ru',
    contractNumber: '1140',
    contractDate: '25.09.17',
    trade: 5,
    sum:  100000,
    payment: 80000,
    indebtedness: 20000,
    manager: 'Шелюков С.Г.',
    comment: ''
  });

  client_9.createTableRow();

  let client_10 = new Client({
    date: '05.11.2017/17:22',
    form: 'ООО',
    name: 'Пальмира',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Александр', 
    tel: '(812)340-15-45',
    mail: 'palmira@mail.ru',
    contractNumber: '1141',
    contractDate: '25.09.17',
    trade: 3,
    sum:  150000,
    payment: 150000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: 'перспективный клиент'
  });

  client_10.createTableRow();

  let client_11 = new Client({
    date: '10.12.2017/11:30',
    form: 'ООО',
    name: 'Флагман',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'flagman@mail.ru',
    contractNumber: '1142',
    contractDate: '25.09.17',
    trade: 1,
    sum:  300000,
    payment: 0,
    indebtedness: 300000,
    manager: 'Гаврилов Е.М.',
    comment: 'не оплатили перевозку, ждем оплаты, заказы не брать!'
  });

  client_11.createTableRow();

  let client_12 = new Client({
    date: '15.12.2017/13:19',
    form: 'ООО',
    name: 'СтройМонтаж',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'stroimontag@mail.ru',
    contractNumber: '1143',
    contractDate: '25.09.17',
    trade: 8,
    sum:  125500,
    payment: 100000,
    indebtedness: 25500,
    manager: 'Гаврилов Е.М.',
    comment: 'строительные товары, спб и ло'
  });

  client_12.createTableRow();

  let client_13 = new Client({
    date: '25.12.2017/09:20',
    form: 'АО',
    name: 'Промоборудование',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'promspb@mail.ru',
    contractNumber: '1144',
    contractDate: '25.09.17',
    trade: 5,
    sum:  1500000,
    payment: 1500000,
    indebtedness: 0,
    manager: 'Иванов А.А.',
    comment: 'проектные перевозки, негабарит'
  });

  client_13.createTableRow();

  let client_14 = new Client({
    date: '28.12.2017/09:50',
    form: 'ООО',
    name: 'Продукт-Трейд',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'producttrade@mail.ru',
    contractNumber: '1145',
    contractDate: '25.09.17',
    trade: 15,
    sum:  564000,
    payment: 564000,
    indebtedness: 0,
    manager: 'Иванов А.А.',
    comment: 'продукты питания, заморозка'
  });

  client_14.createTableRow();

  let client_15 = new Client({
    date: '11.01.2018/10:45',
    form: 'ООО',
    name: 'Компьютер-маркет',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'computermarket@mail.ru',
    contractNumber: '1146',
    contractDate: '25.09.17',
    trade: 20,
    sum:  870000,
    payment: 500000,
    indebtedness: 370000,
    manager: 'Иванов А.А.',
    comment: 'интернет-магазин, развозка по СПБ'
  });

  client_15.createTableRow();

  let client_16 = new Client({
    date: '15.01.2018/14:42',
    form: 'ЗАО',
    name: 'Новгородская мебельная фабрика',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'optmebel@mail.ru',
    contractNumber: '1147',
    contractDate: '25.09.17',
    trade: 2,
    sum:  60000,
    payment: 60000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: 'мебельное производство, по РФ'
  });

  client_16.createTableRow();

  let client_17 = new Client({
    date: '17.01.2018/12:45',
    form: 'ООО',
    name: 'Шефкейк',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'shef@mail.ru',
    contractNumber: '1148',
    contractDate: '25.09.17',
    trade: 3,
    sum:  18600,
    payment: 10000,
    indebtedness: 8600,
    manager: 'Шелюков С.Г.',
    comment: 'кондитерские изделия, по спб'
  });

  client_17.createTableRow();

  let client_18 = new Client({
    date: '20.01.2018/09:15',
    form: 'ООО',
    name: 'Строй-успех',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'stroiyspeh@mail.ru',
    contractNumber: '1149',
    contractDate: '25.09.17',
    trade: 1,
    sum:  9000,
    payment: 9000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: 'строительные товары, спб и ло'
  });

  client_18.createTableRow();

  let client_19 = new Client({
    date: '25.01.2018/17:47',
    form: 'ООО',
    name: 'НерудОпт',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'nerudopt@mail.ru',
    contractNumber: '1150',
    contractDate: '25.09.17',
    trade: 12,
    sum:  156400,
    payment: 150000,
    indebtedness: 6400,
    manager: 'Фролов С.А.',
    comment: 'песок, щебень, спб и ло'
  });

  client_19.createTableRow();

  let client_20 = new Client({
    date: '29.01.2018/16:26',
    form: 'ЗАО',
    name: 'Фрион',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'frion@mail.ru',
    contractNumber: '1151',
    contractDate: '25.09.17',
    trade: 1,
    sum:  45000,
    payment: 45000,
    indebtedness: 0,
    manager: 'Фролов С.А.',
    comment: 'ADR, по РФ'
  });

  client_20.createTableRow();

  let client_21 = new Client({
    date: '02.02.2018/10:51',
    form: 'ООО',
    name: 'Медтрейд',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'medtrade@mail.ru',
    contractNumber: '1152',
    contractDate: '25.09.17',
    trade: 1,
    sum:  35000,
    payment: 35000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: 'медицинское оборудование'
  });

  client_21.createTableRow();

  let client_22 = new Client({
    date: '08.02.2018/11:50',
    form: 'ИП',
    name: 'Кожевников Н.М',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'zakazmebel@mail.ru',
    contractNumber: '1153',
    contractDate: '25.09.17',
    trade: 5,
    sum:  42000,
    payment: 42000,
    indebtedness: 0,
    manager: 'Иванов А.А.',
    comment: 'мебель, интернет-магазин, по спб'
  });

  client_22.createTableRow();

  let client_23 = new Client({
    date: '10.02.2018/09:12',
    form: 'ООО',
    name: 'ОптМеталл',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'optmetall@mail.ru',
    contractNumber: '1154',
    contractDate: '25.09.17',
    trade: 1,
    sum:  58000,
    payment: 58000,
    indebtedness: 0,
    manager: 'Гаврилов Е.М.',
    comment: ''
  });

  client_23.createTableRow();

  let client_24 = new Client({
    date: '14.02.2018/12:47',
    form: 'ООО',
    name: 'Фишторг',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'fishtorg@mail.ru',
    contractNumber: '1155',
    contractDate: '25.09.17',
    trade: 0,
    sum: 0,
    payment: 0,
    indebtedness: 0,
    manager: 'Шелюков С.Г.',
    comment: 'новый клиент, ждем заявок'
  });

  client_24.createTableRow();

  let client_25 = new Client({
    date: '14.02.2018/16:33',
    form: 'ООО',
    name: 'Трейд-Комплект',
    juristicAddress: 'ш. Революции, д.12 офис 134',
    actualAddress: 'ул.Химиков., д.45 офис 12',
    ogrn: '12312312',
    inn: '0980987867',
    kpp: '56756724',
    okpo: '543457',
    okvd: '63.30',
    bank: 'ОАО "БАНК" г.Санкт-Перербург',
    rs: '12345678900987654321',
    ks: '12345678900987653214',
    bic: '32323',
    contact: 'Леонид', 
    tel: '(812)340-15-45',
    mail: 'tradecomplect@mail.ru',
    contractNumber: '1156',
    contractDate: '25.09.17',
    trade: 0,
    sum: 0,
    payment: 0,
    indebtedness: 0,
    manager: 'Шелюков С.Г.',
    comment: 'новый клиент, ждем заявок'
  });

  client_25.createTableRow();

  let tools = document.querySelector('.tools');
  let header = document.querySelector('header');
  let footer = document.querySelector('footer');
  main.style.height = (document.documentElement.clientHeight - tools.offsetHeight - header.offsetHeight - footer.offsetHeight) + 'px';

  Client.getDateStartAndEnd();
  Client.showFooterInformation();
  

  window.onresize = () => {
    main.style.height = (document.documentElement.clientHeight - tools.offsetHeight - header.offsetHeight - footer.offsetHeight) + 'px';

    if(document.contains(document.querySelector('.calendar'))) {
      document.body.removeChild(document.querySelector('.calendar'));
    }

    if(document.querySelector('.main tbody').contains(document.querySelector('.fixed'))) {
      document.querySelector('.fixed').style.width = document.querySelectorAll('.main tr')[0].offsetWidth + 'px';

      for(let i = 0; i < document.querySelector('.fixed').querySelectorAll('th').length; i++) {
        document.querySelector('.fixed').querySelectorAll('th')[i].style.width = parseInt(getComputedStyle(document.querySelectorAll('.main table tr:first-child th')[i]).width)  + 'px';
      }

      document.querySelector('.fixed').style.top = tools.getBoundingClientRect().bottom + window.pageYOffset + 'px';
    }

    if (document.querySelector('.search .left_arrow').getAttribute('checked') === 'true') {
      let selectOption = document.querySelector('.search .select_option');
      let searchOption = document.querySelector('.search .search_option');
      let coordsSearchOption = {
        top: searchOption.getBoundingClientRect().top + window.pageYOffset,
        left: searchOption.getBoundingClientRect().left + window.pageXOffset
      };
      selectOption.style.top = coordsSearchOption.top + searchOption.offsetHeight + 6 + 'px';
      selectOption.style.left = coordsSearchOption.left + 'px';
    }

    document.querySelector('.modal_window').style.left = (document.documentElement.clientWidth / 2 - document.querySelector('.modal_window').offsetWidth / 2) + 'px';
    document.querySelector('.modal_window_create').style.left = (document.documentElement.clientWidth / 2 - document.querySelector('.modal_window_create').offsetWidth / 2) + 'px';
    document.querySelector('.remove_modal_window').style.left = (document.documentElement.clientWidth / 2 - document.querySelector('.remove_modal_window').offsetWidth / 2) + 'px';
    document.querySelector('.close_modal_window_create').style.left = (document.documentElement.clientWidth / 2 - document.querySelector('.close_modal_window_create').offsetWidth / 2) + 'px';
    document.querySelector('.remove_modal_window').style.top = (document.documentElement.clientHeight / 2 - document.querySelector('.remove_modal_window').offsetHeight / 2) + 'px';
    document.querySelector('.close_modal_window_create').style.top = (document.documentElement.clientHeight / 2 - document.querySelector('.close_modal_window_create').offsetHeight / 2) + 'px';

    if(document.body.contains(document.querySelector('.cover'))) {
      document.querySelector('.cover').style.left = (document.documentElement.clientWidth / 2 - document.querySelector('.cover').offsetWidth / 2) + 'px';
    }
  }

  main.onscroll = () => {
    let titleTable = table.querySelectorAll('tr')[0];
    let titleTableBottom = (titleTable.getBoundingClientRect().bottom + window.pageYOffset) - (main.getBoundingClientRect().top + pageYOffset);
  

    if (main.scrollTop > titleTableBottom && !tbody.contains(tbody.querySelector('.fixed'))) {
      let titleTableClone = titleTable.cloneNode(true);
      tbody.appendChild(titleTableClone);
      titleTableClone.classList.add('fixed');
      titleTableClone.style.width = titleTable.offsetWidth + 'px';
      titleTableClone.style.top = tools.getBoundingClientRect().bottom + window.pageYOffset + 'px';
      titleTableClone.left = tools.getBoundingClientRect().left + window.pageXOffset + 'px';
      let originalTH = titleTable.querySelectorAll('th'); 
      let cloneTH = titleTableClone.querySelectorAll('th');

      for(let i = 0; i < cloneTH.length; i++) {
        cloneTH[i].style.width = parseInt(getComputedStyle(originalTH[i]).width)  + 'px';
      }
    } else if (main.scrollTop <= titleTableBottom && tbody.contains(tbody.querySelector('.fixed'))) {
      tbody.removeChild(tbody.querySelector('.fixed'));
    }
  };
  
  tools.onclick = (event) => {
    let target = event.target;
  
    if (target.classList.contains('lnr-file-add')) {
      document.documentElement.style.overflow = 'hidden';
      let modalWindowCreate = document.querySelector('.modal_window_create');
      modalWindowCreate.style.display = 'block';
      modalWindowCreate.style.position = 'fixed';
      modalWindowCreate.style.top = (document.documentElement.clientHeight / 2 - modalWindowCreate.offsetHeight / 2) + 'px';
      modalWindowCreate.style.left = (document.documentElement.clientWidth / 2 - modalWindowCreate.offsetWidth / 2) + 'px';

      let form = document.forms.create_new_client;
      let inputs = form.querySelectorAll('input');
      
      for(let i = 0; i < inputs.length; i++) {

        if (i === 0) {
          inputs[i].value = new DateFormat().getDateAndTimeFormat();
          continue;
        }

        if (i === 19 || i === 20 || i === 21 || i === 22) {
          inputs[i].value = 0;
          continue;
        }

        inputs[i].value = '';
        inputs[i].disabled = false;
        inputs[i].style.backgroundColor = '#ffff';
        inputs[i].style.borderColor = '#42ab9e';
        inputs[i].placeholder = '';
      }

      let close = document.querySelector('.modal_window_create .close_icon');
      close.onclick = () => {
        let closeModalWindowCreate = document.querySelector('.close_modal_window_create');
        let exitModalWindowCreateIcon = document.querySelector('.exit_modal_window_create_icon');
        let closeCloseModalWindowIcon = document.querySelector('.close_close_modal_window_icon');
        closeModalWindowCreate.style.display = 'block';
        closeModalWindowCreate.style.position = 'fixed';
        closeModalWindowCreate.style.top = (document.documentElement.clientHeight / 2 - closeModalWindowCreate.offsetHeight / 2) + 'px';
        closeModalWindowCreate.style.left = (document.documentElement.clientWidth / 2 - closeModalWindowCreate.offsetWidth / 2) + 'px';
        let cover = document.createElement('div');
        cover.classList.add('cover');
        let changeSize = document.querySelector('.change_size');
        modalWindowCreate.appendChild(cover);

        if (changeSize.getAttribute('disabled') === 'false') {
          cover.style.width = '1024px';
          cover.style.left = (document.documentElement.clientWidth / 2 - cover.offsetWidth / 2) + 'px';

        } else if (changeSize.getAttribute('disabled') === 'true') {
          cover.style.width = '100%';
          cover.style.left = 0;
        }
        
        cover.style.height = '100%';
        cover.style.position = 'fixed';
        cover.style.top = 0;
        cover.style.backgroundColor = 'black';
        cover.style.opacity ='0.5';

        closeCloseModalWindowIcon.onclick = () => {
          closeModalWindowCreate.style.display = 'none';
          modalWindowCreate.removeChild(cover);
        };

        exitModalWindowCreateIcon.onclick = () => {
          modalWindowCreate.style.display = 'none';
          closeModalWindowCreate.style.display = 'none';
          modalWindowCreate.removeChild(cover);
          document.documentElement.style.overflow = 'hidden';
        };
      };
      
      let save = document.querySelector('.modal_window_create .save_icon');
      save.onclick = () => {

        if (!inputs[1].value && !inputs[2].value) {
          inputs[1].placeholder = 'поле обязательно для заполнения!';
          inputs[2].placeholder = 'поле обязательно для заполнения!';
          inputs[1].style.borderColor = '#fb6e40';
          inputs[2].style.borderColor = '#fb6e40';
          return false;
        }

        if (inputs[1].value && !inputs[2].value) {
          inputs[2].placeholder = 'поле обязательно для заполнения!';
          inputs[2].style.borderColor = '#fb6e40';
          return false;
        }

        if (!inputs[1].value && inputs[2].value) {
          inputs[1].placeholder = 'поле обязательно для заполнения!';
          inputs[1].style.borderColor = '#fb6e40';
          return false;

        } else {
          inputs[1].placeholder = '';
          inputs[2].placeholder = '';
        }

        new Client({
          date: inputs[0].value,
          form: inputs[1].value,
          name: inputs[2].value,
          juristicAddress: inputs[3].value,
          actualAddress: inputs[4].value,
          ogrn: inputs[5].value,
          inn: inputs[6].value,
          kpp: inputs[7].value,
          okpo: inputs[8].value,
          okvd: inputs[9].value,
          bank: inputs[10].value,
          rs: inputs[11].value,
          ks: inputs[12].value,
          bic: inputs[13].value,
          contact: inputs[14].value, 
          tel: inputs[15].value,
          mail: inputs[16].value,
          contractNumber: inputs[17].value,
          contractDate: inputs[18].value,
          trade: 0,
          sum:  0,
          payment: 0,
          indebtedness: 0,
          manager: inputs[23].value,
          comment: inputs[24].value
        }).createTableRow();
        modalWindowCreate.style.display = 'none';
        document.documentElement.style.overflow = 'hidden';
        Client.showFooterInformation();
        Client.search();
        Client.showFooterInformation();
        Client.showCreateInformation(document.querySelector('.main tr:last-child'), (elem) => {
          setTimeout(() => {
            elem.hidden = true;
          }, 3000);
        });
      };  
    }

    if (target.classList.contains('lnr-laptop')) {
      target.classList.remove('lnr-laptop');
      target.classList.add('lnr-screen');
      target.setAttribute('disabled', 'false');
      let container = document.querySelector('.container');
      let modalWindow = document.querySelector('.modal_window');
      let modalWindowCreate = document.querySelector('.modal_window_create');
      let titleTable = document.querySelectorAll('tr')[0];

      container.style.width = '1024px';
      modalWindow.style.width = '1024px';
      modalWindowCreate.style.width = '1024px';
      main.style.height = (document.documentElement.clientHeight - tools.offsetHeight - header.offsetHeight - footer.offsetHeight) + 'px';

      if (tbody.contains(tbody.querySelector('.fixed'))) {
        let titleTable = document.querySelectorAll('tr')[0];
        let originalTH = titleTable.querySelectorAll('th');
        let cloneTR = tbody.querySelector('.fixed');
        let cloneTH = cloneTR.querySelectorAll('th');
        cloneTR.style.width =  parseInt(getComputedStyle(titleTable).width)  + 'px';
        cloneTR.style.top = tools.getBoundingClientRect().bottom + window.pageYOffset + 'px';

        for(let i = 0; i < cloneTH.length; i++) {
          cloneTH[i].style.width =  parseInt(getComputedStyle(originalTH[i]).width)  + 'px';
        }
      }

      if (document.body.contains(document.querySelector('.calendar'))) {
        document.body.removeChild(document.querySelector('.calendar'));
      }

      if (document.querySelector('.search .left_arrow').getAttribute('checked') === 'true') {
        let selectOption = document.querySelector('.search .select_option');
        let searchOption = document.querySelector('.search .search_option');
        let coordsSearchOption = {
          top: searchOption.getBoundingClientRect().top + window.pageYOffset,
          left: searchOption.getBoundingClientRect().left + window.pageXOffset
        };
        selectOption.style.top = coordsSearchOption.top + searchOption.offsetHeight + 6 + 'px';
        selectOption.style.left = coordsSearchOption.left + 'px';
      }
      
    } else if (target.classList.contains('lnr-screen')) {
      target.classList.remove('lnr-screen');
      target.classList.add('lnr-laptop');
      target.setAttribute('disabled', 'true');
      let container = document.querySelector('.container');
      let modalWindow = document.querySelector('.modal_window');
      let modalWindowCreate = document.querySelector('.modal_window_create');
  
      container.style.width = '100%';
      modalWindow.style.width = '100%';
      modalWindowCreate.style.width = '100%';
      main.style.height = (document.documentElement.clientHeight - tools.offsetHeight - header.offsetHeight - footer.offsetHeight) + 'px';

      if (tbody.contains(tbody.querySelector('.fixed'))) {
        let titleTable = document.querySelectorAll('tr')[0];
        let originalTH = titleTable.querySelectorAll('th');
        let cloneTR = tbody.querySelector('.fixed');
        let cloneTH = cloneTR.querySelectorAll('th');
        cloneTR.style.width =  parseInt(getComputedStyle(titleTable).width)  + 'px';
        cloneTR.style.top = tools.getBoundingClientRect().bottom + window.pageYOffset + 'px';
      
        for(let i = 0; i < cloneTH.length; i++) {
          cloneTH[i].style.width = parseInt(getComputedStyle(originalTH[i]).width)  + 'px';
        }
      }
    }

    if (target.classList.contains('left_arrow')) {
      Client.showSelectOption();
    }

    if (target.classList.contains('default_date')) {
      Client.getDateStartAndEnd();
      Client.search();
      Client.showFooterInformation();
    }

    if (target.classList.contains('funnel')) {
      Client.search();
      Client.showFooterInformation();
    }

    if (target.classList.contains('clear_search_field')) {
      Client.clearSearch();
      Client.showFooterInformation();
      document.querySelector('.funnel').removeAttribute('search');
    }

    if (target.classList.contains('create_calendar_1') && !document.body.contains(document.querySelector('.calendar_1'))) {
      let calendar_1 = new Calendar(document.querySelector('.date_field_from'), 'calendar_1').createCalendar();
      let td = document.querySelectorAll('.calendar_1 td');
      let dateFieldFrom = document.querySelector('.date_field_from');


      document.onclick = (event) => {

        if (!event.target.classList.contains('create_calendar_1') && document.body.contains(document.querySelector('.calendar_1')) && !event.target.classList.contains('next_month_btn') && !event.target.classList.contains('previous_month_btn') && !event.target.classList.contains('next_year_btn') && !event.target.classList.contains('previous_year_btn')) {
          document.body.removeChild(document.querySelector('.calendar_1'));
        }

        if (event.target.classList.contains('next_month_btn') || event.target.classList.contains('previous_month_btn') || event.target.classList.contains('next_year_btn') || event.target.classList.contains('previous_year_btn')) {
          let td = document.querySelectorAll('.calendar_1 td');

          for(let i = 0; i < td.length; i++) {
            td[i].onclick = () => {
             
              if (td[i].innerHTML === '') {
                return false;
              }
    
              dateFieldFrom.value = new DateFormat().getDateFormat(td[i].innerHTML, Calendar.getYearAndMonth('calendar_1').month + 1, Calendar.getYearAndMonth('calendar_1').year);
            };
          }
        }
      };

      for(let i = 0; i < td.length; i++) {
        td[i].onclick = () => {

          if (td[i].innerHTML === '') {
            return false;
          }

          dateFieldFrom.value = new DateFormat().getDateFormat(td[i].innerHTML, Calendar.getYearAndMonth('calendar_1').month + 1, Calendar.getYearAndMonth('calendar_1').year);
        };
      }

    } else if (target.classList.contains('create_calendar_1') && document.body.contains(document.querySelector('.calendar_1'))) {
      document.body.removeChild(document.querySelector('.calendar_1'));
    }

    if (target.classList.contains('create_calendar_2') && !document.body.contains(document.querySelector('.calendar_2'))) {
      let calendar_2 = new Calendar(document.querySelector('.date_field_to'), 'calendar_2').createCalendar();
      let td = document.querySelectorAll('.calendar_2 td');
      let dateFieldTo = document.querySelector('.date_field_to');

      document.onclick = (event) => {

        if (!event.target.classList.contains('create_calendar_2') && document.body.contains(document.querySelector('.calendar_2')) && !event.target.classList.contains('next_month_btn') && !event.target.classList.contains('previous_month_btn') && !event.target.classList.contains('next_year_btn') && !event.target.classList.contains('previous_year_btn')) {
          document.body.removeChild(document.querySelector('.calendar_2'));
        }

        if (event.target.classList.contains('next_month_btn') || event.target.classList.contains('previous_month_btn') || event.target.classList.contains('next_year_btn') || event.target.classList.contains('previous_year_btn')) {
          let td = document.querySelectorAll('.calendar_2 td');

          for(let i = 0; i < td.length; i++) {
            td[i].onclick = () => {
             
              if (td[i].innerHTML === '') {
                return false;
              }
    
              dateFieldTo.value = new DateFormat().getDateFormat(td[i].innerHTML, Calendar.getYearAndMonth('calendar_2').month + 1, Calendar.getYearAndMonth('calendar_2').year);
            };
          }
        }
      };

      for(let i = 0; i < td.length; i++) {
        td[i].onclick = () => {

          if (td[i].innerHTML === '') {
            return false;
          }

          dateFieldTo.value = new DateFormat().getDateFormat(td[i].innerHTML, Calendar.getYearAndMonth('calendar_2').month + 1, Calendar.getYearAndMonth('calendar_2').year);
        };
      }

    } else if (target.classList.contains('create_calendar_2') && document.body.contains(document.querySelector('.calendar_2'))) {
      document.body.removeChild(document.querySelector('.calendar_2'));
    }

    if (document.body.contains(document.querySelector('.calendar_1')) && target.classList.contains('create_calendar_2')) {
      document.body.removeChild(document.querySelector('.calendar_1'));
    }

    if (document.body.contains(document.querySelector('.calendar_2')) && target.classList.contains('create_calendar_1')) {
      document.body.removeChild(document.querySelector('.calendar_2'));
    }
  };
};

window.addEventListener('load', init);

