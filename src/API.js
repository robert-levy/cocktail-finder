const ENDPOINTS = {
    firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=`,
    random: `https://www.thecocktaildb.com/api/json/v1/1/random.php`
}

export async function fetchDrinksByLetter(letter) {
    try {
        const response = await fetch(`${ENDPOINTS.firstLetter + letter}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const payload = await response.json()
        return payload

    } catch (error) {
        console.log(error.message)
    }
}

export async function fetchRandomDrink() {
    try {
        const response = await fetch(`${ENDPOINTS.random}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const payload = await response.json()
        return payload

    } catch (error) {
        console.log(error.message)
    }
}