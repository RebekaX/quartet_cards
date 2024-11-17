document.addEventListener('DOMContentLoaded', function() {
    const filterPopup = document.querySelector('#filterButton');
    const sortPopup = document.querySelector('#sortButton');
    const filterPopupOverlay = document.querySelector('#popupOverlay');
    const popupOptions = document.querySelector('#popupOptions');
    
    const websiteIcon = document.querySelector('.websiteIcon');
    const websiteTitle = document.querySelector('#webTitle');

    filterPopup.addEventListener('click', function(event) {
        event.stopPropagation(); 
        filterPopupOverlay.classList.toggle('show'); 
        popupOptions.innerHTML = ''; 
        createPopupOptions('filter');
    });

    sortPopup.addEventListener('click', function(event) {
        event.stopPropagation(); 
        filterPopupOverlay.classList.toggle('show'); 
        popupOptions.innerHTML = ''; 
        createPopupOptions('sort');
    });

    filterPopupOverlay.addEventListener('click', function() {
        filterPopupOverlay.classList.remove('show'); 
    });

    popupOptions.addEventListener('click', function(event) {
        event.stopPropagation(); 
    });

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

        Object.entries(options).forEach(([key, value]) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('popupOption');
            optionDiv.textContent = value; 
            optionDiv.setAttribute('data-' + type, key);
            optionDiv.addEventListener('click', function() {
                handlePopupOptionClick(type, key);
                filterPopupOverlay.classList.remove('show'); 
            });
            popupOptions.appendChild(optionDiv);
        });
    }

    function handlePopupOptionClick(type, option) {
        if (type === 'filter') {
            filterCards(option);
        } else if (type === 'sort') {
            sortCards(option);
        }
    }

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

    websiteIcon.addEventListener('click', function() {
        location.reload();
    });

    websiteTitle.addEventListener('click', function() {
        location.reload();
    });
});
