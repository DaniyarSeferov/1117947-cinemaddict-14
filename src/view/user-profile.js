export const createUserProfileTemplate = (rank) => {
  const rankElement = rank ? `<p class="profile__rating">${rank}</p>` : '';
  return `<section class="header__profile profile">
    ${rankElement}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
