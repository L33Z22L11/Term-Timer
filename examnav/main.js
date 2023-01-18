function visitSubdomain() {
    if (subdomain = searchbar.subdomain.value)
        open('http://' + subdomain + '.thisis.host');
}

searchbar.onkeydown = function (e) {
    if (e.key == 'Enter') {
        e.preventDefault();
        visitSubdomain();
    }
}

function addSchool() {
    alert("联系QQ 2399052066");
}