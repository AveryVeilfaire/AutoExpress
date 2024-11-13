//AV
//#Will turn into generic file lister?
//needs to be triggered on button and load
//TODO: Generalize this to list files, and seperate styles only from it

function loadStyles() {
    const stylesDir = 'autoexpress/resources/styles/';
    const url = `/styles/${stylesDir}`;

    fetch(url)
        .then(response => response.json())
        .then(stylesList => {
            const styles = stylesList.filter(style => style.endsWith('.json'));
            const styleNames = stylesList.filter(style => style.endsWith('.json'))
                .map(style => style.replace(/\.json$/, ''));

            const selectElement = document.getElementById('prompt-style-input');

            while (selectElement.firstChild) {
                selectElement.removeChild(selectElement.firstChild);
            }

            if (styles.length === 0) {
                console.error('Error loading styles: no styles found');
                selectElement.appendChild(document.createElement('option')).textContent = 'No styles found';
            } else {
                styles.forEach(style => {
                    console.log(style);
                    const option = document.createElement('option');
                    option.value = style;
                    option.textContent = styleNames[styles.indexOf(style)];
                    selectElement.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error loading styles:', error);
            alert('Failed to load styles.');
        });
}


// Trigger the function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadStyles);
