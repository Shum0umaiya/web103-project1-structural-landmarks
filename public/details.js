const detailCard = document.querySelector('#detail-card');

function getSlugFromUrl() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

async function loadStructure() {
  const slug = getSlugFromUrl();

  try {
    const response = await fetch(`/api/structures/${slug}`);

    if (!response.ok) {
      window.location.href = '/this-page-does-not-exist';
      return;
    }

    const structure = await response.json();

    document.title = `${structure.name} | Structural Landmarks`;

    detailCard.innerHTML = `
      <img
        src="${structure.image}"
        alt="Illustration of ${structure.name}"
        class="detail-image"
      />

      <p class="eyebrow">${structure.type}</p>
      <h1>${structure.name}</h1>
      <p class="lead">${structure.description}</p>

      <div class="detail-grid">
        <div>
          <small>Location</small>
          <strong>${structure.location}</strong>
        </div>
        <div>
          <small>Year completed</small>
          <strong>${structure.yearCompleted}</strong>
        </div>
        <div>
          <small>Primary material</small>
          <strong>${structure.primaryMaterial}</strong>
        </div>
        <div>
          <small>Key dimension</small>
          <strong>${structure.span}</strong>
        </div>
      </div>

      <hr />

      <h2>Why engineers study it</h2>
      <p>${structure.engineeringLesson}</p>

      <details>
        <summary>All project data fields</summary>
        <ul>
          <li><strong>Slug:</strong> ${structure.slug}</li>
          <li><strong>Name:</strong> ${structure.name}</li>
          <li><strong>Type:</strong> ${structure.type}</li>
          <li><strong>Location:</strong> ${structure.location}</li>
          <li><strong>Year completed:</strong> ${structure.yearCompleted}</li>
          <li><strong>Primary material:</strong> ${structure.primaryMaterial}</li>
          <li><strong>Key dimension:</strong> ${structure.span}</li>
          <li><strong>Description:</strong> ${structure.description}</li>
          <li><strong>Engineering lesson:</strong> ${structure.engineeringLesson}</li>
          <li><strong>Image path:</strong> ${structure.image}</li>
        </ul>
      </details>
    `;
  } catch (error) {
    detailCard.innerHTML = `
      <h1>Something went wrong.</h1>
      <p>${error.message}</p>
      <a href="/" role="button">Return home</a>
    `;
  }
}

loadStructure();
