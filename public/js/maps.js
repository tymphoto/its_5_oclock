const mapDiv = document.querySelector('#YMapsID');

async function mapAdd() {
  async function getLocations() {
    const response = await fetch('/map');
    if (response.ok) {
      const result = await response.json();
      const location = result.map((el) => el.location);
      return location;
    }
  }

  async function getNames() {
    const response = await fetch('/map');
    if (response.ok) {
      const result = await response.json();
      const names = result.map((el) => el.name);
      return names;
    }
  }

  async function getId() {
    const response = await fetch('/map');
    if (response.ok) {
      const result = await response.json();
      const ids = result.map((el) => el.id);
      return ids;
    }
  }

  const locations = await getLocations();
  const names = await getNames();
  const ids = await getId();

  setTimeout(() => {
    YMaps.jQuery(() => {
      const map = new YMaps.Map(YMaps.jQuery(mapDiv)[0]);
      map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 2);

      function makeSpots() {
        for (let i = 0; i < names.length; i += 1) {
          const placemark = new YMaps.Placemark(new YMaps.GeoPoint(locations[i].split(',')[1], locations[i].split(',')[0],), {style: "default#cafeIcon"});
          placemark.name = names[i];
          placemark.description = `<a href="/card/${ids[i]}">Подробнее</a>`;
          map.addOverlay(placemark);
        }
      }
      makeSpots();
    });
  }, 100);
}
mapAdd();
