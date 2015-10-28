import configurator from "./config";
import axios from "axios";
import withTimeout from "./withTimeout";

export default () => {
    const config = configurator.get();
    return withTimeout(axios.get(config.serviceUrl), config.timeout);
};
