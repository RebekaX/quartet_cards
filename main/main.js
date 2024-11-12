$(document).ready(function() {
    $.each(data, function(index, animal) {
        let cardTemplate = $('.animalCardWrapper').first().clone();
        
        // Populate card with animal data
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
        
        // Assign classes based on animal group
        switch(animal.groupname) {
            case "Predators":
                cardTemplate.addClass('predators animalCardPredators');
                cardTemplate.find('.animalIcon').addClass('iconPredators');
                break;
            case "Poisonous and Infectious":
                cardTemplate.addClass('poisonous animalCardPoisonous');
                cardTemplate.find('.animalIcon').addClass('iconPoisonous');
                break;
            case "Reptiles":
                cardTemplate.addClass('reptiles animalCardReptiles');
                cardTemplate.find('.animalIcon').addClass('iconReptiles');
                break;
            case "Sea Creatures":
                cardTemplate.addClass('seaCreatures animalCardSeaCreatures');
                cardTemplate.find('.animalIcon').addClass('iconSeaCreatures');
                break;
            case "Marine Giants":
                cardTemplate.addClass('marineGiants animalCardMarineGiants');
                cardTemplate.find('.animalIcon').addClass('iconMarineGiants');
                break;
            case "Large Mammals":
                cardTemplate.addClass('largeMammals animalCardLargeMammals');
                cardTemplate.find('.animalIcon').addClass('iconLargeMammals');
                break;
            case "Land Mammals":
                cardTemplate.addClass('landMammals animalCardLandMammals');
                cardTemplate.find('.animalIcon').addClass('iconLandMammals');
                break;
            case "Birds":
                cardTemplate.addClass('birds animalCardBirds');
                cardTemplate.find('.animalIcon').addClass('iconBirds');
                break;
            default:
        }

        $('#wrapper').append(cardTemplate);
    });

    // Remove the original template element
    $('.animalCardWrapper').first().remove();

let totalCards = 32;
let collectedCount = totalCards;

function updateCounter() {
    $('#counter').text(collectedCount + '/' + totalCards);
}

$(document).ready(function() {
    updateCounter();

    $('.animalCardWrapper').on('click', function() {
        var $this = $(this);
        
        $this.toggleClass('clicked');
        
        $this.css('transition', 'opacity 0.7s ease');
        $this.css('opacity', $this.hasClass('clicked') ? 0.3 : 1);

        if ($this.hasClass('clicked')) {
            collectedCount--;
        } else {
            collectedCount++;
        }

        updateCounter();
    });
});

});

document.addEventListener('DOMContentLoaded', function() {
    const filterDropdown = document.querySelector('#filterDropdown .dropdown-content');
    const sortDropdown = document.querySelector('#sortDropdown .dropdown-content');
    const filterButton = document.getElementById('filterTitle');
    const sortButton = document.getElementById('sortTitle');
    const websiteIcon = document.querySelector('.websiteIcon'); // Use querySelector to target the div
    const h1 = document.querySelector('h1');

    filterButton.addEventListener('click', function() {
        filterDropdown.classList.toggle('show');
    });

    // Toggle sort dropdown on click
    sortButton.addEventListener('click', function() {
        sortDropdown.classList.toggle('show');
    });

    // Close both dropdowns when an option is selected
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
            // Hide both dropdowns after an option is clicked
            filterDropdown.classList.remove('show');
            sortDropdown.classList.remove('show');
        });
    });

    // Filter function
    function filterCards(filter) {
        const cards = document.querySelectorAll('.animalCardWrapper');
        cards.forEach(function(card) {
            card.style.display = filter === 'all' || card.classList.contains(filter) ? 'flex' : 'none';
        });
    }

    // Sort function
    function sortCards(sort) {
        const wrapper = document.getElementById('wrapper');
        const cards = Array.from(wrapper.getElementsByClassName('animalCardWrapper'));

        if (sort === 'category') {
            const categoryOrder = ['predators', 'poisonous', 'reptiles', 'seaCreatures', 'marineGiants', 'largeMammals', 'landMammals', 'birds'];
            cards.sort((a, b) => {
                const aCategory = categoryOrder.indexOf(a.classList[1]);
                const bCategory = categoryOrder.indexOf(b.classList[1]);
                if (aCategory !== bCategory) return aCategory - bCategory;

                const aGroupNumber = parseInt(a.querySelector('.animalGroupNumber').textContent.replace(/\D/g, ''));
                const bGroupNumber = parseInt(b.querySelector('.animalGroupNumber').textContent.replace(/\D/g, ''));
                return aGroupNumber - bGroupNumber;
            });
        } else if (sort === 'name') {
            cards.sort((a, b) => {
                const aName = a.querySelector('.animalName').textContent.toLowerCase();
                const bName = b.querySelector('.animalName').textContent.toLowerCase();
                return aName.localeCompare(bName);
            });
        } else {
            // Sorting by other numeric attributes
            cards.sort((b, a) => {
                let aValue, bValue;
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
                aValue = isNaN(aValue) ? 0 : aValue;
                bValue = isNaN(bValue) ? 0 : bValue;
                return aValue - bValue;
            });
        }

        cards.forEach(function(card) {
            wrapper.appendChild(card);
        });
    }
});