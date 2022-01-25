'use strict';


{
	const clearStorage = () => {
		localStorage.clear();
	};

	// clearStorage();

	const getContactData = () => (localStorage.getItem('phonebook') ? JSON.parse(localStorage.getItem('phonebook')) : []);

	const setContactData = (data) => localStorage.setItem('phonebook', JSON.stringify(data));

	const addContactData = contact => {
		const data = getContactData('phonebook');
		data.push(contact);
		setContactData(data);
	};


	const removeContactData = phone => {
		const data = getContactData('phonebook');
		const newData = data.filter(item => item.phone !== phone);
		setContactData(newData);
	};


	const createContainer = () => {
		const container = document.createElement('div');
		container.classList.add('container');
		return container;
	};

	const createHeader = () => {

		const header = document.createElement('header');
		header.classList.add('header');

		const headerContainer = createContainer();
		// и теперь в хедер вставляем наш контейнер
		header.append(headerContainer);
		// и нашему хедеру привяжем хедер-контайнер
		header.headerContainer = headerContainer;
		return header;
		//  и дальше мы сможем воспользоваться свойством headerContainer у объекта header чтобы например добавить элементы
	};

	const createLogo = title => {
		// ф-я будет принимать наш title   когда создаем элемент будем туда вставлять текст-контент: это будет заголовок 
		const h1 = document.createElement('h1');
		// и добавим туда класс и текст-контент
		h1.classList.add('logo');
		h1.textContent = `Телефонный справочник. ${title}`;
		return h1;

	};
	// Ок хедер создали теперь нужно создать элемент main -создадим функцию после лого
	const createMain = () => {
		const main = document.createElement('main');
		// создадим контейнер для него и дальше вставим его
		const mainContainer = createContainer();
		main.append(mainContainer);
		// так же у хедера headerContainer у майн есть свойство main.mainContainer
		// и теперь в это свойство(main.mainContainer) мы добавляем наш mainContainer чтобы мы могли в него вставлять элементы
		main.mainContainer = mainContainer;
		return main;
	};

	// КНОПКИ ДОБАВИТЬ УДАЛИТЬ реализуем с помощью пециальной функции createButtonsGroup
	// будет принимать параметры и может создавать одни или десять кнопок
	// потому что params это будет массив и взависимости от количества его элементов будет формироваться столько кнопок
	const createButtonsGroup = params => {
		// но сначала создадим обертку -обычный див элемент
		const btnWrapper = document.createElement('div');
		// добавляем заготовленный класс 
		btnWrapper.classList.add('btn-wrapper');

		const btns = params.map(({ className, type, text }) => {
			// и далее формируем кнопки - создаем их
			const button = document.createElement('button');
			button.type = type;
			button.textContent = text;
			button.className = className;
			return button;
		});
		// кнопки естевственно нужно вставить в обертку btnWrapper - но вставить массив напрямую мы не можем поэтому 

		btnWrapper.append(...btns);
		return {
			btnWrapper,
			btns,
		};

	};

	// таблицу сделаем чуть чуть по проще просто верстку туда вставим - там обязательно должны быть thead  tbody
	const createTable = () => {
		const table = document.createElement('table');
		// но сначала зададим классы - тоже классы бутстар
		table.classList.add('table', 'table-striped');
		// в thead будут заголовки в tbody будем заполнять нашими данными  thed это полная статика без изменений
		const thead = document.createElement('thead');
		thead.insertAdjacentHTML('beforeend', `
			<tr>
				<th class="delete">Удалить</th>
				<th>Имя</th>
				<th>Фамилия</th>
				<th>Телефон</th>
			</tr>
		`);
		// tbody у нас ничего не содержит поэтому просто берем и вставляем в таблицу
		const tbody = document.createElement('tbody');
		table.append(thead, tbody);
		// в сам элемент table вставлю наш tbody - что бы не возвращать его в виде свойства объекта как объект в return

		table.tbody = tbody;
		return table;
	}

	// Форма 
	const createForm = () => {
		// overlay чаще всего есть у модального окна - а форма у нас в модальном окне
		const overlay = document.createElement('div');
		// overlsy зададим класс он уже заготовлен
		overlay.classList.add('form-overlay');

		const form = document.createElement('form');

		// добавим класс
		form.classList.add('form');
		// возьмем форму и вставим туда верстку - так как она у нас статична - всталвяем в конец но перед закрывающимся тегом
		form.insertAdjacentHTML('beforeend', `
			<button class="close" type="button"></button>
			<h2 class="form-title">Добавить контакт</h2>
			<div class="form-group">
				<label class="form-label" for="name">Имя:</label>
				<input class="form-input" name="name" id="name" type="text" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="surname">Фамилия:</label>
				<input class="form-input" name="surname" id="surname" type="text" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="phone">Телефон:</label>
				<input class="form-input" name="phone" id="phone" type="number" required>
			</div>
		`);
		const delb = document.querySelector('.close');

		// нужно еще добавить две кнопки которые есть в форме Добавить и Отмена		
		const buttonGroup = createButtonsGroup([
			{
				className: 'btn btn-primary mr-3',
				type: 'submit',
				text: 'Добавить',
			},
			{
				className: 'btn btn-danger',
				type: 'reset',
				text: 'Отмена',
			},
		]);
		
		// мы здесь не будем использовать обертку (как там btnWrapper) а достанем от туда кнопочки
		form.append(...buttonGroup.btns);
		//  что бы форма была видна на странице
		overlay.append(form);
		return {
			overlay,
			form,
			delb,
		};

	};

	// FOOTER

	const createFooter = title => {
		const footer = document.createElement('footer');
		footer.classList.add('footer');		
		footer.textContent = `Все права защищены ©${title}`;
		return footer;
	}



	// на основе data будем брать данные и формировать табличку

	const renderPhoneBook = (app, title) => {
		// создаем хедер и выше напишем эту функцию
		const header = createHeader();
		const logo = createLogo(title);
		const main = createMain();
	
		const buttonGroup = createButtonsGroup([
			{
				className: 'btn btn-primary mr-3 js-add',
				type: 'button',
				text: 'Добавить',
			},
			{
				className: 'btn btn-danger',
				type: 'button',
				text: 'Удалить',
			},
		]);
		// после кнопок идет большая таблица которую нужно сформировать	
		const table = createTable(); // и передаем в main.mainContainer
		// вызываем форму и получае объект с двумя свойствами form и overlay		
		// const form = createForm();
		//мы его деструктурируем и таким образом мы можем сразу использовать данные идентификаторы
		const { form, overlay } = createForm();

		const footer = createFooter(title);

		// вставим в хедер h1 в котором заголовок logo
		header.headerContainer.append(logo);
		// main.container вставим эти кнопки и для этого нам нужно вызвать функцию buttonGroup // здесь все что выводим на страницу
		main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

		// добавим хедер на страницу в наш app
		app.append(header, main, footer);
		// хедер появился но он пустой - нужно добавить заголовок logo- поэтому создадим ф-ю которая создает заголовок createLogo
		return {
			list: table.tbody,
			logo,
			btnAdd: buttonGroup.btns[0],
			// вернем кнопку удалить
			btnDel: buttonGroup.btns[1],
			formOverlay: overlay,
			form,
		};
	};

	const createRow = ({ name: firstName, surname, phone }) => {
		const tr = document.createElement('tr');
		tr.classList.add('contact');


		const tdDel = document.createElement('td');
		tdDel.classList.add('delete');

		const buttonDel = document.createElement('button');
		buttonDel.classList.add('del-icon');
		tdDel.append(buttonDel);


		const tdName = document.createElement('td');
		tdName.classList.add('name');
		tdName.textContent = firstName;

		const tdSurname = document.createElement('td');
		tdSurname.classList.add('surname');
		tdSurname.textContent = surname;

		const tdPhone = document.createElement('td');
		tdPhone.classList.add('phone');
		// что бы кликая по телефону произошел звонок - нужна ссылка
		const phoneLink = document.createElement('a');
		phoneLink.href = `tel:${phone}`;
		phoneLink.textContent = phone;
		// добавим в tr номер телефона
		tr.phoneLink = phoneLink;

		tdPhone.append(phoneLink);

		// кнопка
		const trbut = document.createElement('button');

		trbut.style.padding = "0.75rem";
		trbut.textContent = 'редактировать';
		trbut.classList.add('btn-success');

		tr.append(tdDel, tdName, tdSurname, tdPhone, trbut);

		return tr;
	}


	const renderContacts = (elem, data) => {
		const allRow = data.map(createRow);		
		elem.append(...allRow);
		return allRow;
	};

	const hoverRow = (allRow, logo) => {
		const text = logo.textContent;

		allRow.forEach(contact => {
			contact.addEventListener('mouseenter', () => {			
				logo.textContent = contact.phoneLink.textContent;
			});
		});
		allRow.forEach(contact => {
			contact.addEventListener('mouseleave', () => {			
				logo.textContent = text;
			});
		});
	};

	const modalControl = (btnAdd, formOverlay) => {

		const openModal = () => {
			formOverlay.classList.add('is-visible');

		};

		const closeModal = () => {

			formOverlay.classList.remove('is-visible');
		};

		btnAdd.addEventListener('click', openModal);
		// точно также можно реализовть закрытие модального окна - у нас есть клик по formOverlay
		// и при клике на formOverlay внутри мы будем определять куда произошел клик
		formOverlay.addEventListener('click', e => {
			const target = e.target;
			if (target === formOverlay || target.classList.contains('close')) {
				closeModal();
			}
		});

		return {
			closeModal,
		};
	};

	const sortarrs = (data) => {		
		data.sort((prev, next) => {
			if (prev.name < next.name) return -1;
			if (prev.name < next.name) return 1;
		});

		return data;
	};

	const sortarrn = (data) => {		
		data.sort((prev, next) => {
			if (prev.surname < next.surname) return -1;
			if (prev.surname < next.surname) return 1;
		});

		return data;
	};

	const deleteControl = (btnDel, list) => {
		// теперь при клике на btnDel  мы можем показать кнопочки(крестики) для удаления
		btnDel.addEventListener('click', () => {
			// получим все кнопки с классом delete
			document.querySelectorAll('.delete').forEach(del => {
				del.classList.toggle('is-visible');
			})
		});
		// и теперь с помощью делеигирования будем кликать по листу list -это вся наша таблица (область  tbody)
		list.addEventListener('click', e => {
			const target = e.target;
			console.log(target);
			if (e.target.closest('.del-icon')) {
				// находим родителя тоже через closest - будем подниматься до элемента contact и его удалять
				e.target.closest('.contact').remove();		
				removeContactData(e.target.closest('.contact').children[3].innerText);

			};

			if (target.closest('.name')) {
				document.querySelectorAll('.name').forEach(del => {
					del.closest('.contact').remove();
					console.log('deleted from name');
				});

				// setContactData(sortarrs(getContactData('phonebook')));				
				renderContacts(list, sortarrs(getContactData('phonebook')));
				localStorage.setItem('phonebook', JSON.stringify(sortarrs(getContactData('phonebook'))));				
			};

			if (target.closest('.surname')) {
				document.querySelectorAll('.surname').forEach(del => {
					del.closest('.contact').remove();
					console.log('deleted from surname');
				});
				// setContactData(sortarrn(getContactData('phonebook')));
				renderContacts(list, sortarrn(getContactData('phonebook')));
				localStorage.setItem('phonebook', JSON.stringify(sortarrn(getContactData('phonebook'))));				
			};
			// location.reload();
		});

	};

	const addContactPage = (contact, list) => {
		// list.append(contact);   // добавили [object Object]
		list.append(createRow(contact));
		// allRow.append(contact); 
		console.log('addContactPage contact:', contact.surname);
		// localStorage.clear();
	};

	// ф-я обрабатывает форму - навешивает события
	const formControl = (form, list, closeModal) => {
		form.addEventListener('submit', e => {
			e.preventDefault();
			// отправка данных - по схему из предыдущего видео - создаем formDate И ПЕРЕДЕМ ТУДУ ФОРМУ ЧЕРЕЗ e.target
			const formData = new FormData(e.target);
			// создаем объект и передаем туда formData
			const newContact = Object.fromEntries(formData);
			// console.log('newContact', newContact);  // {"name": "Bob","surname": "freeman","phone": "0005"}

			addContactPage(newContact, list);
			addContactData(newContact);

			form.reset();

			closeModal();
		});
	};


	const init = (selectorApp, title) => {
		const app = document.querySelector(selectorApp);
		const data = getContactData();
		// и теперь вызовем ф-ю которую будем передать list и data
		const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(app, title);
		// функционал 
		renderContacts(list, data);
		const { closeModal } = modalControl(btnAdd, formOverlay);
		// hoverRow(allRow, logo);
		deleteControl(btnDel, list);
		//функционал который будет принимать нашу форму - которую мы деструртурируем в const{}=renderPhoneBook(app, titlle)
		// помимо newContact нам нужно саму таблицу куда мы будем вставлят данные и formContral будет принимать list
		formControl(form, list, closeModal);

	};


	window.phoneBookInit = init;

};
