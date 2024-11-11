const apiBaseURL = 'https://no-waste-api.onrender.com'; // Replace with your Render.com API URL

// Search recipes by ingredient
async function searchByIngredient() {
    const ingredient = document.getElementById('ingredientInput').value;
    const resultsContainer = document.getElementById('ingredientResults');
    resultsContainer.innerHTML = '';

    if (!ingredient) {
        resultsContainer.innerHTML = '<div class="error">Please enter an ingredient.</div>';
        return;
    }

    try {
        const response = await fetch(`${apiBaseURL}/recipes?ingredient=${ingredient}`);
        const data = await response.json();
        
        if (response.ok) {
            if (data.length === 0) {
                resultsContainer.innerHTML = '<div>No recipes found.</div>';
            } else {
                data.forEach(recipe => {
                    const recipeItem = document.createElement('div');
                    recipeItem.className = 'result-item';
                    recipeItem.innerHTML = `<strong>${recipe.name}</strong>: ${recipe.ingredients.join(', ')}`;
                    resultsContainer.appendChild(recipeItem);
                });
            }
        } else {
            resultsContainer.innerHTML = `<div class="error">${data.error}</div>`;
        }
    } catch (error) {
        resultsContainer.innerHTML = '<div class="error">An error occurred while fetching data.</div>';
    }
}

// Search recipe by name
async function searchByName() {
    const name = document.getElementById('nameInput').value;
    const resultContainer = document.getElementById('nameResult');
    resultContainer.innerHTML = '';

    if (!name) {
        resultContainer.innerHTML = '<div class="error">Please enter a recipe name.</div>';
        return;
    }

    try {
        const response = await fetch(`${apiBaseURL}/recipe?name=${name}`);
        const data = await response.json();

        if (response.ok) {
            resultContainer.innerHTML = `
                <div class="result-item">
                    <strong>${data.name}</strong>: ${data.ingredients.join(', ')}
                </div>`;
        } else {
            resultContainer.innerHTML = `<div class="error">${data.error}</div>`;
        }
    } catch (error) {
        resultContainer.innerHTML = '<div class="error">An error occurred while fetching data.</div>';
    }
}
