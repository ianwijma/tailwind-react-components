import Tailwind from "./components/Tailwind";

export const App = () => {
  return (
    <Tailwind.Border.red.S500 className="border">
      <Tailwind.Background.black>
        <Tailwind.Text.red.S500>Hey you!</Tailwind.Text.red.S500>
      </Tailwind.Background.black>
    </Tailwind.Border.red.S500>
  );
};
