$(document).ready(function() {
    $.each(data, function(index, animal) {
        let cardTemplate = $('.animalCardWrapper').first().clone();
        
        cardTemplate.find('.animalName').text(animal.name_german);
        cardTemplate.find('.animalDescription').text(animal.trivia_german);
        cardTemplate.find('.animalGroupNumber').text(animal.group + animal.group_number);

        $('#wrapper').append(cardTemplate);
    });

    $('.animalCardWrapper').first().remove();
});