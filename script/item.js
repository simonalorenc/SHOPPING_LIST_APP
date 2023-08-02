import {addBtn, allItems, deleteBtn, textInput, itemsContainer, itemsArray} from "./main.js";

let i = 0

export function addItem(textInput) {
    addBtn.addEventListener('click', () => {
        const newItem = createItem(textInput.value, false)
        renderItem(newItem)
        itemsArray.push(newItem)
        localStorage.setItem('shoppingItems', JSON.stringify(itemsArray))
    })
}

export function renderItem(newItem) {
    const oneItemContainer = document.createElement('div')
    oneItemContainer.classList.add('one-item-container')

    const oneItemDiv = document.createElement('div')
    oneItemDiv.classList.add('one-item')

    const oneItemOptions = document.createElement('div')
    oneItemOptions.classList.add('one-item-options')

    renderDeleteElement(oneItemOptions)

    const oneItemEdit = document.createElement('div')
    oneItemEdit.classList.add('one-item-options__edit')
    oneItemEdit.innerHTML = 'Edit'

    const oneItemCheckbox = document.createElement('input')
    oneItemCheckbox.type = 'checkbox'
    oneItemCheckbox.classList.add('one-item-options__checkbox')

    oneItemDiv.innerHTML = newItem.item

    itemsContainer.appendChild(oneItemContainer)
    oneItemContainer.appendChild(oneItemDiv)
    oneItemContainer.appendChild(oneItemOptions)

    oneItemOptions.appendChild(oneItemEdit)
    oneItemOptions.appendChild(oneItemCheckbox)

    oneItemEdit.addEventListener('click', editItemName)

    textInput.value = ''
    oneItemContainer.setAttribute('data-id', i)
    i++
}

export function createItem(item, Boolean) {
    return {
        item: item,
        isBought: Boolean
    }
}

export function deleteAllItems() {
    itemsContainer.innerHTML = ''
    localStorage.removeItem('shoppingItems')
}

export function editItemName() {
    console.log('edit')
}

function renderDeleteElement(parent) {
    const oneItemDelete = document.createElement('div')
    oneItemDelete.classList.add('one-item-options__delete')
    oneItemDelete.innerHTML = 'X'
    parent.appendChild(oneItemDelete)
    oneItemDelete.addEventListener('click', () => {
        const itemToDelete = parent.parentNode
        let newItemsArray = itemsArray.map(item => item.item)
        const indexToRemove = newItemsArray.indexOf(itemToDelete.children[0].innerHTML)
        itemsContainer.removeChild(parent.parentNode)
        itemsArray.splice(indexToRemove, 1)
        localStorage.setItem('shoppingItems', JSON.stringify(itemsArray))
    })
}