const imageContainer = document.querySelector('.imageContainer');

document.querySelector('.searchButton').addEventListener('click', getPhotosInfo);

function getPhotosInfo(event) {
    event.preventDefault();

    const textInput = document.querySelector('.nameInput').value;
    const numberInput = document.querySelector('.numberInput').value;

    // console.log(textInput);
    // console.log(numberInput);
    if (textInput != '' && numberInput != '' && numberInput > 0) {
        imageContainer.innerHTML = '';
        getPhotoImages(textInput, numberInput);
    } else {
        //imageContainer.innerHTML = '';
        alert('Name of Photos and Number cannot be Empty. Number should contain only above 0');
    }
}

function getPhotoImages(nameInput, numberInput) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ee80ef9e0c728929d3fd608f5f3cad1&tags=${nameInput}&per_page=${numberInput}&format=json&nojsoncallback=1`;

    //console.log(url);

    fetch(url)
        .then(response => {
            //console.log(url);
            if (response.status >= 200 && response.status < 300) {

                return response.json();
            } else {
                throw "error: not working";
            }
        })
        .then(displayPhotoImages)
        .catch(error => {
            //console.log(error);

            const errorMessage = document.createElement('h1');
            errorMessage.style.textAlign = 'center';
            imageContainer.append(errorMessage);
            errorMessage.innerText = 'Network Or Server Error !!!';
        });
}


function displayPhotoImages(photoInfo) {
    const sizeInput = document.querySelector('.dropDown').value;
    //console.log(sizeInput);
    //console.log(photoInfo);

    if (photoInfo && photoInfo.photos && photoInfo.photos.photo && photoInfo.photos.photo.length > 0)

        photoInfo.photos.photo.forEach(imgUrl => {

            const imgUrl2 = `https://live.staticflickr.com/${imgUrl.server}/${imgUrl.id}_${imgUrl.secret}_${sizeInput}.jpg;`;


            const img = document.createElement('img');
            imageContainer.append(img);

            img.src = imgUrl2;
        });

    else {
        imageContainer.innerHTML = '';
        const errorMessage = document.createElement('h1');
        errorMessage.style.textAlign = 'center';
        imageContainer.append(errorMessage);
        errorMessage.innerText = '!!! No search result Found';

    }
}