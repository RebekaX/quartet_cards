$(document).ready(function() {
    // Assuming 'data' is an array of animal objects available globally
    $.each(data, function(index, animal) {
        // Clone the existing card structure
        let cardTemplate = $('.animalCardWrapper').first().clone();
        
        // Update the cloned card with the animal's data
        cardTemplate.find('.animalName').text(animal.name_german);
        cardTemplate.find('.animalDescription').text(animal.trivia_german);
        // Update other fields as needed
        
        // Append the cloned card to the wrapper
        $('#wrapper').append(cardTemplate);
    });

    // Remove the original template card
    $('.animalCardWrapper').first().remove();
});