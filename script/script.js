'use strict';

const data = [
	{
		name: 'Иван',
		surname: 'Федоров',
		phone: '+79514545454',
	},
	{
		name: 'Костя',
		surname: 'Семёнов',
		phone: '+79999999999',
	},
	{
		name: 'Федор',
		surname: 'Иванов',
		phone: '+79800252525',
	},
	{
		name: 'Ария',
		surname: 'Попова',
		phone: '+79876543210',
	},
];



{

	const createContainer = () => {
		const container = document.createElement('div');
		container.classList.add('container');
		return container;
	};

	const createHeader = () => {
		const header = document.createElement('header');
		header.classList.add('header');

		const headerContainer = createContainer();
	
		header.append(headerContainer);
	
		header.headerContainer = headerContainer;
		return header;
		
	};

	const createLogo = title => {

		const h1 = document.createElement('h1');
		
		h1.classList.add('logo');
		h1.textContent = `Телефонный справочник. ${title}`;
		return h1;

	};

	const createMain = () => {
		const main = document.createElement('main');
	
		const mainContainer = createContainer();
		main.append(mainContainer);

		main.mainContainer = mainContainer;
		return main;
	};

	const createButtonsGroup = params => {
		
		const btnWrapper = document.createElement('div');

		btnWrapper.classList.add('btn-wrapper');

		const btns = params.map(({ className, type, text }) => {
		
			const button = document.createElement('button');
			button.type = type;
			button.textContent = text;
			button.className = className;
			return button;
		});

		btnWrapper.append(...btns);
		return {
			btnWrapper,
			btns,
		};

	};

	const createTable = () => {
		const table = document.createElement('table');
	
		table.classList.add('table', 'table-striped');
		const thead = document.createElement('thead');
		thead.insertAdjacentHTML('beforeend', `
			<tr>
				<th class="delete">Удалить</th>
				<th>Имя</th>
				<th>Фамилия</th>
				<th>Телефон</th>
			</tr>
		`);

		const tbody = document.createElement('tbody');
		table.append(thead, tbody);

		table.tbody = tbody;
		return table;
	};


	const createForm = () => {
	
		const overlay = document.createElement('div');

		overlay.classList.add('form-overlay');

		const form = document.createElement('form');

		form.classList.add('form');

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
	
		form.append(...buttonGroup.btns);

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
	};


	const renderPhoneBook = (app, title) => {

		// console.log('app: ', app);
	
		const header = createHeader();
		const logo = createLogo(title);
		const main = createMain();

		const buttonGroup = createButtonsGroup([
			{
				className: 'btn btn-primary mr-3',
				type: 'button',
				text: 'Добавить',
			},
			{
				className: 'btn btn-danger',
				type: 'button',
				text: 'Удалить',
			},
		]);

		const table = createTable(); // и передаем в main.mainContainer

		const form = createForm();

		const footer = createFooter(title);


		header.headerContainer.append(logo);

		main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);

		// добавим хедер на страницу в наш app
		app.append(header, main, footer);

		return {
			list: table.tbody,
			logo,
			btnAdd: buttonGroup.btns[0],
			btnDel: buttonGroup.btns[1],
			formOverlay: form.overlay,
			form: form.form,
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
	
		const phoneLink = document.createElement('a');
		phoneLink.href = `tel:${phone}`;
		phoneLink.textContent = phone;
		// добавим в tr номер телефона
		tr.phoneLink = phoneLink;

		tdPhone.append(phoneLink);

		// 1 вариант кнопка
		const trbut = document.createElement('button');
		trbut.style.padding = "0.75rem";
		trbut.textContent = 'редактировать';
		trbut.classList.add('btn-success');

		// 2 вариант ячейка
		// const trbut = document.createElement('td');
		// trbut.style.width = "10%";
		// trbut.textContent = 'редактировать';
		// trbut.classList.add('btn-success');	
		

		tr.append(tdDel, tdName, tdSurname, tdPhone, trbut);
		
		return tr;
	};


	const renderContacts = (elem, data) => {
		const allRow = data.map(createRow);
		elem.append(...allRow);
		return allRow;
	};

	const hoverRow = (allRow, logo) => {
		const text = logo.textContent;
		// console.log('allRow:', allRow);
		allRow.forEach(contact => {
			contact.addEventListener('mouseenter', () => {
				// console.log('mouseEnter', contact);
				logo.textContent = contact.phoneLink.textContent;
			});
		});
		allRow.forEach(contact => {
			contact.addEventListener('mouseleave', () => {
				// console.log('mouseEnter', contact);
				logo.textContent = text;
			});
		});
	};


	const init = (selectorApp, title) => {
		const app = document.querySelector(selectorApp);
		const phoneBook = renderPhoneBook(app, title);
	
	
		const { list, logo, btnAdd, formOverlay, form, btnDel} = phoneBook;

		// функционал 
		const allRow = renderContacts(list, data);
		hoverRow(allRow, logo);
		

		const objEvent = {
			handleEvent() {
				console.log('adding');
				formOverlay.classList.add('is-visible');
			},
		};

		btnAdd.addEventListener('click', objEvent);

		btnDel.addEventListener('click', () => {
			// получим все кнопки с классом delete
			document.querySelectorAll('.delete').forEach(del => {
				del.classList.toggle('is-visible');
			})
		});

		list.addEventListener('click', e => {
			if (e.target.closest('.del-icon')) {
				// находим родителя тоже через closest - будем подниматься до элемента contact и его удалять
				e.target.closest('.contact').remove();
			}

		});

		formOverlay.addEventListener('click', e => {
			const target = e.target;
			if (target === formOverlay || target.classList.contains('close')) {
				formOverlay.classList.remove('is-visible');
			}
		});

		// При клике на поле имя или фамилия производить сортировку по алфавиту в таблице
		const sortarrn = (data) => {
			data.sort((prev, next) => {
				if (prev.name < next.name) return -1;
				if (prev.name < next.name) return 1;
			});
			console.log(data);
			return data;
		}
		const sortarrs = (data) => {
			data.sort((prev, next) => {
				if (prev.surname < next.surname) return -1;
				if (prev.surname < next.surname) return 1;
			});
			console.log(data);
			return data;
		}

		list.addEventListener('click', e => {
			const target = e.target;
			if (target.closest('.name')) {
				// очистка листа
				document.querySelectorAll('.name').forEach(del => {
					del.closest('.contact').remove();
				})
				const allRow = renderContacts(list, sortarrn(data));
			}
		});


		list.addEventListener('click', e => {
			const target = e.target;
			if (target.closest('.surname')) {

				document.querySelectorAll('.surname').forEach(del => {
					del.closest('.contact').remove();
				})

				const allRow = renderContacts(list, sortarrs(data));

			}
		});

	};

	window.phoneBookInit = init;

}