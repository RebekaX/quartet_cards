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
                cardTemplate.find('.animalIcon').addClass('iconPredators');
                
                break;
            case "Poisonous and Infectious":
                cardTemplate.addClass('poisonous');
                cardTemplate.addClass('animalCardPoisonous');
                cardTemplate.find('.animalIcon').addClass('iconPoisonous');

                break;
            case "Reptiles":
                cardTemplate.addClass('reptiles');
                cardTemplate.addClass('animalCardReptiles');
                cardTemplate.find('.animalIcon').addClass('iconReptiles');
                break;

            case "Sea Creatures":
                cardTemplate.addClass('seaCreatures');
                cardTemplate.addClass('animalCardSeaCreatures');
                cardTemplate.find('.animalIcon').addClass('iconSeaCreatures');
                break;

            case "Marine Giants":
                cardTemplate.addClass('marineGiants');
                cardTemplate.addClass('animalCardMarineGiants');
                cardTemplate.find('.animalIcon').addClass('iconMarineGiants');
                break;

            case "Large Mammals":
                cardTemplate.addClass('largeMammals');
                cardTemplate.addClass('animalCardLargeMammals');
                cardTemplate.find('.animalIcon').addClass('iconLargeMammals');
                break;

            case "Land Mammals":
                cardTemplate.addClass('landMammals');
                cardTemplate.addClass('animalCardLargeMammals');
                cardTemplate.find('.animalIcon').addClass('iconLandMammals');
                break;

            case "Birds":
                cardTemplate.addClass('birds');
                cardTemplate.addClass('animalCardBirds');
                cardTemplate.find('.animalIcon').addClass('iconBirds');
                break;

            default:
              
        }

        $('#wrapper').append(cardTemplate);
    });
  

    $('.animalCardWrapper').first().remove();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterTitle').addEventListener('click', function() {
        const dropdownContent = document.querySelector('#filterDropdown .dropdown-content');
        dropdownContent.classList.toggle('show');
    });

    document.querySelectorAll('.dropdown-content li span').forEach(function(element) {
        element.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterCards(filter);
            document.querySelector('#filterDropdown .dropdown-content').classList.remove('show');
        });
    });

    function filterCards(filter) {
        const cards = document.querySelectorAll('.animalCardWrapper');
        cards.forEach(function(card) {
            if (filter === 'all') {
                card.style.display = 'flex';
            } else {
                if (card.classList.contains(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
});
