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
                cardTemplate.addClass('animalCardLandMammals');
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
    $('.animalCardWrapper').on('click', function() {
        // Toggle the 'clicked' class to switch opacity between 100% and 30%
        $(this).toggleClass('clicked');
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterTitle').addEventListener('click', function() {
        const dropdownContent = document.querySelector('#filterDropdown .dropdown-content');
        dropdownContent.classList.toggle('show');
    });

    document.getElementById('sortTitle').addEventListener('click', function() {
        const dropdownContent = document.querySelector('#sortDropdown .dropdown-content');
        dropdownContent.classList.toggle('show');
    });

    document.querySelectorAll('.dropdown-content div').forEach(function(element) {
        element.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            if (filter) {
                filterCards(filter);
            }
            const sort = this.getAttribute('data-sort');
            if (sort) {
                sortCards(sort);
            }
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                content.classList.remove('show');
            });
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

    function sortCards(sort) {
        const wrapper = document.getElementById('wrapper');
        const cards = Array.from(wrapper.getElementsByClassName('animalCardWrapper'));
        
        if (sort === 'category') {
            const categoryOrder = ['predators', 'poisonous', 'reptiles', 'seaCreatures', 'marineGiants', 'largeMammals', 'landMammals', 'birds'];
            
            // First, sort by category
            cards.sort(function(a, b) {
                const aCategory = categoryOrder.indexOf(a.classList[1]);
                const bCategory = categoryOrder.indexOf(b.classList[1]);
    
                // Compare by category first
                if (aCategory !== bCategory) {
                    return aCategory - bCategory;
                }
    
                // If categories are the same, then sort by group_number (from lowest to highest)
                const aGroupNumber = parseInt(a.querySelector('.animalGroupNumber').textContent.replace(/\D/g, '')); // Extract number from group info
                const bGroupNumber = parseInt(b.querySelector('.animalGroupNumber').textContent.replace(/\D/g, '')); // Extract number from group info
                return aGroupNumber - bGroupNumber;
            });
        } else if (sort === 'name') {
            // Sorting by name (alphabetically)
            cards.sort(function(a, b) {
                const aName = a.querySelector('.animalName').textContent.toLowerCase();
                const bName = b.querySelector('.animalName').textContent.toLowerCase();
                return aName.localeCompare(bName); // Using localeCompare to compare strings
            });
        } else {
            // Sorting by numeric values like weight, lifespan, length, litter_size, top_speed, or deaths
            cards.sort(function(b, a) {
                let aValue, bValue;
    
                // Parse values, ensuring they're valid numbers
                if (sort === 'max_weight') {
                    aValue = parseFloat(a.querySelector('.attributeValueWeight').textContent);
                    bValue = parseFloat(b.querySelector('.attributeValueWeight').textContent);
                } else if (sort === 'lifespan') {
                    aValue = parseFloat(a.querySelector('.attributeValueYears').textContent);
                    bValue = parseFloat(b.querySelector('.attributeValueYears').textContent);
                } else if (sort === 'size') {
                    aValue = parseFloat(a.querySelector('.attributeValueLenght').textContent);
                    bValue = parseFloat(b.querySelector('.attributeValueLenght').textContent);
                } else if (sort === 'litter_size') {
                    aValue = parseInt(a.querySelector('.attributeValueBabies').textContent);
                    bValue = parseInt(b.querySelector('.attributeValueBabies').textContent);
                } else if (sort === 'top_speed') {
                    aValue = parseFloat(a.querySelector('.attributeValueSpeed').textContent);
                    bValue = parseFloat(b.querySelector('.attributeValueSpeed').textContent);
                } else if (sort === 'deaths') {
                    aValue = parseInt(a.querySelector('.attributeValueDeath').textContent);
                    bValue = parseInt(b.querySelector('.attributeValueDeath').textContent);
                }
    
                // If the values are not valid numbers, treat them as zero
                aValue = isNaN(aValue) ? 0 : aValue;
                bValue = isNaN(bValue) ? 0 : bValue;
    
                return aValue - bValue;  // Sort in ascending order (lowest to highest)
            });
        }
        
        cards.forEach(function(card) {
            wrapper.appendChild(card);
        });
    }
 

});
