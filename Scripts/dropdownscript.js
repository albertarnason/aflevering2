function Album(artist, album, totalTracks, productionYear, trackList) {
  this.artist = artist;
  this.album = album;
  this.totalTracks = totalTracks;
  this.productionYear = productionYear;
  this.trackList = trackList;
}


function addDivWithAlbum(album, parentid) {
  let parentElement = document.getElementById(parentid);

  let trackliststring = 'Tracklist'
  let elementToAdd =
    '<div>' +
    album.artist +
    ' | ' +
    album.album +
    ' | Album contains: ' +
    album.totalTracks +
    ' tracks | Produced: ' +
    album.productionYear + '</div>'  + 

    '<details class="custom-dropdown">' + '<summary>' + trackliststring + '</summary>' +
    album.trackList.join("<br>") +
    '</details>' + '</br>';
  parentElement.innerHTML = parentElement.innerHTML + elementToAdd;
}


fetchContent("Data/albums.json").then((albums) => {

  let albumObjects = [];

  for (let i = 0; i < albums.length; i++) {
    let atracks = [];
    for (let j = 0; j < albums[i].trackList.length; j++) {
      const a = albums[i].trackList[j]['trackTitle']
      atracks.push(a)
      console.log(a)

    }
    const album = new Album(
      albums[i].artistName,
      albums[i].albumName,
      albums[i].trackList.length,
      albums[i].productionYear,
      atracks

    );
    console.log(atracks);
    albumObjects.push(album);
    
  }

  albumObjects.forEach(function (a) {
    addDivWithAlbum(a, "content");
 
  });

});


async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
