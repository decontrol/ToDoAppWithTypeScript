import FullList from '../model/FullList';

interface DOMList {
	ul: HTMLUListElement;
	clear(): void;
	render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
	ul: HTMLUListElement;
	// create singleton. Just one instanc
	static instance: ListTemplate = new ListTemplate();

	private constructor() {
		this.ul = document.getElementById('listItems') as HTMLUListElement;
	}

	clear(): void {
		this.ul.innerHTML = '';
	}

	render(fullList: FullList): void {
		this.clear();

		fullList.list.forEach((item, i) => {
			const li = document.createElement('li') as HTMLLIElement;
			li.className = 'item';

			const check = document.createElement('input') as HTMLInputElement;
			check.type = 'checkbox';
			check.id = item.id; // using getter 'id()'
			check.tabIndex = 0;
			check.checked = item.checked;
			li.append(check);

			check.addEventListener('change', (): void => {
				item.checked = !item.checked;
				fullList.save();
			});

			const label = document.createElement('label') as HTMLLabelElement;
			label.htmlFor = item.id;
			label.textContent = item.item;
			li.append(label);

			const deleteBtn = document.createElement('button') as HTMLButtonElement;
			deleteBtn.className = 'button';
			deleteBtn.textContent = 'x';
			li.append(deleteBtn);

			deleteBtn.addEventListener('click', (): void => {
				fullList.removeItem(item.id);
				this.render(fullList);
			});

			this.ul.append(li);
		});
	}
}
