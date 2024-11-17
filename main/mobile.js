document.addEventListener('DOMContentLoaded', function() {
    const filterPopup = document.querySelector('#filterButton');
    const sortPopup = document.querySelector('#sortButton');
    const filterPopupOverlay = document.querySelector('#popupOverlay');
    const popupOptions = document.querySelector('#popupOptions');
    
    const websiteIcon = document.querySelector('.websiteIcon');
    const websiteTitle = document.querySelector('#webTitle');

    // Show and hide the popup overlay for filter and sort options
    filterPopup.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the overlay
        filterPopupOverlay.classList.toggle('show'); // Toggle visibility of the popup overlay
        popupOptions.innerHTML = ''; // Clear previous options
        createPopupOptions('filter');
    });

    sortPopup.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the overlay
        filterPopupOverlay.classList.toggle('show'); // Toggle visibility of the popup overlay
        popupOptions.innerHTML = ''; // Clear previous options
        createPopupOptions('sort');
    });

    // Close the popup if user clicks anywhere outside of it
    filterPopupOverlay.addEventListener('click', function() {
        filterPopupOverlay.classList.remove('show'); // Hide the popup overlay
    });

    // Prevent clicks inside the popup from closing it
    popupOptions.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click events inside the popup from closing the overlay
    });

    // Function to generate options based on filter or sort
    function createPopupOptions(type) {
        const options = type === 'filter'
            ? {
                all: 'Alle',
                predators: 'Raubtiere',
                poisonous: 'Giftig und infektiös',
                reptiles: 'Reptilien',
                seaCreatures: 'Meeresbewohner',
                marineGiants: 'Meeresgiganten',
                largeMammals: 'Großsäuger',
                landMammals: 'Landsäugetiere',
                birds: 'Vögel'
            }
            : {
                category: 'Kategorie',
                name: 'Name',
                max_weight: 'Gewicht',
                lifespan: 'Lebensdauer',
                size: 'Größe',
                litter_size: 'Wurfgröße',
                top_speed: 'Schnelligkeit',
                deaths: 'Todesfälle'
            };

        // Dynamically create options and insert the German translations
        Object.entries(options).forEach(([key, value]) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('popupOption');
            optionDiv.textContent = value; // Use German translation
            optionDiv.setAttribute('data-' + type, key);
            optionDiv.addEventListener('click', function() {
                handlePopupOptionClick(type, key);
                filterPopupOverlay.classList.remove('show'); // Close the popup after selection
            });
            popupOptions.appendChild(optionDiv);
        });
    }

    // Handle the filter and sort options
    function handlePopupOptionClick(type, option) {
        if (type === 'filter') {
            filterCards(option);
        } else if (type === 'sort') {
            sortCards(option);
        }
    }

    // Filter functionality
    function filterCards(filter) {
        const cards = document.querySelectorAll('.animalCardWrapper');
        cards.forEach(function(card) {
            card.style.display = filter === 'all' || card.classList.contains(filter) ? 'flex' : 'none';
        });
    }

    // Sort functionality
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

    // Reload Page when clicking on website icon or title
    websiteIcon.addEventListener('click', function() {
        location.reload();
    });

    websiteTitle.addEventListener('click', function() {
        location.reload();
    });
});
// Handle the popup option click
function highlightSelectedOption(selectedOption) {
    const options = document.querySelectorAll('.popupOption');
    options.forEach(option => {
        option.classList.remove('selected'); // Remove bold from all options
    });
    selectedOption.classList.add('selected'); // Add bold to the clicked option
}
