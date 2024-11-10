$(document).ready(function() {
    $.each(data, function(index, animal) {
        let cardTemplate = $('.animalCardWrapper').first().clone();
        
        cardTemplate.find('.animalName').text(animal.name_german);
        
        cardTemplate.find('.animalDescription').text(animal.trivia_german);
        cardTemplate.find('.animalAttributes').text(animal.name_german);

        
        cardTemplate.find('.animalGroupNumber').text(animal.group + animal.group_number);
        
        cardTemplate.find('.animalImage').css('background-image', 'url("' + animal.image_url + '")');
        cardTemplate.find('.attributeValueWeight').text(animal.max_weight);
        cardTemplate.find('.attributeValueYears').text(animal.max_age);
        cardTemplate.find('.attributeValueBabies').text(animal.litter_size);
        cardTemplate.find('.attributeValueLenght').text(animal.max_length);
        cardTemplate.find('.attributeValueSpeed').text(animal.top_speed);
        cardTemplate.find('.attributeValueDeath').text(animal.deaths);
        switch(animal.groupname) {
            case "Predators":
                cardTemplate.addClass('predators');
                cardTemplate.addClass('animalCardPredators');
                break;
            case "Poisonous and Infectious":
                cardTemplate.addClass('poisonous');
                cardTemplate.addClass('animalCardPoisonous');
                break;
            case "Reptiles":
                cardTemplate.addClass('reptiles');
                cardTemplate.addClass('animalCardReptiles');
                break;
            case "Sea Creatures":
                cardTemplate.addClass('seaCreatures');
                cardTemplate.addClass('animalCardSeaCreatures');
                break;
            case "Large Mammals":
                cardTemplate.addClass('largeMammals');
                cardTemplate.addClass('animalCardLargeMammals');
                break;
            case "Land Mammals":
                cardTemplate.addClass('landMammals');
                cardTemplate.addClass('animalCardLargeMammals');
                break;
            case "Birds":
                cardTemplate.addClass('birds');
                cardTemplate.addClass('animalCardBirds');
                break;
            default:
                // Optional: You can add a default category in case of an unrecognized group
                cardTemplate.addClass('default');
                cardTemplate.addClass('animalCardDefault');
                break;
        }

        // Append the card template to the wrapper
        $('#wrapper').append(cardTemplate);
    });
  

    // Remove the original card template after cloning
    $('.animalCardWrapper').first().remove();
});
