$(document).ready(function() {
    $.each(data, function(index, animal) {
        let divBox = $('<div class="animalCardWrapper"></div>').text(animal.name);
        $('#wrapper').append(divBox);
    });
});     

let div = document.createElement('div');
div.className = 'animalCardWrapper';
div.textContent = animal.name;
document.querySelector('main').appendChild(div);