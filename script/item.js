import {itemsContainer, itemsArray, updateLocalStorage} from "./main.js";

export function createItem(id, item, isBought = false) {
    return {
        id: id,
        item: item,
        isBought: isBought
    }
}

export function renderItem(item) {
    const oneItemContainer = document.createElement('div')
    oneItemContainer.classList.add('item-container') 

    const oneItemDiv = document.createElement('div')
    oneItemDiv.classList.add('item-container__item-name') 

    const oneItemOptions = document.createElement('div')
    oneItemOptions.classList.add('item-container__item-options') 
    renderDeleteElement(oneItemOptions)

    renderEditElement(item, oneItemOptions, oneItemDiv, oneItemContainer)

    renderCheckboxElement(oneItemOptions, item)

    oneItemDiv.innerHTML = item.item

    itemsContainer.appendChild(oneItemContainer)
    oneItemContainer.appendChild(oneItemDiv)
    oneItemContainer.appendChild(oneItemOptions)

    oneItemContainer.setAttribute('data-id', item.id)
}

function renderDeleteElement(parent) {
    const deleteDiv = document.createElement('div')
    deleteDiv.classList.add('item-container__delete')
    deleteDiv.innerHTML = 'X' //TODO add some image
    parent.appendChild(deleteDiv)
    deleteDiv.addEventListener('click', () => {
        const itemContainer = parent.closest('.one-item-container')
        const itemId = itemContainer.getAttribute('data-id')
        const itemIndex = itemsArray.findIndex(item => item.id == itemId)
        itemsArray.splice(itemIndex, 1)
        itemsContainer.removeChild(itemContainer)
        updateLocalStorage()
    })
}

function renderEditElement(item, parent, oneItemDiv, oneItemContainer) {
    const editDiv = document.createElement('div')
    editDiv.classList.add('item-container__edit')
    editDiv.innerHTML = 'Edit'
    parent.appendChild(editDiv)
    editDiv.addEventListener('click', () => {
        oneItemDiv.remove()
        const editInput = document.createElement('input')
        editInput.type = 'text'
        editInput.classList.add('all-items__text-input')
        editInput.value = item.item
        oneItemContainer.insertBefore(editInput, oneItemContainer.firstChild)
        editInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const itemName = editInput.value
                editInput.remove()
                oneItemContainer.insertBefore(oneItemDiv, oneItemContainer.firstChild)
                oneItemDiv.innerHTML = itemName
                const itemIndex = itemsArray.indexOf(item)
                itemsArray[itemIndex].item = itemName
                updateLocalStorage()
            }
        })
    })
}

function renderCheckboxElement(parent, item) {
    const checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkboxInput.classList.add('item-container__checkbox')
    checkboxInput.checked = item.isBought
    parent.appendChild(checkboxInput)
    checkboxInput.addEventListener('click', () => {
        const itemIndex = itemsArray.indexOf(item)
        itemsArray[itemIndex].isBought = checkboxInput.checked
        updateLocalStorage()
    })
}