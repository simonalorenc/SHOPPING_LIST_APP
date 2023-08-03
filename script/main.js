import {createItem, renderItem, addItem, deleteAllItems, deleteBoughtItems} from "./item.js";

export const allItems = document.querySelector('.all-items')
export const addBtn = document.querySelector('.all-items__add-item')
export const deleteBtn = document.querySelector('.all-items__delete')
export const deleteBoughtItemsBtn = document.querySelector('.all-items__bought-delete')
export const textInput = document.querySelector('.all-items__text-input')
export const itemsContainer = document.querySelector('.items-container')

export let itemsArray

async function main() {

    const currentItems = localStorage.getItem('shoppingItems')
    console.log(currentItems)
    if (currentItems == null) {
        itemsArray = []
    } else {
        itemsArray = JSON.parse(currentItems)
    }

    addItem(textInput)
    renderSavedItems()
    deleteBoughtItems()
    deleteBtn.addEventListener('click', deleteAllItems)
}

function renderSavedItems() {
    itemsArray.forEach(savedItem => {
        renderItem(savedItem)
    })
}

main()