import { createRoot } from "react-dom/client";
import "./assets/images/dog.jpg";
import "./assets/images/iconssvg.svg";
import { App } from "./components/app/app";
import store from "./services/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
