import elements from './createElements.js';

const {
	createHeader,
	createLogo,
	createMain,
	createButtonsGroup,
	createTable,
	createForm,
	createFooter,
	createRow
} = elements;



// на основе data будем брать данные и формировать табличку

export const renderPhoneBook = (app, title) => {
	// console.log('app: ', app);
	// создаем хедер и выше напишем эту функцию
	const header = createHeader();
	const logo = createLogo(title);
	const main = createMain();
	// что у кнопки нам нужно - здесь будем передавть массив 
	// у кнопки обязательно должны быть классы и обязательно должны быть тип type и текст
	// мы формируем новые кнопки и будем сразу заполнять их с помощью className
	// у нас будет две кнопки - 1-ая буедт содержать текст Добавить и вторая кнопку Удалить
	// классы будем использовать bootstrap
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
	// main.container вставим эти кнопки и для этого нам нужно вызвать функцию buttonGroup
	// здесь все что выводим на страницу
	main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

	// добавим хедер на страницу в наш app
	app.append(header, main, footer);
	// хедер появился но он пустой - нужно добавить заголовок logo- поэтому создадим ф-ю которая создает заголовок createLogo
	// появился main и в нем div с классом container - будем вставлять все оставшиеся элементы (кроме формы в модальном окне)
	// вернем форму что бы посмотреть как мы можем заблокировать всплытие
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

export const renderContacts = (elem, data) => {
	const allRow = data.map(createRow);
	elem.append(...allRow);
	return allRow;
};



// export default { renderPhoneBook, renderContacts };
