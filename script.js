const colleges = [
    {
      cdRank: '#1',
      name: "IIT Madras - Indian Institute of Technology - [IITM], Chennai",
      city: "Chennai",
      state: "Tamil Nadu | AICTE Approved",
      approvedWith: "",
      fees: 10000,
      placement: "80%",
      userReviews: 4.5,
      ranking: 1,
      featured: true,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png",
      branches: [
        { name: "Computer Science and Engineering", cutoffRank: 100, rank: 5, feesPerYear: 5000 },
        { name: "Computer Science and Engineering", cutoffRank: 150, rank: 8, selected: true, feesPerYear: 6000 },
        { name: "Information Technology", cutoffRank: 200, rank: 10, feesPerYear: 7000 }
      ],
      averagePackage: "5 LPA",
      highestPackage: "10 LPA",
      rankingProviderLogos: [
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50"
      ],
      userReviewsTotal: 300
    },
    {
      cdRank: 2,
      name: "College B",
      city: "City B",
      state: "State B",
      approvedWith: "Approved with B",
      fees: 12000,
      placement: "85%",
      userReviews: 4.2,
      ranking: 2,
      featured: false,
      logo: "https://via.placeholder.com/50",
      branches: [
        { name: "Computer Science and Engineering", cutoffRank: 120, rank: 7, feesPerYear: 5500 },
        { name: "Instrumation Technology", cutoffRank: 180, rank: 9, feesPerYear: 6500 },
        { name: "Information Technology", cutoffRank: 250, rank: 12, feesPerYear: 7500 }
      ],
      averagePackage: "4.5 LPA",
      highestPackage: "9 LPA",
      rankingProviderLogos: [
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50"
      ],
      userReviewsTotal: 300
    }
  ];
  

  function populateTable(colleges) {
    const tableBody = document.getElementById("college-list");
    tableBody.innerHTML = "";
    colleges.forEach(college => {
      const selectedBranch = college.branches.find(branch => branch.selected) || college.branches[0]; // Use the first branch if no branch is selected
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${college.cdRank}</td>
        <td>
    <div>
        <img src="${college.logo}" alt="${college.name}" style="width: 50px; height: 50px; margin-right: 10px; float: left;">
        <strong class="light-blue">${college.name}</strong> <br> <br>
        <span>${college.city}</span>, 
        <span>${college.state}</span> <br> <br>
        <div class="dropdown">
            <button class="dropbtn">Computer Science and Engineering</button>
            <div class="dropdown-content">
                ${college.branches.map(branch => `
                    <a href="#" ${branch.selected ? 'class="selected"' : ''} data-cutoff="${branch.cutoffRank}" data-rank="${branch.rank}">${branch.name}</a>
                `).join('')}
            </div>
        </div> <br> <br>
        <button class="btn apply-now">Apply Now</button>
        <button class="btn download-brochure">Download Brochure</button>
        <button class="btn add-to-compare">Add to Compare</button>
    </div>
</td>

        <td>
          <div>
            <span style="color: green;">₹${selectedBranch.feesPerYear}</span>
            <br>
            Course: ${selectedBranch.name}
            <br>
            Fees as per year: ${selectedBranch.feesPerYear}
            <br>
            <button class="btn">Compare Fees</button>
          </div>
        </td>
        <td>
          Average Package: ${college.averagePackage}
          <br>
          Highest Package: ${college.highestPackage}
          <br>
          <button class="btn">Compare Placement</button>
        </td>
        <td>
          #${college.ranking} / ${college.totalColleges} in India
          <br>
          ${college.rankingProviderLogos.map(logo => `
            <img src="${logo}" alt="Ranking Provider Logo" style="width: 50px; height: 50px;">
          `).join('')}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  
  

// Initial population of table
populateTable(colleges.slice(0, 10));

// Infinite scroll functionality
let lastIndex = 10;
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const nextColleges = colleges.slice(lastIndex, lastIndex + 10);
    if (nextColleges.length > 0) {
      populateTable(nextColleges);
      lastIndex += nextColleges.length;
    }
  }
});

// Function to sort colleges by a given property in ascending or descending order
function sortColleges(property, ascending) {
  const sortedColleges = colleges.sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];
    if (valueA < valueB) {
      return ascending ? -1 : 1;
    }
    if (valueA > valueB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
  populateTable(sortedColleges);
}

// Example usage: sortColleges("userReviews", false) to sort by user reviews in descending order

