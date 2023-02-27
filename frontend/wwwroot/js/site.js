let batimentos = 80;

window.addEventListener('load', () => {
    habiliteTooltips(document);
});

Date.prototype.convertaDateToStrDiaMesAno = function () {
    if (!this) return '';
    dia = this.getDate().toString().padStart(2, '0');
    mes = (this.getMonth() + 1).toString().padStart(2, '0');
    ano = this.getFullYear();
    return dia + '/' + mes + '/' + ano;
}

HTMLElement.prototype.obtenhaParentes = function (parentSelector) {
    const parents = [];
    let oldParent = this.parentNode;

    if (parentSelector === undefined) {
        while (oldParent !== document) {
            const newParent = oldParent;
            parents.push(newParent);
            oldParent = newParent.parentNode;
        }

        parents.push(document);
    } else {
        const possiveisPais = document.querySelectorAll(parentSelector).toArray();

        while (oldParent.parentElement) {
            const newParent = oldParent;
            if (possiveisPais.includes(newParent)) {
                parents.push(newParent);
            }
            oldParent = newParent.parentNode;
        }
    }

    return parents;
}

function gereBatimentosCardiacos() {
    const maximoBatimentos = 117;
    const minimoBatimentos = 85;
    const batimentosCardiacos = Math.random() * (maximoBatimentos - minimoBatimentos) + minimoBatimentos;
    return Math.floor(batimentosCardiacos);
}

async function postJSON(optionsFetch) {
    const { url, data, method } = optionsFetch

    const options = 
        {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data || {})
        }

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

function habiliteTooltips(container) {
    let habilite = (theme) => {
        let cssselector = theme ? `[data-bs-toggle="tooltip-${theme}"]` : '[data-bs-toggle="tooltip"]';
        let list = container.querySelectorAll(cssselector);
        tippy(list, {
            appendTo: () => document.body,
            content(reference) {
                const title = reference.getAttribute('title')
                reference.removeAttribute('title')
                return title
            },
            arrow: false,
            allowHTML: true,
            animation: 'fade',
            offset: [0, 0],
            theme: theme
        });
    };
    habilite();
}

class Modal {
	static render(titulo, descricao, ehSucesso) {
		const divModal = document.createElement('div');
		divModal.setAttribute('id', 'container_modal');
		divModal.classList.value = 'modal fade show animated fadeInDown';

		const divModalDialog = document.createElement('div');
		divModalDialog.classList.add('modal-dialog');

		const divModalContent = document.createElement('div');
		divModalContent.classList.add('modal-content');

		const divModalHeader = document.createElement('div');
		divModalHeader.classList.add('modal-header');

		const title = document.createElement('h5');
		title.classList.add('modal-title');
		title.innerText = titulo;

		const iconeSucesso = document.createElement('i');
		iconeSucesso.classList.value = ehSucesso ? 'fas fa-laugh-beam' : 'fas fa-dizzy';
		iconeSucesso.style.color = ehSucesso ? 'green' : 'red';
		iconeSucesso.style.fontSize = '22pt';

		const modalBody = document.createElement('h5');
		modalBody.classList.add('modal-body');

		const modalDescricao = document.createElement('p');
		modalDescricao.innerText = descricao;

		const modalFooter = document.createElement('div');
		modalFooter.classList.value = 'd-flex justify-content-center modal-footer';

		const buttonClose = document.createElement('button');
		buttonClose.setAttribute('type', 'button');
		buttonClose.setAttribute('data-bs-dismiss', 'modal');
		buttonClose.classList.value = 'btn btn-secondary mt-3';
		buttonClose.innerText = 'Fechar';
		buttonClose.addEventListener('click', (ev) => {
			const divAlvo = ev.target.obtenhaParentes().find(parent => parent.getAttribute('id') == 'container_modal');
			if (divAlvo) {
				divAlvo.classList.value = 'modal fade show animated bounceOutUp';
				setTimeout(() => { divAlvo.remove(); }, 1000);
			}
		});


		modalFooter.appendChild(buttonClose);
		modalBody.appendChild(modalDescricao);
		divModalHeader.appendChild(title);
		divModalHeader.appendChild(iconeSucesso);

		divModalContent.appendChild(divModalHeader);
		divModalContent.appendChild(modalBody);
		divModalContent.appendChild(modalFooter);

		divModalDialog.appendChild(divModalContent);

		divModal.appendChild(divModalDialog);

		const containerTarget = document.getElementById('container');
		if (containerTarget) {
			containerTarget.appendChild(divModal);
			return;
		}

		throw new DOMException("Não existe um container para a modal");
	}

	static renderSucesso(titulo, texto) {
		return this.render(titulo, texto, true);
	}

	static renderErro(titulo, texto) {
		return this.render(titulo, texto, false);
	}
}