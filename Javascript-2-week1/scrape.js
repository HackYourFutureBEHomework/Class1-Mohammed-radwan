// Your custom scraping script.

console.log('hiii');


document.addEventListener  ("keypress",function() {

    let table = document.querySelector("table.cast_list") ;

    let rows = table.querySelectorAll("tr.even, tr.odd") ;

    for (let i = 0 ; i <rows.length ; i ++){

        const row = rows[i];

        let actor = row.querySelector("span[itemprop]").innerHTML;

        let characterTag = row.querySelector("td.character");
        let character;
        let pos;
        let a = characterTag.querySelector("a");
        if (a != null) {
            character = a.innerHTML;
        } else {
         
          character = characterTag.innerHTML;
          pos=character.search("\\(");
          character=character.slice(-character.length, pos);
        }
          console.log("Actor: " + actor.trim() + ", Character: " + character.trim());
        

    }

});

// Look at https://github.com/HackYourFutureBelgium/JavaScript2/tree/master/Projects/web-scraper
// for the version we showed in class.

