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

    renderEditElement(oneItemOptions)

    const oneItemCheckbox = document.createElement('input')
    oneItemCheckbox.type = 'checkbox'
    oneItemCheckbox.classList.add('one-item-options__checkbox')

    oneItemDiv.innerHTML = newItem.item

    itemsContainer.appendChild(oneItemContainer)
    oneItemContainer.appendChild(oneItemDiv)
    oneItemContainer.appendChild(oneItemOptions)

    oneItemOptions.appendChild(oneItemCheckbox)

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

function renderEditElement(parent) {
    const oneItemEdit = document.createElement('div')
    oneItemEdit.classList.add('one-item-options__edit')
    oneItemEdit.innerHTML = 'Edit'
    parent.appendChild(oneItemEdit)
    oneItemEdit.addEventListener('click', () => {
        console.log(parent.parentNode.children[0])
        const itemToEdit = parent.parentNode.children[0]
        const editInput = document.createElement('input')
        editInput.type = 'text'
        editInput.classList.add('all-items__text-input')
        editInput.value = itemToEdit.innerHTML
        parent.parentNode.removeChild(itemToEdit)
        parent.parentNode.insertBefore(editInput, parent)
            
        editInput.addEventListener('keydown', () => {
            if (event.key === 'Enter') {
                let newItemsArray = itemsArray.map(item => item.item)
                const indexToChange = newItemsArray.indexOf(itemToEdit.innerHTML)
                console.log(itemsArray)

                parent.parentNode.removeChild(editInput)
                parent.parentNode.insertBefore(itemToEdit, parent)
                itemToEdit.innerHTML = editInput.value
                itemsArray[indexToChange].item = itemToEdit.innerHTML
                console.log(itemsArray)

                localStorage.setItem('shoppingItems', JSON.stringify(itemsArray))
            }
        })
    })
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