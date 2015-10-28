import config from "./config";
import axios from "axios";
import withTimeout from "./withTimeout";

export default () => withTimeout(axios.get(config.serviceUrl), config.timeout);
