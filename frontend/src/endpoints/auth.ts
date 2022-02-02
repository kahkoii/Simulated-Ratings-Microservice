import axios from "axios";

const authURL = "http://10.31.11.11:8090/session";

const getUser = async () => {
  const res = await axios.get(authURL);
  if (res.status !== 200) {
    return "-1";
  }
  if (res.data.usertype !== "student") {
    return "-1";
  }
  return res.data.userID;
};

export default getUser;
