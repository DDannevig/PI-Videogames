import { render, screen } from "@testing-library/react";
import App from "./App";
import GameCard from "./components/GameCard";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

test("renders Henry Games link", () => {
  render(<App />);
  expect(screen.getAllByText(/Henry Games/i).pop()).toBeInTheDocument();
});

test("renders GameCard", () => {
  const obj = {
    name: "The Legend of Zelda",
    description: "Alto juego",
    launchdate: "3/3/2017",
    platforms: ["Wii U", "Switch"],
    rating: "5",
    key: "id." + "The Legend of Zelda",
    genres: [{name: "Adventure"}, {name: "Action"}],
    image:
      "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
    id: "22511",
  };
  render(
    <Provider store={store}>
      <GameCard
        name={obj.name}
        description={obj.description}
        launchdate={obj.launchdate}
        platforms={obj.platforms}
        rating={obj.rating}
        key={"id.gamecard." + obj.name}
        genres={obj.genres}
        image={obj.image}
        id={obj.id}
      />
    </Provider>
  );
  expect(screen.getByText(obj.name)).toBeInTheDocument();
  

});
