function container(tagname, classname, id, content) {
  let tag = document.createElement(tagname);
  tag.classList = classname;
  tag.id = id;
  tag.innerHTML = content;
  return tag;
}

let div1 = container("div", "container", "", "");
let h1 = container("h1", "text-center", "title", "Countries Weather Report");
let row = container("div", "row", "", "");

const returl = fetch("https://restcountries.com/v3.1/all");
returl
  .then((data) => data.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
      <div class="card h-100">
       <div class="card-header">
       <h5 class="card-title text-center">${result[i].name.common} </h5>
       </div>
       <div class="img-box">
       <img src="${result[i].flags.png}" class="card-img-top" alt="country image" />
       </div>
       <div class ="card-body">
       <div class="card-text text-center">Region: ${result[i].region} </div>
       <div class="card-text text-center">Capital: ${result[i].capital} </div>
       <div class="card-text text-center">Country Code: ${result[i].cca2} </div>
       <button class="btn btn-primary">Click for Weather </button>
       </div>
       </div> `;
      row.append(col);
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let lat = result[index].latlng[0];
        let lng = result[index].latlng[1];

        let weather = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d5fa5d44a78e233d6e97792a77537d13`
        );

        weather
          .then((js) => js.json())
          .then((weatherData) => {
            //console.log(weatherData);
            alert(
              `In ${result[index].name.common} 
               The Weather is ${weatherData.weather[0].description}
               The Humidity is ${weatherData.main.humidity}%`
            );
          });
      });
    });
  });

div1.append(row);
document.body.append(h1, div1);
