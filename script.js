const repositoryList = document.querySelector("#repositories");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository-card";

      const heading = document.createElement("h2");
      const link = document.createElement("a");
      link.href = repository.html_url;
      link.textContent = repository.full_name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      heading.append(link);

      const description = document.createElement("p");
      description.textContent = repository.description || "No description provided.";

      const starredDate = document.createElement("time");
      starredDate.dateTime = repository.starred_at;
      starredDate.textContent = `Starred on ${repository.starred_at}`;

      item.append(heading, description, starredDate);
      repositoryList.append(item);
    }

    statusMessage.textContent = repositories.length
      ? `Showing ${repositories.length} starred repositories.`
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Failed to load starred repositories:", error);
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
  }
}

loadRepositories();
