import { defineComponent } from "vue";
import logo from "./assets/logo.png";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <>
        <img alt="Vue logo" src={logo} />
        <ul>
          <li>
            <router-link to="/">index</router-link>
          </li>
          <li>
            <router-link to="/watch">watch</router-link>
          </li>
          <li>
            <router-link to="/watchEffect">watchEffect</router-link>
          </li>
          <li>
            <router-link to="/chart">ChartDemo</router-link>
          </li>
        </ul>

        <router-view></router-view>
      </>
    );
  },
});
