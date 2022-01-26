

// Здесь у нас ничего неиспользуется - только создаем и отдаем



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
	// теперь будем заполнять наш див btn-wrapper кнопками
	// от куда мы узнаем сколько кнопок??? -  params  это будет массив - переберем  и с помощью map вернем кнопки так же в массиве
	// мы получаем данные (мы их распарсим в map) на основе которых мы можем формирова кнопки
	// ок массив сделалил и теперь перебираем его и деструктурируем (это должно быть в скобках)

	const btns = params.map(({ className, type, text }) => {
		// и далее формируем кнопки - создаем их
		const button = document.createElement('button');
		button.type = type;
		button.textContent = text;
		button.className = className;
		return button;
	});
	// кнопки естевственно нужно вставить в обертку btnWrapper - но вставить массив напрямую мы не можем поэтому 
	// с помощью спред оператора разлолжим
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
	// в thead будут заголовки в tbody будем заполнять нашими данными
	// thed это полная статика без изменений
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
	// а в сам тайбел добавлю свойство tbody и это будет tbody
	// так удобнее будет пользовать как с контейнером
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
	// console.log('delb', delb);

	// нужно еще добавить две кнопки которые есть в форме Добавить и Отмена
	// их мы можем создать тоже с помощью buttonGroup
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
	// console.log(buttonGroup);
	// мы уже верстку туда вставили и после вертски нужно добавить кнопки - которые находятся в buttonGroup - но мы от туда вытащим прямо кнопочки
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
};

const createRow = ({ name: firstName, surname, phone }) => {
	// console.log('dataObj', { name: firstName, surname, phone });

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
};



export default {
	createContainer,
	createHeader,
	createLogo,
	createMain,
	createButtonsGroup,
	createTable,
	createForm,
	createFooter,
	createRow,
};
