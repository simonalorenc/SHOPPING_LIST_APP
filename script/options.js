import { renderItem, createItem } from "./item.js";
import { updateLocalStorage, addBtn, itemsArray, textInput, clearLocalStorage, deleteBoughtItemsBtn, deleteBtn, itemsContainer } from "./main.js";

export function setupAddBtnClickListener() {
    addBtn.addEventListener('click', () => {
        let itemId = 0
        if (itemsArray.length > 0) {
            itemId = itemsArray[itemsArray.length - 1].id + 1
        }
        const item = createItem(itemId, textInput.value)
        renderItem(item)
        itemsArray.push(item)
        updateLocalStorage()
        textInput.value = ''
    })
}

export function setupDeleteAllItemsListener() {
    deleteBtn.addEventListener('click', () => {
        itemsContainer.innerHTML = ''
        clearLocalStorage()
    })
}

export function setupDeleteBoughtItemsListener() {
    deleteBoughtItemsBtn.addEventListener('click', () => {
        for (let i = itemsArray.length - 1; i >= 0; i--) {
            if (itemsArray[i].isBought == true) {
                itemsContainer.removeChild(itemsContainer.children[i])
                itemsArray.splice(i, 1)
            }
        }
        updateLocalStorage()
    })
}