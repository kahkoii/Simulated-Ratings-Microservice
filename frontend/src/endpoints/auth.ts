import axios from "axios";
import Cookies from "js-cookie";

const authURL = "http://10.31.11.11:8090/session";

const getUserId = async () => {
  const res = await axios({
    method: "get",
    url: authURL,
    withCredentials: true,
    headers: { Cookie: `connect.sid=${Cookies.get("connect.sid")}` },
  });
  if (res.status !== 200) {
    return "-1";
  }
  if (res.data.usertype !== "student") {
    return "-1";
  }
  return res.data.userID;
};

export default getUserId;
