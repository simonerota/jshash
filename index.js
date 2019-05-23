load("lib/hashes.js");
load("lib/md4.js");



function hashNT(password) {
    if (password.length == 0)
        password = "";
        var utf16le = password.split('').join('\x00') + '\x00';
        var hash = hex_md4(utf16le).toUpperCase();
        return hash;
}

function SHA(password) {
    if (password.length == 0)
        password = "";
        var hash = new Hashes.SHA1().b64(password);
        return "{SHA}" + hash;
}


// Test
// var password = "ThePassword!";
// print("NTHASH: " + hashNT(password));
// print("SHA: " + SHA(password));