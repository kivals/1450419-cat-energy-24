function initMap() {
  const coordinates = { lat: 59.93872991775969, lng: 30.323048740133434 };
  const map = new google.maps.Map(document.querySelector(".map__google"), {
    zoom: 14.5,
    center: coordinates,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    scrollWheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const image = {
    url: "img/map/map-pin.png",
    scaledSize: new google.maps.Size(100, 100), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      url: "img/map/map-pin.svg",
      scaledSize: screen.width < 768 ?
        new google.maps.Size(57, 53) :
        new google.maps.Size(113, 106),
    }
  });
}
