document.getElementById('search-input').addEventListener('click', function () {
    document.querySelector('.search-history').style.display = 'flex';
    document.querySelector('.search-overlay').style.display = 'flex';
    document.getElementById('search-input').style.border = '2px solid var(--accent-green)'
});

document.body.addEventListener('click', function (event) {
    var searchInput = document.getElementById('search-input');
    var searchHistory = document.querySelector('.search-history');
    var searchOverlay = document.querySelector('.search-overlay')

    // Check if the clicked element is not the search input
    if (event.target !== searchInput && !searchHistory.contains(event.target)) {
        searchHistory.style.display = 'none'; // Hide search history
        searchOverlay.style.display = 'none';
        document.getElementById('search-input').style.border = '2px solid #272a34' // Hide search overlay
    }
});

window.addEventListener('scroll', function () {
    document.querySelector('.search-overlay').style.display = 'none';
    document.querySelector('.search-history').style.display = 'none';
    document.getElementById('search-input').style.border = '2px solid #272a34'
});

document.getElementById('categories-drop-control').addEventListener('click', function () {
    var dropCategories = document.querySelector('.drop-categories');
    if (dropCategories.style.display === 'flex') {
        dropCategories.style.display = 'none';
        document.getElementById('categories-drop-control').innerHTML = 'keyboard_arrow_down'
    } else {
        dropCategories.style.display = 'flex';
        document.getElementById('categories-drop-control').innerHTML = 'keyboard_arrow_up'
    }
});

document.getElementById('gender-drop-control').addEventListener('click', function () {
    var dropCategories = document.querySelector('.drop-gender');
    if (dropCategories.style.display === 'flex') {
        dropCategories.style.display = 'none';
        document.getElementById('gender-drop-control').innerHTML = 'keyboard_arrow_down'
    } else {
        dropCategories.style.display = 'flex';
        document.getElementById('gender-drop-control').innerHTML = 'keyboard_arrow_up'
    }
});

document.getElementById('search-input').addEventListener('click', function () {
    console.log("button clicked");
    document.getElementById('search-input').addEventListener('input', function () {
        let ifKey = document.getElementById('search-input').value;
        console.log(ifKey);

        if (ifKey != '') {
            document.addEventListener('keydown', function (event) {
                console.log("searched");
                if (event.key === 'Enter' || event.keyCode === 13) {
                    let keyValue = document.getElementById('search-input').value;

                    var form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/search-products';

                    var searchKey = document.createElement('input');
                    searchKey.type = 'hidden';
                    searchKey.name = 'searchKey';
                    searchKey.value = keyValue;
                    form.appendChild(searchKey);

                    // Append the form to the document body
                    document.body.appendChild(form);

                    // Submit the form
                    form.submit();
                }
            });

        }
    })
})