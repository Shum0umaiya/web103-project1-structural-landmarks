const grid = document.querySelector('#structure-grid');

async function loadStructures() {
  try {
    const response = await fetch('/api/structures');

    if (!response.ok) {
      throw new Error('Could not load structures');
    }

    const structures = await response.json();

    grid.innerHTML = structures
      .map(
        (structure) => `
          <article class="structure-card">
            <img
              src="${structure.image}"
              alt="Illustration of ${structure.name}"
              class="card-image"
            />

            <div class="card-content">
              <p class="eyebrow">${structure.type}</p>
              <h3>${structure.name}</h3>
              <p>${structure.description}</p>

              <div class="facts">
                <span><strong>Location:</strong> ${structure.location}</span>
                <span><strong>Completed:</strong> ${structure.yearCompleted}</span>
                <span><strong>Material:</strong> ${structure.primaryMaterial}</span>
              </div>

              <a
                href="/structures/${structure.slug}"
                role="button"
                class="outline"
              >
                Explore structure →
              </a>
            </div>
          </article>
        `
      )
      .join('');
  } catch (error) {
    grid.innerHTML = `
      <article>
        <h3>Unable to load the list.</h3>
        <p>${error.message}</p>
      </article>
    `;
  }
}

loadStructures();
