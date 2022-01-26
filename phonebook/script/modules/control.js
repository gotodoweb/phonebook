import create from './createElements.js';
const { createRow } = create;

import { renderPhoneBook, renderContacts } from './render.js';


import serv from './serviceStorage.js';
const { getContactData, addContactData, removeContactData } = serv;



const hoverRow = (allRow, logo) => {
	// console.log('allRow:', allRow);
	const text = logo.textContent;

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

const modalControl = (btnAdd, formOverlay) => {

	const openModal = () => {
		formOverlay.classList.add('is-visible');

	};

	const closeModal = () => {

		formOverlay.classList.remove('is-visible');
	};

	btnAdd.addEventListener('click', openModal);

	// точно также можно реализовть закрытие модального окна - у нас есть клик по formOverlay
	//теперь когда будем кликать МИМО то все будет закрываться отлично - но если кликать внутри то ничего закрываться небудет
	// и добавим в условие клик по крестику что бы тоже закрывался
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

		if (e.target.closest('.del-icon')) {
			// находим родителя тоже через closest - будем подниматься до элемента contact и его удалять
			e.target.closest('.contact').remove();
			removeContactData(e.target.closest('.contact').children[3].innerText);

		};

		if (target.closest('.name')) {
			// console.log(sortarr(data));
			// list.classList.toggle('delete');
			document.querySelectorAll('.name').forEach(del => {
				del.closest('.contact').remove();

			});

			// setContactData(sortarrs(getContactData('phonebook')));				
			renderContacts(list, sortarrs(getContactData('phonebook')));
			localStorage.setItem('phonebook', JSON.stringify(sortarrs(getContactData('phonebook'))));

		};

		if (target.closest('.surname')) {
			document.querySelectorAll('.surname').forEach(del => {
				del.closest('.contact').remove();

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
	// нам необходимо добавлять не объкт а строку - а для этого мы будем ф-ю createRow	
	// все строчки создаются на основе данной функции 	createRow
	list.append(createRow(contact));
	// allRow.append(contact); 

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



export default {
	hoverRow,
	modalControl,
	sortarrs,
	sortarrn,
	deleteControl,
	addContactPage,
	formControl,
};

