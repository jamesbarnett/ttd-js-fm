import "./style.css";

const durations = ["daily", "weekly", "monthly"]
const previousBreakdownMap = new Map([
  ["daily", "Yesterday"],
  ["weekly", "Last Week"],
  ["monthly", "Last Month"],
])

class ActivitySummary {
  constructor(categories) {
    this.categories = categories;
  }

  find = function(category) {
    return this.categories.find((e) => e.title === category);
  }
}

function kebabify(str) {
  return str.toLowerCase().replace(' ', '-')
}

function setActive(breakdownType) {
  document.getElementById(breakdownType).classList.add("active")
  const active = document.querySelectorAll(`p[data-breakdown-type=${breakdownType}]`)
  active.forEach((e) => {
    e.style.display = "block";
  })

  durations.filter((d) => d !== breakdownType)
    .forEach((duration) => {
      document.querySelectorAll(`p[data-breakdown-type=${duration}]`)
        .forEach((e) => {
          e.style.display = "none"
        })
      document.getElementById(duration).classList.remove("active")
    });
}

const navLinks = document.querySelectorAll("nav > ul > li > a")
navLinks.forEach((e) => {
  e.onclick = () => { setActive(`${e.innerText.toLowerCase()}`); return false; };
})

function loadData() {
  fetch('data.json').then((request) => {
    if (!request.ok) {
      console.log('Failed to load /data.json')
      return 
    }

    return request.json()
  }).then((data) => {
    console.log(`Did we get anything? ${(data) ? data : "no"}`)
    return new ActivitySummary(data)
  }).then((categories) => {
    const trackedCategories = ["Work", "Play", "Study", "Exercise",
      "Social", "Self Care"]


    const dataMap = new Map(trackedCategories.map((c) => {
      return [kebabify(c), categories.find(c)]
    }))

    dataMap.forEach((v,k,m) => {
      const article = document.querySelector(`[data-category="${k}"]`)
      const wrapper = article.querySelector(`.category-wrapper`)
      const heading = wrapper.querySelector(`h2`)

      durations.forEach((d) => {
        const current = document.createElement("p")
        const previous = document.createElement("p")
        current.setAttribute("data-breakdown-type", d)
        previous.setAttribute("data-breakdown-type", d)
        current.setAttribute("data-period", "current")
        previous.setAttribute("data-period", "previous")
        current.innerText = `${v.timeframes[d].current}hrs`
        previous.innerText =`${previousBreakdownMap.get(d)} - ${v.timeframes[d].previous}hrs`
  
        wrapper.appendChild(current)
        wrapper.appendChild(previous)
      })
    })
    setActive("weekly")
  })
}

loadData();
